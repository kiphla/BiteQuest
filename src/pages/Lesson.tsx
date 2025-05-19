//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles'
import {
    Box,
    Button,
    Typography,
    Container,
    IconButton,
    MobileStepper,
    useTheme,
    CardMedia,
    Card,
    CardContent,
    Collapse,
    Avatar,
    Chip,
    Fade,
    Divider,
    Paper,
    Tooltip,
    CircularProgress,
    alpha,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import lessonContentData from '../data/lessonContent.json';
import CloseIcon from '@mui/icons-material/Close';
import { BorderColor } from '@mui/icons-material';
import Slide from '@mui/material/Slide';

//Transition for community tips
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Video Player component for lesson steps that include videos
const VideoPlayer = ({ src, title, poster }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = React.useRef(null);
    
    // Initialize video with autoplay when component mounts
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                // Auto-play might be blocked by browser settings
                console.log('Auto-play prevented:', error);
                setIsPlaying(false);
            });
        }
    }, [src]);
    
    return (
        <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
            <video
                ref={videoRef}
                width="100%"
                height="240"
                poster={poster}
                preload="auto"
                muted
                autoPlay
                loop
                playsInline
                controls
                style={{ display: 'block', objectFit: 'cover' }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Box>
    );
};

export default function Lesson() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [lessonSteps, setLessonSteps] = useState([]);
    const [lessonName, setLessonName] = useState('');
    const [showNotes, setShowNotes] = useState(false);
    const [loading, setLoading] = useState(true);
    const [completedSteps, setCompletedSteps] = useState([]);
    const [lessonId, setLessonId] = useState(null);
    const [cuisineId, setCuisineId] = useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    console.log("Location state changed:", location.state); // Debug full state
    
    useEffect(() => {
        if (location.state && location.state.lesson) {
            const { lesson } = location.state;
            console.log("Lesson data received:", lesson); // Debug lesson
            
            // Get cuisine ID if available from state, params, or URL
            let currentCuisineId = location.state.cuisineId;
            
            // If cuisineId is not in state, try to get it from URL params or pathname
            if (!currentCuisineId) {
                // Check if it might be in the URL path (like /lessonpath/:cuisineId)
                const pathMatch = location.pathname.match(/\/lessonpath\/([^\/]+)/);
                if (pathMatch && pathMatch[1]) {
                    currentCuisineId = pathMatch[1];
                }
            }
            
            // Set the cuisineId in state for later use
            setCuisineId(currentCuisineId);
            setLessonId(lesson.id);
            
            console.log("Cuisine ID:", currentCuisineId); // Debug cuisineId
            
            // Log all available lessons for debugging
            console.log("Available lesson content:", 
                lessonContentData.map(l => ({ id: l.id, cuisineId: l.cuisineId, name: l.name }))
            );
            
            // Find matching lesson content from JSON data, using both cuisineId and lesson id if available
            let lessonContent;
            
            if (currentCuisineId) {
                // If cuisineId is provided, first try to match by both cuisineId and lesson id
                lessonContent = lessonContentData.find(l => 
                    l.cuisineId === currentCuisineId && l.id === lesson.id
                );
                
                if (lessonContent) {
                    console.log("Found match by cuisineId and id");
                }
            }
            
            // If not found or cuisineId wasn't provided, try other matching methods
            if (!lessonContent) {
                lessonContent = lessonContentData.find(l => 
                    (l.id === lesson.id && l.name === lesson.name) || // Exact match by id and name
                    (l.id === lesson.id) || // Match just by id
                    (l.name === lesson.name) // Match just by name
                );
                
                if (lessonContent) {
                    console.log("Found match by fallback methods");
                }
            }
            
            if (lessonContent) {
                console.log("Using lesson content:", lessonContent); // Debug matched content
                setLessonSteps(lessonContent.steps);
                setLessonName(lessonContent.name);
            } else {
                // Fallback to first lesson if no match found
                console.warn('Lesson content not found, using fallback');
                console.log("Available lessons:", lessonContentData);
                setLessonSteps(lessonContentData[0].steps);
                setLessonName(lessonContentData[0].name);
            }
            
            // Fake loading time for smoother transitions
            setTimeout(() => {
                setLoading(false);
            }, 600);
        } else {
            // Fallback if no lesson state is provided
            console.warn('No lesson state provided, using fallback');
            setLessonSteps(lessonContentData[0].steps);
            setLessonName(lessonContentData[0].name);
            setTimeout(() => {
                setLoading(false);
            }, 600);
        }
    }, [location.state]);

    const handleNext = () => {
        if (activeStep < lessonSteps.length - 1) {
            // Mark current step as completed
            if (!completedSteps.includes(activeStep)) {
                setCompletedSteps(prev => [...prev, activeStep]);
            }
            
            setActiveStep((prev) => prev + 1);
            // Auto-hide notes when moving to next step
            setShowNotes(false);
        } else {
            // Mark final step complete
            if (!completedSteps.includes(activeStep)) {
                setCompletedSteps(prev => [...prev, activeStep]);
            }
            
            navigate('/complete', { 
                state: { 
                    lesson: { name: lessonName, id: lessonId },
                    cuisineId: cuisineId 
                } 
            });
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
            // Auto-hide notes when moving to previous step
            setShowNotes(false);
        } else {
            navigate(-1);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `I just completed the ${lessonName} lesson on BiteQuest!`,
                text: `Check out my progress and try this delicious recipe!`,
                url: window.location.href,
            });
        } else {
            alert('Sharing is not supported on this device.');
        }
    };

    // Extract primary color from theme for animations
    const primaryColor = theme.palette.primary.main;
    const primaryLight = theme.palette.primary.light;
    
    // If lesson data is still loading
    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'white',
                    gap: 3
                }}
            >
                <CircularProgress size={60} color="primary" thickness={4} />
                <Typography variant="h6" color="text.secondary">
                    Loading {lessonName || "lesson"}...
                </Typography>
            </Box>
        );
    }

    // If no lesson steps are available
    if (lessonSteps.length === 0) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'white',
                    flexDirection: 'column',
                    p: 3
                }}
            >
                <Typography variant="h6" color="error" gutterBottom>
                    Lesson content not available
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackIosNewIcon />}
                    sx={{ mt: 2 }}
                >
                    Go Back
                </Button>
            </Box>
        );
    }

    const currentStep = lessonSteps[activeStep];
    const hasNotes = activeStep > 0 && currentStep?.noteText;
    const hasVideo = currentStep?.videoSrc;
    const hasMoreNotes = activeStep > 0 && currentStep?.note2Text;
    const hasEvenMoreNotes = activeStep > 0 && currentStep?.note3Text;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'white',
                pb: 10,
            }}
        >
            {/* Header */}
            <Box 
                sx={{ 
                    bgcolor: 'white',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{ py: 1.5, display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                            onClick={handleBack}
                            sx={{ color: 'text.secondary' }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight="medium" noWrap textAlign="center">
                                {lessonName}
                            </Typography>
                            <MobileStepper
                                variant="progress"
                                steps={lessonSteps.length}
                                position="static"
                                activeStep={activeStep}
                                nextButton={<div />}
                                backButton={<div />}
                                sx={{
                                    bgcolor: 'transparent',
                                    '& .MuiLinearProgress-root': {
                                        height: 5,
                                        borderRadius: 5,
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    }
                                }}
                            />
                        </Box>
                        <Tooltip title="Share lesson">
                            <IconButton 
                                onClick={handleShare}
                                sx={{ color: 'text.secondary' }}
                            >
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Container>
            </Box>
            
            {/* Main Content */}
            <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
                {/* Step counter */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Chip 
                        label={`Step ${activeStep + 1} of ${lessonSteps.length}`}
                        size="small"
                        color="primary"
                        sx={{ 
                            height: 24, 
                            fontWeight: 'medium',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                            border: 'none'
                        }}
                    />
                    <Typography 
                        variant="subtitle2" 
                        color="text.secondary"
                        sx={{ ml: 1, flex: 1 }}
                    >
                        {currentStep.title}
                    </Typography>
                    
                    {hasVideo && (
                        <Chip
                            icon={<VideoLibraryIcon />}
                            label="Video"
                            size="small"
                            sx={{
                                height: 24,
                                bgcolor: alpha(theme.palette.error.main, 0.1),
                                color: theme.palette.error.main,
                                fontWeight: 'medium',
                                ml: 1
                            }}
                        />
                    )}
                </Box>
                
                {/* Main card */}
                <Card 
                    elevation={0}
                    sx={{ 
                        borderRadius: 4, 
                        overflow: 'hidden',
                        border: `1px solid ${theme.palette.divider}`,
                        mb: 2.5
                    }}
                >
                    {/* Step media (image or video) */}
                    <Box sx={{ position: 'relative' }}>
                        {hasVideo ? (
                            <VideoPlayer 
                                src={currentStep.videoSrc} 
                                title={currentStep.title}
                                poster={currentStep.image}
                            />
                        ) : (
                            <CardMedia
                                component="img"
                                image={currentStep.image}
                                alt={currentStep.title}
                                sx={{
                                    height: 240,
                                    objectFit: 'cover',
                                }}
                            />
                        )}
                        
                        {/* Completed step indicator */}
                        {completedSteps.includes(activeStep) && (
                            <Box sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                bgcolor: 'success.main',
                                color: 'white',
                                borderRadius: '50%',
                                width: 36,
                                height: 36,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 3px 6px rgba(0,0,0,0.2)'
                            }}>
                                <CheckCircleOutlineIcon />
                            </Box>
                        )}
                    </Box>
                    
                    {/* Step content */}
                    {/* {hasVideo && (
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 2, 
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.error.main, 0.08)
                        }}>
                            <VideoLibraryIcon color="error" sx={{ mr: 1.5 }} />
                            <Typography variant="subtitle2" color="error.main" fontWeight="medium">
                                This step includes a video demonstration
                            </Typography>
                        </Box>
                    )} */}
                    
                    <CardContent sx={{ p: 3 }}>
                        {/* {hasVideo && (
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mb: 2, 
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.error.main, 0.08)
                            }}>
                                <VideoLibraryIcon color="error" sx={{ mr: 1.5 }} />
                                <Typography variant="subtitle2" color="error.main" fontWeight="medium">
                                    This step includes a video demonstration
                                </Typography>
                            </Box>
                        )} */}
                        
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 'bold',
                                color: theme.palette.primary.main,
                                mb: 2
                            }}
                        >
                            {currentStep.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 3, lineHeight: 1.6 }}
                        >
                            {currentStep.content}
                        </Typography>
                        
                        {/* Community notes button - only if notes exist */}
                        {hasNotes && (
                            <Box>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<PeopleAltIcon />}
                                    onClick={() => setShowNotes(!showNotes)}
                                    sx={{ 
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        px: 2,
                                        borderColor: alpha(theme.palette.primary.main, 0.3),
                                        '&:hover': {
                                            borderColor: theme.palette.primary.main
                                        }
                                    }}
                                >
                                    {showNotes ? 'Hide Community Notes' : 'View Community Notes'}
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
                
                {/* Community Notes Section */}
                {hasNotes && (
                    <Collapse in={showNotes} timeout="auto">
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,
                                borderRadius: 4,
                                bgcolor: alpha('#FFFDE7', 0.7),
                                border: `1px solid ${alpha(theme.palette.warning.light, 0.4)}`,
                                mb: 2
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LightbulbIcon sx={{ color: theme.palette.warning.main, mr: 1.5 }} />
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Community Tips
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    mb: 1.5
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: 'success.main',
                                        bgcolor: alpha(theme.palette.success.main, 0.1),
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 4,
                                        mb: 1
                                    }}
                                >
                                    <ThumbUpOffAltIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    <Typography variant="caption" fontWeight="medium">
                                        {currentStep.noteRating}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontStyle: 'italic',
                                    color: 'text.primary',
                                    mb: 0.5
                                }}
                            >
                                "{currentStep.noteText}"
                            </Typography>
                            {/* Show more notes, only if it exists */}
                            {hasMoreNotes && (
                                <Box>
                                    <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleClickOpen}
                                    sx={{ 
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        px: 2,
                                        borderColor: alpha(theme.palette.primary.main, 0.3),
                                        '&:hover': {
                                            borderColor: theme.palette.primary.main
                                        }
                                    }}
                                    >
                                        Show More Notes
                                    </Button>
                                    <Dialog
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    slots={{
                                        transition: Transition,
                                    }}
                                    PaperProps={{
                                        sx:{
                                            bgcolor: 'white',
                                            border: '2px solid',
                                            borderColor: alpha(theme.palette.primary.main, 0.7),
                                            borderRadius: 5
                                        }
                                    }}
                                    >
                                        <DialogTitle variant="subtitle1" fontWeight="bold">Community Tips</DialogTitle>
                                        <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                        sx={(theme) => ({
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                            color: theme.palette.primary.main,
                                        })}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <DialogContent dividers>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: 'success.main',
                                                    bgcolor: alpha(theme.palette.success.main, 0.1),
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 4,
                                                    mb: 1,
                                                    width: 'fit-content'
                                                }}
                                            >
                                                <ThumbUpOffAltIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="caption" fontWeight="medium">
                                                    {currentStep.noteRating}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontStyle: 'italic',
                                                    color: 'text.primary',
                                                    mb: 0.5
                                                }}
                                            >
                                                "{currentStep.noteText}"
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {currentStep.noteAuthor}
                                            </Typography>
                                        </DialogContent>
                                        <DialogContent dividers>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    color: 'success.main',
                                                    bgcolor: alpha(theme.palette.success.main, 0.1),
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 4,
                                                    mb: 1,
                                                    width: 'fit-content'
                                                }}
                                            >
                                                <ThumbUpOffAltIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                                <Typography variant="caption" fontWeight="medium">
                                                    {currentStep.note2Rating}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontStyle: 'italic',
                                                    color: 'text.primary',
                                                    mb: 0.5
                                                }}
                                            >
                                                "{currentStep.note2Text}"
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {currentStep.note2Author}
                                            </Typography>
                                        </DialogContent>
                                        {hasEvenMoreNotes && (
                                            <DialogContent dividers>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        color: 'success.main',
                                                        bgcolor: alpha(theme.palette.success.main, 0.1),
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 4,
                                                        mb: 1,
                                                        width: 'fit-content'
                                                    }}
                                                >
                                                    <ThumbUpOffAltIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                                    <Typography variant="caption" fontWeight="medium">
                                                        {currentStep.note3Rating}
                                                    </Typography>
                                                </Box>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontStyle: 'italic',
                                                        color: 'text.primary',
                                                        mb: 0.5
                                                    }}
                                                >
                                                    "{currentStep.note3Text}"
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {currentStep.note3Author}
                                                </Typography>
                                            </DialogContent>
                                        )}
                                        <DialogContent>
                                            <Typography variant="body2" color="text.secondary">
                                                Only the top 3 community tips above 75% rating are shown here
                                            </Typography>
                                        </DialogContent>
                                    </Dialog>
                                </Box>
                            )}
                        </Paper>
                    </Collapse>
                )}
                
                {/* Step navigation */}
                <List sx={{ mt: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                    {lessonSteps.map((step, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => {
                                setActiveStep(index);
                                setShowNotes(false);
                            }}
                            selected={index === activeStep}
                            sx={{
                                borderRadius: 2,
                                mb: 0.5,
                                border: index === activeStep ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
                                bgcolor: index === activeStep ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                                opacity: index > activeStep ? 0.5 : 1,
                                '&.Mui-selected': {
                                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Avatar
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        bgcolor: completedSteps.includes(index) 
                                            ? 'success.main' 
                                            : index === activeStep 
                                                ? 'primary.main' 
                                                : 'grey.300',
                                        fontSize: 14
                                    }}
                                >
                                    {index + 1}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText 
                                primary={step.title.replace(/^Step \d+: /, '')}
                                primaryTypographyProps={{ 
                                    variant: 'body2',
                                    fontWeight: index === activeStep ? 'medium' : 'regular',
                                    noWrap: true
                                }}
                            />
                            {index === activeStep && (
                                <ChevronRightIcon color="primary" />
                            )}
                            {step.videoSrc && (
                                <Tooltip title="Includes video">
                                    <VideoLibraryIcon 
                                        fontSize="small" 
                                        color="error" 
                                        sx={{ 
                                            ml: 1, 
                                            opacity: index === activeStep ? 1 : 0.7,
                                            fontSize: 16,
                                            animation: index === activeStep ? 'pulse 2s infinite' : 'none',
                                            '@keyframes pulse': {
                                                '0%': {
                                                    opacity: 0.7,
                                                },
                                                '50%': {
                                                    opacity: 1,
                                                },
                                                '100%': {
                                                    opacity: 0.7,
                                                },
                                            },
                                        }} 
                                    />
                                </Tooltip>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Container>

            {/* Sticky footer */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: 'white',
                    borderTop: `1px solid ${theme.palette.divider}`,
                    px: 2,
                    py: 1.5,
                    zIndex: 10
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleNext}
                            fullWidth
                            sx={{ 
                                py: 1.5, 
                                borderRadius: 3,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            {activeStep === lessonSteps.length - 1 ? 'Finish Lesson' : 'Continue'}
                        </Button>
                        {completedSteps.includes(activeStep) && (
                            <Button
                                variant="outlined"
                                size="large"
                                startIcon={<ShareIcon />}
                                onClick={() => {
                                    navigate('/share', {
                                        state: {
                                            lessonName: lessonName,
                                            cuisineId: cuisineId,
                                            image: currentStep.image
                                        }
                                    });
                                }}
                                sx={{ 
                                    borderRadius: 3,
                                    minWidth: 100
                                }}
                            >
                                Share
                            </Button>
                        )}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

