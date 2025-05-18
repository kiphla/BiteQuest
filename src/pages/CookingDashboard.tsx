//@ts-nocheck
import {
    Box,
    Container,
    Card,
    CardMedia,
    Typography,
    Button,
    ButtonBase,
    useTheme,
    Fab,
    Avatar,
    AppBar,
    Toolbar,
    IconButton,
    Divider,
    Paper,
    Chip,
    Grid,
    Slide,
    useScrollTrigger,
    Zoom
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { alpha } from '@mui/material/styles';
import { useState, useEffect } from 'react';

// Import cuisine paths data
import cuisinePathsData from '../data/cuisinePaths.json';

// Assuming Profile component provides user information
import { Profile } from '../components/Profile';

// Define types for our data
interface Recipe {
  name: string;
  ingredient: string;
  amount: string;
}

interface Lesson {
  id: number;
  name: string;
  unlocked: boolean;
  difficulty: number;
  recipes: Recipe[];
  image: string;
}

interface CuisinePath {
  id: string;
  name: string;
  image: string;
  progress: number;
  totalLessons: number;
  description: string;
  lessons: Lesson[];
}

export default function CookingDashboard() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);
    
    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            setScrollPosition(position);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Mock user data (in a real app, this would come from your Profile component)
    const user = {
        name: "Jane Doe",
        avatar: "/avatar.jpg",
        level: "Amateur Chef",
        completedLessons: 12,
        badges: ["Pasta Pro", "Dessert Master"]
    };

    // Use the imported cuisine paths data with proper typing
    const cuisinePaths: CuisinePath[] = cuisinePathsData as CuisinePath[];

    const recommendedCourses = [
        { name: 'Sushi Mastery', image: '/sushi.jpg', rating: 4.8, duration: '4 weeks' },
        { name: 'Indian Street Food', image: '/indianstreet.jpg', rating: 4.6, duration: '3 weeks' },
    ];

    const [primary, ...others] = cuisinePaths;

    // Calculate progress indicator width
    const getProgressWidth = (progress: number) => {
        return `${progress}%`;
    };
    
    // Determine if we should show condensed header
    const isScrolled = scrollPosition > 100;

    const handleCourseClick = (courseId: string) => {
        navigate(`/lessonpath/${courseId}`);
    };

    return (
        <Box sx={{ bgcolor: theme.palette.grey[50], minHeight: '100vh', pb: 10 }}>
            {/* Thin colored bar at the very top */}
            <Box 
                sx={{ 
                    height: 3, 
                    width: '100%', 
                    bgcolor: theme.palette.primary.main,
                    position: 'fixed',
                    top: 0,
                    zIndex: theme.zIndex.drawer + 2
                }}
            />
            
            {/* Simplified AppBar with Profile */}
            <AppBar 
                position="fixed"
                color="default"
                elevation={isScrolled ? 1 : 0}
                sx={{ 
                    borderBottom: `1px solid ${theme.palette.grey[200]}`,
                    bgcolor: 'background.paper',
                    zIndex: theme.zIndex.drawer + 1,
                    top: 3, // Start below the thin bar
                }}
            >
                <Container maxWidth="md">
                    <Toolbar sx={{ px: { xs: 0 }, height: 60, minHeight: 60 }}>
                        {/* Left side - App name/logo */}
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 700,
                                color: theme.palette.primary.main
                            }}
                        >
                            BiteQuest
                        </Typography>
                        
                        <Box sx={{ flexGrow: 1 }} />
                        
                        {/* Center action buttons */}
                        <Box sx={{ display: 'flex' }}>
                            <IconButton 
                                size="small"
                                onClick={() => navigate('/pantry')}
                                sx={{
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                <KitchenIcon />
                            </IconButton>
                        </Box>
                        
                        {/* Right side - User avatar */}
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                            {!isScrolled && (
                                <Typography 
                                    variant="body2" 
                                    fontWeight="medium" 
                                    sx={{ mr: 1.5, display: { xs: 'none', sm: 'block' } }}
                                >
                                    {user.name.split(' ')[0]}
                                </Typography>
                            )}
                            <Avatar 
                                src={user.avatar} 
                                alt={user.name}
                                onClick={() => navigate('/profile')}
                                sx={{ 
                                    width: 36, 
                                    height: 36,
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            
            {/* Toolbar placeholder */}
            <Toolbar sx={{ minHeight: 63 }} />

            <Container maxWidth="md" sx={{ mt: 3 }}>
                {/* Welcome message */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: 'Playfair Display, serif' }}>
                        Welcome back, {user.name.split(' ')[0]}!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Continue your culinary journey with today's recommendations
                    </Typography>
                </Box>
                
                {/* Featured Course (Previously Primary) */}
                <Paper 
                    elevation={0} 
                    sx={{ 
                        borderRadius: 4, 
                        overflow: 'hidden', 
                        mb: 4,
                        border: `1px solid ${theme.palette.grey[200]}`,
                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.12)}`
                    }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <CardMedia
                            component="img"
                            image={primary.image}
                            alt={primary.name}
                            sx={{ height: 200, width: '100%', objectFit: 'cover' }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                color: 'white',
                                px: 3,
                                py: 2,
                            }}
                        >
                            <Chip 
                                label="Continue Learning" 
                                size="small" 
                                color="primary"
                                sx={{ mb: 1, fontWeight: 'bold' }}
                            />
                            <Typography variant="h6" sx={{ fontFamily: 'Playfair Display, serif', mb: 0.5 }}>
                                {primary.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTimeIcon fontSize="small" />
                                <Typography variant="caption">
                                    {primary.totalLessons} lessons
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                Progress: {primary.progress}%
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="primary">
                                {Math.round(primary.progress / 100 * primary.totalLessons)}/{primary.totalLessons} lessons
                            </Typography>
                        </Box>
                        <Box sx={{ height: 8, bgcolor: theme.palette.grey[200], borderRadius: 4, overflow: 'hidden' }}>
                            <Box 
                                sx={{ 
                                    height: '100%', 
                                    width: getProgressWidth(primary.progress), 
                                    bgcolor: theme.palette.primary.main,
                                    borderRadius: 4
                                }} 
                            />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                sx={{ 
                                    borderRadius: 2,
                                    py: 1,
                                    fontWeight: 'bold'
                                }}
                                onClick={() => handleCourseClick(primary.id)}
                            >
                                Continue Learning
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>

            {/* Your Courses */}
            <Container maxWidth="md">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Playfair Display, serif',
                            color: theme.palette.text.primary,
                        }}
                    >
                        Your Courses
                    </Typography>
                    <Button 
                        variant="text" 
                        size="small" 
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        View All
                    </Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                    {others.map((course, index) => {
                        const isClickable = course.name === 'Mediterranean Magic';
                        
                        const courseCard = (
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: `0 2px 12px ${alpha(theme.palette.common.black, 0.08)}`,
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    height: 260,
                                    width: '100%',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.12)}`,
                                    }
                                }}
                            >
                                <Box sx={{ position: 'relative', height: 140 }}>
                                    <CardMedia
                                        component="img"
                                        image={course.image}
                                        alt={course.name}
                                        sx={{ height: '100%', objectFit: 'cover' }}
                                    />
                                    <Box 
                                        sx={{ 
                                            position: 'absolute', 
                                            bottom: 0, 
                                            left: 0, 
                                            right: 0,
                                            height: 6, 
                                            bgcolor: theme.palette.grey[200]
                                        }}
                                    >
                                        <Box 
                                            sx={{ 
                                                height: '100%', 
                                                width: getProgressWidth(course.progress), 
                                                bgcolor: theme.palette.primary.main
                                            }} 
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {course.name}
                                    </Typography>
                                    
                                    <Box>
                                        <Box 
                                            sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                mb: 1.5
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <MenuBookIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {course.totalLessons} lessons
                                                </Typography>
                                            </Box>
                                            <Typography variant="caption" fontWeight="bold" color="primary.main">
                                                {course.progress}% complete
                                            </Typography>
                                        </Box>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ 
                                                borderRadius: 2,
                                                py: 0.5
                                            }}
                                            onClick={() => handleCourseClick(course.id)}
                                        >
                                            Continue
                                        </Button>
                                    </Box>
                                </Box>
                            </Card>
                        );

                        const wrapperProps = {
                            width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.33% - 11px)' },
                            position: 'relative',
                            mb: { xs: 2, sm: 2 }
                        };

                        return (
                            <Box key={index} sx={wrapperProps}>
                                {courseCard}
                            </Box>
                        );
                    })}
                </Box>
            </Container>

            {/* Recommended Courses */}
            <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            fontFamily: 'Playfair Display, serif',
                            color: theme.palette.text.primary,
                        }}
                    >
                        Recommended for You
                    </Typography>
                    <Button 
                        variant="text" 
                        size="small" 
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        View All
                    </Button>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {recommendedCourses.map((course, index) => (
                        <Box 
                            key={index} 
                            sx={{ 
                                width: { xs: '100%', sm: 'calc(50% - 8px)' },
                                mb: { xs: 2, sm: 0 }
                            }}
                        >
                            <ButtonBase 
                                sx={{ 
                                    display: 'block', 
                                    textAlign: 'initial', 
                                    width: '100%',
                                    borderRadius: 3,
                                }}
                            >
                                <Card
                                    sx={{
                                        display: 'flex',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        boxShadow: `0 2px 12px ${alpha(theme.palette.common.black, 0.08)}`,
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: `0 8px 24px ${alpha(theme.palette.common.black, 0.12)}`,
                                        }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={course.image}
                                        alt={course.name}
                                        sx={{ width: 120, height: 120, objectFit: 'cover' }}
                                    />
                                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                            {course.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                            <StarIcon sx={{ color: '#FFC107', fontSize: 18, mr: 0.5 }} />
                                            <Typography variant="caption" fontWeight="medium">
                                                {course.rating}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5, color: theme.palette.text.secondary }} />
                                            <Typography variant="caption" color="text.secondary">
                                                {course.duration}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </ButtonBase>
                        </Box>
                    ))}
                </Box>

                <Box textAlign="center" mt={4}>
                    <Button 
                        variant="outlined" 
                        size="large" 
                        startIcon={<AddIcon />}
                        sx={{ 
                            borderRadius: 3, 
                            px: 4, 
                            py: 1.5, 
                            fontWeight: 'bold',
                            borderWidth: 2,
                            '&:hover': {
                                borderWidth: 2
                            }
                        }}
                    >
                        Browse More Courses
                    </Button>
                </Box>
            </Container>

            {/* <Fab
                variant="extended"
                color="primary"
                onClick={() => navigate('/pantry')}
                sx={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                    transform: isScrolled ? 'scale(0.85)' : 'scale(1)',
                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                    '&:hover': {
                        boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.6)}`,
                    },
                }}
            >
                <AddIcon sx={{ mr: 1 }} />
                {isScrolled ? 'Add' : 'Add Ingredients'}
            </Fab> */}
        </Box>
    );
}