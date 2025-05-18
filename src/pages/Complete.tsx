//@ts-nocheck
import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    IconButton,
    CardMedia,
    useTheme,
    Stack,
    Card,
    CardContent,
    Chip,
    Avatar,
    Divider,
    alpha,
    CircularProgress,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShareIcon from '@mui/icons-material/Share';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhotoIcon from '@mui/icons-material/Photo';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate, useLocation } from 'react-router-dom';
import lessonContentData from '../data/lessonContent.json';

export default function Complete() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { width, height } = useWindowSize();
    const [lessonDetails, setLessonDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confettiActive, setConfettiActive] = useState(true);
    const [showRatingSuccess, setShowRatingSuccess] = useState(false);
    const [userRating, setUserRating] = useState(0);

    // Get lesson information from state or URL params
    useEffect(() => {
        console.log("Location state:", location.state);
        
        if (location.state?.lesson) {
            const { lesson } = location.state;
            const cuisineId = location.state.cuisineId;
            
            // Find matching lesson content
            let lessonContent;
            
            if (cuisineId) {
                lessonContent = lessonContentData.find(l => 
                    l.cuisineId === cuisineId && l.id === lesson.id
                );
            }
            
            if (!lessonContent) {
                lessonContent = lessonContentData.find(l => 
                    (l.id === lesson.id && l.name === lesson.name) ||
                    (l.id === lesson.id) ||
                    (l.name === lesson.name)
                );
            }
            
            if (lessonContent) {
                setLessonDetails({
                    ...lessonContent,
                    steps: lessonContent.steps,
                    image: lessonContent.steps[0]?.image || '/fattoush.jpg',
                    difficulty: lesson.difficulty || 3,
                    cuisineId: cuisineId || 'unknown'
                });
            } else {
                // Fallback with basic info
                setLessonDetails({
                    name: lesson.name || 'Unknown Lesson',
                    image: '/fattoush.jpg',
                    difficulty: lesson.difficulty || 3,
                    cuisineId: cuisineId || 'unknown',
                    steps: []
                });
            }
        } else {
            // Default fallback
            setLessonDetails({
                name: 'Unknown Lesson',
                image: '/fattoush.jpg',
                difficulty: 3,
                cuisineId: 'unknown',
                steps: []
            });
        }
        
        // Simulate loading for better UX
        setTimeout(() => {
            setLoading(false);
        }, 800);
        
        // Stop confetti after 6 seconds
        setTimeout(() => {
            setConfettiActive(false);
        }, 6000);
    }, [location.state]);

    // Handle direct sharing functionality
    const handleShare = () => {
        // Navigate to the share component with lesson details
        navigate('/share', { 
            state: { 
                lessonName: lessonDetails?.name,
                cuisineId: lessonDetails?.cuisineId,
                difficulty: lessonDetails?.difficulty,
                image: lessonDetails?.image || lessonDetails?.steps[0]?.image,
                // Send info that this came from a completed lesson
                completedLesson: true
            } 
        });
    };

    // Handle navigation back to lesson path
    const handleContinueLearning = () => {
        const cuisineId = lessonDetails?.cuisineId;
        
        if (cuisineId && cuisineId !== 'unknown') {
            // Navigate to specific cuisine path if available
            navigate(`/lessonpath/${cuisineId}`);
        } else {
            // Fallback to main lesson path without parameter
            navigate('/lessonpath');
        }
    };

    const handleRate = (rating) => {
        setUserRating(rating);
        setShowRatingSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            setShowRatingSuccess(false);
        }, 3000);
    };

    // Format cuisineId for display
    const formatCuisineName = (id) => {
        if (!id || id === 'unknown') return 'Cooking';
        
        return id.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Loading state
    if (loading) {
        return (
            <Box 
                sx={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    bgcolor: '#fff',
                    gap: 3
                }}
            >
                <CircularProgress size={60} color="primary" thickness={4} />
                <Typography variant="h6" color="text.secondary">
                    Completing your lesson...
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                bgcolor: '#fff',
                position: 'relative',
                minHeight: '100vh',
                pb: 10,
            }}
        >
            {/* Header */}
            <Box 
                sx={{ 
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    position: 'relative',
                    pt: 8,
                    pb: 5,
                    overflow: 'hidden',
                }}
            >
                <Box 
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        opacity: 0.15,
                        backgroundImage: `url(${lessonDetails?.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(8px)',
                    }}
                />
                
                <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
                    <IconButton 
                        onClick={handleContinueLearning}
                        sx={{ 
                            color: '#fff',
                            position: 'absolute',
                            top: -32,
                            left: 0
                        }}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="overline" sx={{ opacity: 0.8 }}>
                            {formatCuisineName(lessonDetails?.cuisineId)}
                        </Typography>
                        
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 'bold',
                                mb: 1,
                            }}
                        >
                            Lesson Complete!
                        </Typography>
                        
                        <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
                            You've mastered the {lessonDetails?.name}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <StarIcon 
                                    key={i} 
                                    sx={{ 
                                        color: i < lessonDetails?.difficulty ? theme.palette.warning.light : alpha('#fff', 0.3),
                                        fontSize: 20
                                    }} 
                                />
                            ))}
                        </Box>
                        
                        <Chip
                            icon={<CheckCircleIcon sx={{ color: theme.palette.common.white }} />}
                            label="Recipe Completed"
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.15)',
                                color: '#fff',
                                fontWeight: 'medium',
                                backdropFilter: 'blur(4px)'
                            }}
                        />
                    </Box>
                </Container>
            </Box>
            
            {/* Achievement Card */}
            <Container maxWidth="sm" sx={{ mt: -3 }}>
                <Card 
                    elevation={4} 
                    sx={{ 
                        borderRadius: 4, 
                        overflow: 'hidden',
                        mb: 3,
                        position: 'relative'
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2, 
                            mb: 2.5 
                        }}>
                            <Avatar 
                                sx={{ 
                                    bgcolor: theme.palette.primary.main,
                                    width: 56,
                                    height: 56
                                }}
                            >
                                <CelebrationIcon sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    Achievement Unlocked
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {lessonDetails?.steps?.length || 4} steps completed
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Divider sx={{ my: 2.5 }} />
                        
                        {/* Rating Section */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                Rate this recipe
                            </Typography>
                            
                            <Stack 
                                direction="row" 
                                spacing={1}
                                sx={{ 
                                    justifyContent: 'center', 
                                    mt: 1
                                }}
                            >
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <IconButton
                                        key={rating}
                                        onClick={() => handleRate(rating)}
                                        sx={{
                                            color: rating <= userRating ? 'warning.main' : 'grey.300'
                                        }}
                                    >
                                        <StarIcon />
                                    </IconButton>
                                ))}
                            </Stack>
                            
                            {showRatingSuccess && (
                                <Typography 
                                    variant="body2"
                                    color="success.main"
                                    sx={{ 
                                        textAlign: 'center', 
                                        mt: 1, 
                                        fontWeight: 'medium',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 0.5
                                    }}
                                >
                                    <CheckCircleIcon fontSize="small" />
                                    Thanks for your feedback!
                                </Typography>
                            )}
                        </Box>
                        
                        {/* Share your creation section */}
                        <Box sx={{ textAlign: 'center', mt: 3 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Share Your Creation
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                Show off your {lessonDetails?.name} by taking a photo and sharing it with the community!
                            </Typography>
                            
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<CameraAltIcon />}
                                onClick={handleShare}
                                fullWidth
                                sx={{
                                    borderRadius: 3,
                                    py: 1.8,
                                    backgroundColor: '#EC3C7E',
                                    textTransform: 'none',
                                    fontWeight: 'medium',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 4px 12px rgba(236,60,126,0.25)',
                                    '&:hover': {
                                        backgroundColor: '#D2336A',
                                    }
                                }}
                            >
                                Take a Photo & Share
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                
                {/* Action Buttons */}
                <Button
                    variant="outlined"
                    size="large"
                    onClick={handleContinueLearning}
                    sx={{
                        borderRadius: 3,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 'medium',
                        width: '100%',
                        mb: 2
                    }}
                >
                    Continue Learning
                </Button>
            </Container>

            {/* Confetti effect */}
            {confettiActive && (
                <Confetti 
                    width={width} 
                    height={height} 
                    recycle={false} 
                    numberOfPieces={200}
                    gravity={0.2}
                    colors={[
                        '#FFC107', // yellow
                        '#4CAF50', // green
                        '#2196F3', // blue
                        '#F44336', // red
                        '#9C27B0', // purple
                        '#FF9800'  // orange
                    ]}
                />
            )}
        </Box>
    );
}
