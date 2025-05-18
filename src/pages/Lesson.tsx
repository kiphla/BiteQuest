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
    CardActions,
    CardContent,
    Collapse,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useLocation } from 'react-router-dom';
import { ExpandCircleDown } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import lessonContentData from '../data/lessonContent.json';

interface IconButtonProps {
    expand: boolean;
}

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('light', {
        backgroundColor: 'rgba(255, 255, 255, 0.78)',
    }),
}));
  
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    width: 'auto',
}));
  
export default function Lesson() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeStep, setActiveStep] = useState(0);
    const [lessonSteps, setLessonSteps] = useState([]);
    const [lessonName, setLessonName] = useState('');
    const [activePanel, setActivePanel] = useState<'panel1' | 'panel2'>('panel1');
    
    useEffect(() => {
        console.log("Location state changed:", location.state); // Debug full state
        
        if (location.state && location.state.lesson) {
            const { lesson } = location.state;
            console.log("Lesson data received:", lesson); // Debug lesson
            
            // Get cuisine ID if available
            const cuisineId = location.state.cuisineId;
            console.log("Cuisine ID:", cuisineId); // Debug cuisineId
            
            // Log all available lessons for debugging
            console.log("Available lesson content:", 
                lessonContentData.map(l => ({ id: l.id, cuisineId: l.cuisineId, name: l.name }))
            );
            
            // Find matching lesson content from JSON data, using both cuisineId and lesson id if available
            let lessonContent;
            
            if (cuisineId) {
                // If cuisineId is provided, first try to match by both cuisineId and lesson id
                lessonContent = lessonContentData.find(l => 
                    l.cuisineId === cuisineId && l.id === lesson.id
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
        } else {
            // Fallback if no lesson state is provided
            console.warn('No lesson state provided, using fallback');
            setLessonSteps(lessonContentData[0].steps);
            setLessonName(lessonContentData[0].name);
        }
    }, [location.state]);

    {/* Community notes section*/}
    function CommunityNotes(){
        if (activeStep > 0 && lessonSteps[activeStep]?.noteText){
            return(
                <Card sx={{width: 550, position: 'fixed', bottom: 100}}>
                    <Accordion expanded={activePanel === 'panel2'} onChange={handlePanel2Change}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography component="span">Community Notes</Typography>
                    </AccordionSummary>
                    <CardContent>
                    <AccordionDetails>
                    {lessonSteps[activeStep].noteRating} <br></br>
                    {lessonSteps[activeStep].noteText} <br></br>
                    {lessonSteps[activeStep].noteAuthor}
                    </AccordionDetails>
                    </CardContent>
                    </Accordion>
                </Card>
            )
        }
        return null;
    }

    const handleNext = () => {
        if (activeStep < lessonSteps.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            navigate('/complete', { state: { lesson: { name: lessonName } } });
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
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

    const handlePanel2Change = (event, isExpanded) => {
        if (isExpanded) {
            setActivePanel('panel2');
        } else {
            setActivePanel('panel1');  // fallback to panel1 if collapsing panel2
        }
    };

    // If lesson data is still loading
    if (lessonSteps.length === 0) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: theme.palette.background.default,
                }}
            >
                <Typography>Loading lesson...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                pb: 14,
            }}
        >
            <Container maxWidth="sm" sx={{ pt: 4, pb: 2 }}>
                {/* header with back button */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={handleBack}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            flex: 1,
                            textAlign: 'center',
                            fontWeight: 'medium',
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Step {activeStep + 1} of {lessonSteps.length}
                    </Typography>
                    <Box sx={{ width: 40 }} />
                </Box>
                <Card sx={{marginBottom: 2}}>
                    <CardContent>
                        {/* image for the step */}
                        <CardMedia
                            component="img"
                            image={lessonSteps[activeStep].image}
                            alt={lessonSteps[activeStep].title}
                            sx={{
                                width: '100%',
                                height: 200,
                                objectFit: 'cover',
                                borderRadius: 3,
                                mb: 3,
                            }}
                        />
                        <Accordion expanded={activePanel === 'panel1'} onChange={() => {}}>
                        <AccordionDetails>
                        {/* title + content */}
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 'bold',
                                color: theme.palette.primary.main,
                                textAlign: 'center',
                            }}
                        >
                            {lessonSteps[activeStep].title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ textAlign: 'center', mb: 3 }}
                        >
                            {lessonSteps[activeStep].content}
                        </Typography>
                        </AccordionDetails>
                        </Accordion>
                    </CardContent>
                    <CommunityNotes />
                </Card>
            </Container>

            {/* sticky footer */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: theme.palette.background.default,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    px: 2,
                    py: 1.5,
                }}
            >
                <MobileStepper
                    variant="dots"
                    steps={lessonSteps.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={<div />}
                    backButton={<div />}
                    sx={{
                        justifyContent: 'center',
                        display: 'flex',
                        bgcolor: 'transparent',
                        mb: 1,
                    }}
                />
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    fullWidth
                    sx={{ py: 1.5, borderRadius: 3 }}
                >
                    {activeStep === lessonSteps.length - 1 ? 'Finish Lesson' : 'Continue'}
                </Button>
            </Box>
        </Box>
    );
}

