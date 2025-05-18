import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Grid,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    useTheme,
    Paper,
    Toolbar,
    Fade,
    Button,
    Chip,
    Divider,
    Rating
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoIcon from '@mui/icons-material/Photo';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ShareIcon from '@mui/icons-material/Share';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock user data
const userData = {
    name: "Jane Doe",
    username: "@janecooks",
    avatar: "/avatar.jpg",
    bio: "Passionate home cook exploring world cuisines",
    completedLessons: 12,
    followerCount: 243,
    followingCount: 185
};

// Local storage key for shared content
const SHARED_CONTENT_KEY = 'bitequest_shared_content';

// Define type for shared content
interface SharedContent {
    image: string;
    lessonName: string;
    cuisineType: string;
    comment: string;
    timestamp?: string;
    likes?: number;
    difficulty?: number;
    cookingTime?: string;
    tags?: string[];
}

export default function Profile() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [sharedContent, setSharedContent] = useState<SharedContent[]>([]);
    
    // Load shared content from local storage
    const loadSharedContent = () => {
        try {
            const storedContent = localStorage.getItem(SHARED_CONTENT_KEY);
            if (storedContent) {
                const parsedContent = JSON.parse(storedContent);
                setSharedContent(parsedContent);
                console.log('Loaded shared content:', parsedContent);
            }
        } catch (e) {
            console.error('Error loading shared content', e);
            setSharedContent([]);
        }
    };
    
    // Load content on initial render
    useEffect(() => {
        loadSharedContent();
    }, []);
    
    // Reload content when navigating to the profile
    useEffect(() => {
        if (location.state?.fromShare || location.state?.timestamp) {
            console.log('Reloading shared content after sharing');
            loadSharedContent();
        }
    }, [location.state]);
    
    const navigateToShare = () => {
        navigate('/share');
    };

    return (
        <Box sx={{ 
            bgcolor: '#f5f7fa', 
            minHeight: '100vh', 
            pb: 8,
            position: 'relative'
        }}>
            {/* Back button only */}
            <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}>
                <IconButton 
                    edge="start" 
                    onClick={() => navigate(-1)}
                    sx={{ 
                        bgcolor: 'rgba(255,255,255,0.8)',
                        '&:hover': { bgcolor: 'white' }
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Box>

            {/* Profile Header with stats */}
            <Box sx={{ 
                background: alpha('#d6004c', 0.04),
                pb: 3, 
                mb: 3, 
                pt: 3,
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
            }}>
                <Container maxWidth="sm">
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                    }}>
                        <Avatar 
                            src={userData.avatar} 
                            alt={userData.name}
                            sx={{ 
                                width: 90, 
                                height: 90,
                                border: `3px solid white`,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                mb: 2
                            }}
                        />
                        
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {userData.name}
                        </Typography>
                        
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            {userData.bio}
                        </Typography>

                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            gap: 4, 
                            mb: 3,
                            width: '100%'
                        }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {userData.completedLessons}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Recipes
                                </Typography>
                            </Box>
                            
                            <Divider orientation="vertical" flexItem />
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {userData.followerCount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Followers
                                </Typography>
                            </Box>
                            
                            <Divider orientation="vertical" flexItem />
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {userData.followingCount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Following
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Button
                            variant="contained"
                            size="medium"
                            startIcon={<PhotoIcon />}
                            onClick={navigateToShare}
                            sx={{ 
                                borderRadius: 8,
                                textTransform: 'none',
                                px: 3,
                                py: 1,
                                boxShadow: '0 4px 8px rgba(214,0,76,0.3)',
                                bgcolor: '#d6004c',
                                '&:hover': {
                                    bgcolor: alpha('#d6004c', 0.9),
                                    boxShadow: '0 6px 12px rgba(214,0,76,0.4)',
                                },
                                mb: 2
                            }}
                        >
                            Share New Recipe
                        </Button>
                        
                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={() => navigate('/friends')}
                            sx={{ 
                                borderRadius: 8,
                                textTransform: 'none',
                                px: 3,
                                py: 1,
                                borderColor: '#d6004c',
                                color: '#d6004c',
                                '&:hover': {
                                    borderColor: '#d6004c',
                                    bgcolor: alpha('#d6004c', 0.05),
                                }
                            }}
                        >
                            View Friends
                        </Button>
                    </Box>
                </Container>
            </Box>
            
            {/* Shared Recipes Content with improved cards */}
            <Container maxWidth="sm">
                <Box sx={{ mb: 3 }}>
                    <Typography 
                        variant="h5" 
                        fontWeight="bold" 
                        sx={{ 
                            mb: 3,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <RestaurantIcon 
                            sx={{ 
                                mr: 1, 
                                color: '#d6004c' 
                            }} 
                        />
                        My Culinary Creations
                    </Typography>
                    
                    {sharedContent.length > 0 ? (
                        <Grid container spacing={3}>
                            {sharedContent.map((post, index) => (
                                // @ts-ignore - Suppressing Grid component prop type issues
                                <Grid item xs={12} sm={6} key={index}>
                                    <Fade in={true} timeout={300 + index * 100}>
                                        <Card 
                                            elevation={0} 
                                            sx={{ 
                                                borderRadius: 4, 
                                                overflow: 'hidden',
                                                border: `1px solid ${theme.palette.divider}`,
                                                mb: 1,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    boxShadow: '0 12px 20px rgba(0,0,0,0.12)'
                                                }
                                            }}
                                        >
                                            <Box sx={{ position: 'relative' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={post.image}
                                                    alt={post.lessonName}
                                                    sx={{ 
                                                        objectFit: 'cover',
                                                        filter: 'brightness(0.9)'
                                                    }}
                                                />
                                                <Box 
                                                    sx={{ 
                                                        position: 'absolute', 
                                                        top: 12, 
                                                        right: 12,
                                                        display: 'flex',
                                                        gap: 1
                                                    }}
                                                >
                                                    {post.tags && post.tags.slice(0, 2).map((tag, i) => (
                                                        <Chip 
                                                            key={i}
                                                            label={tag}
                                                            size="small"
                                                            sx={{ 
                                                                bgcolor: 'rgba(255,255,255,0.85)',
                                                                fontWeight: 'medium',
                                                                fontSize: '0.7rem'
                                                            }}
                                                        />
                                                    ))}
                                                </Box>
                                                
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 0,
                                                        left: 0,
                                                        right: 0,
                                                        p: 1.5,
                                                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                                        color: 'white'
                                                    }}
                                                >
                                                    <Typography variant="subtitle1" fontWeight="bold">
                                                        {post.lessonName}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            
                                            <CardContent sx={{ p: 2 }}>
                                                <Box 
                                                    sx={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between', 
                                                        alignItems: 'center', 
                                                        mb: 1.5 
                                                    }}
                                                >
                                                    <Chip
                                                        label={post.cuisineType}
                                                        size="small"
                                                        color="primary"
                                                        variant="outlined"
                                                        sx={{ 
                                                            fontSize: '0.75rem',
                                                            height: 24,
                                                            borderColor: '#d6004c',
                                                            color: '#d6004c'
                                                        }}
                                                    />
                                                    
                                                    <Typography variant="caption" color="text.secondary">
                                                        {post.timestamp || 'Just now'}
                                                    </Typography>
                                                </Box>
                                                
                                                <Box 
                                                    sx={{ 
                                                        display: 'flex', 
                                                        gap: 2,
                                                        mb: 2
                                                    }}
                                                >
                                                    {post.difficulty && (
                                                        <Box 
                                                            sx={{ 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                gap: 0.5 
                                                            }}
                                                        >
                                                            <LocalFireDepartmentIcon 
                                                                color="error" 
                                                                sx={{ fontSize: 18 }} 
                                                            />
                                                            <Rating 
                                                                value={post.difficulty} 
                                                                max={3} 
                                                                readOnly 
                                                                size="small"
                                                                icon={<LocalFireDepartmentIcon fontSize="inherit" />}
                                                                emptyIcon={<LocalFireDepartmentIcon fontSize="inherit" sx={{ opacity: 0.3 }} />}
                                                            />
                                                        </Box>
                                                    )}
                                                    
                                                    {post.cookingTime && (
                                                        <Box 
                                                            sx={{ 
                                                                display: 'flex', 
                                                                alignItems: 'center', 
                                                                gap: 0.5 
                                                            }}
                                                        >
                                                            <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                            <Typography variant="caption" color="text.secondary">
                                                                {post.cookingTime}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                                
                                                {post.comment && (
                                                    <Typography 
                                                        variant="body2" 
                                                        sx={{ 
                                                            mb: 2,
                                                            display: '-webkit-box',
                                                            overflow: 'hidden',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 2,
                                                            lineHeight: 1.5
                                                        }}
                                                    >
                                                        {post.comment}
                                                    </Typography>
                                                )}
                                                
                                                <Box 
                                                    sx={{ 
                                                        display: 'flex', 
                                                        justifyContent: 'space-between', 
                                                        alignItems: 'center',
                                                        mt: 'auto'
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <IconButton 
                                                            size="small" 
                                                            sx={{ 
                                                                transition: 'transform 0.2s',
                                                                '&:hover': {
                                                                    transform: 'scale(1.1)'
                                                                }
                                                            }}
                                                        >
                                                            <FavoriteIcon 
                                                                fontSize="small" 
                                                                sx={{ 
                                                                    color: '#d6004c'
                                                                }} 
                                                            />
                                                        </IconButton>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {post.likes || 0}
                                                        </Typography>
                                                    </Box>
                                                    <IconButton 
                                                        size="small"
                                                        sx={{ 
                                                            bgcolor: alpha('#d6004c', 0.1),
                                                            '&:hover': {
                                                                bgcolor: alpha('#d6004c', 0.2)
                                                            }
                                                        }}
                                                    >
                                                        <ShareIcon 
                                                            fontSize="small" 
                                                            sx={{ color: '#d6004c' }}
                                                        />
                                                    </IconButton>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ 
                            textAlign: 'center', 
                            py: 8, 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: 'white',
                            borderRadius: 4,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.07)',
                            background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                        }}>
                            <Paper
                                elevation={0}
                                sx={{ 
                                    width: 100, 
                                    height: 100, 
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: alpha('#d6004c', 0.1),
                                    mb: 3,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: -15,
                                        left: -15,
                                        right: -15,
                                        bottom: -15,
                                        background: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(214,0,76,0.1) 100%)',
                                        animation: 'pulse 2s infinite'
                                    },
                                    '@keyframes pulse': {
                                        '0%': { transform: 'scale(0.9)' },
                                        '50%': { transform: 'scale(1.1)' },
                                        '100%': { transform: 'scale(0.9)' }
                                    }
                                }}
                            >
                                <AddPhotoAlternateIcon 
                                    sx={{ 
                                        fontSize: 52, 
                                        color: '#d6004c',
                                        position: 'relative',
                                        zIndex: 1
                                    }} 
                                />
                            </Paper>
                            <Typography variant="h5" gutterBottom fontWeight="bold">
                                Your gallery is empty
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph sx={{ maxWidth: 340, mx: 'auto', mb: 3 }}>
                                Share photos of your culinary creations to build your personal cooking gallery and inspire others.
                            </Typography>
                            <Button 
                                variant="contained" 
                                startIcon={<PhotoIcon />}
                                onClick={navigateToShare}
                                sx={{ 
                                    mt: 2, 
                                    borderRadius: 8,
                                    px: 4,
                                    py: 1.2,
                                    textTransform: 'none',
                                    fontWeight: 'medium',
                                    bgcolor: '#d6004c',
                                    boxShadow: '0 6px 12px rgba(214,0,76,0.3)',
                                    '&:hover': {
                                        bgcolor: alpha('#d6004c', 0.9),
                                        boxShadow: '0 8px 16px rgba(214,0,76,0.4)',
                                    }
                                }}
                            >
                                Create Your First Post
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
} 