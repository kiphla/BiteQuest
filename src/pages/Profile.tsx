import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Tabs,
    Tab,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    Chip,
    Divider,
    Button,
    IconButton,
    useTheme,
    Paper,
    AppBar,
    Toolbar,
    Badge,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CollectionsIcon from '@mui/icons-material/Collections';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoIcon from '@mui/icons-material/Photo';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock user data
const userData = {
    name: "Jane Doe",
    username: "@janecooks",
    avatar: "/avatar.jpg",
    bio: "Passionate home cook exploring world cuisines. Love to experiment with new flavors!",
    level: "Amateur Chef",
    completedLessons: 12,
    followers: 248,
    following: 156,
    achievements: [
        "Pasta Pro", 
        "Dessert Master", 
        "Asian Explorer"
    ]
};

// Mock shared content data
const sharedContent = [
    {
        id: 1,
        image: "/stir-fry-complete.jpg",
        lessonName: "Simple Stir Fry",
        cuisineType: "Asian Cuisine",
        comment: "Loved making this! The vegetables stayed so crisp and colorful.",
        likes: 24,
        timestamp: "2 days ago"
    },
    {
        id: 2,
        image: "/fattoush.jpg",
        lessonName: "Fattoush Salad",
        cuisineType: "Mediterranean Magic",
        comment: "So fresh and zesty! Perfect for summer evenings.",
        likes: 36,
        timestamp: "1 week ago"
    },
    {
        id: 3,
        image: "/spring-rolls.jpg",
        lessonName: "Spring Rolls",
        cuisineType: "Asian Cuisine",
        comment: "First time making these and they turned out great!",
        likes: 19,
        timestamp: "2 weeks ago"
    }
];

// Mock saved recipes
const savedRecipes = [
    {
        id: 1,
        image: "/hummus.jpg",
        name: "Hummus",
        cuisine: "Mediterranean Magic"
    },
    {
        id: 2,
        image: "/sushi.jpg",
        name: "Sushi Basics",
        cuisine: "Asian Cuisine"
    }
];

// Local storage key for shared content
const SHARED_CONTENT_KEY = 'bitequest_shared_content';

export default function Profile() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [tabValue, setTabValue] = useState(0);
    const [sharedContent, setSharedContent] = useState([]);
    
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

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    
    const navigateToShare = () => {
        navigate('/share');
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pb: 8 }}>
            {/* App Bar */}
            <AppBar 
                position="static" 
                color="default" 
                elevation={0}
                sx={{ 
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    bgcolor: 'white'
                }}
            >
                <Container maxWidth="md">
                    <Toolbar sx={{ px: { xs: 0 } }}>
                        <IconButton 
                            edge="start" 
                            onClick={() => navigate(-1)}
                            sx={{ mr: 1 }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 'medium',
                                flex: 1
                            }}
                        >
                            Profile
                        </Typography>
                        {tabValue === 0 && sharedContent.length > 0 && (
                            <IconButton onClick={loadSharedContent} sx={{ mr: 1 }}>
                                <RestaurantIcon />
                            </IconButton>
                        )}
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Profile Header */}
            <Box sx={{ bgcolor: 'white', pb: 2 }}>
                <Container maxWidth="md">
                    <Box sx={{ pt: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                        <Avatar 
                            src={userData.avatar} 
                            alt={userData.name}
                            sx={{ 
                                width: 100, 
                                height: 100,
                                border: `3px solid ${theme.palette.primary.main}`,
                                boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.2)}`,
                                mr: { sm: 4 },
                                mb: { xs: 2, sm: 0 }
                            }}
                        />
                        
                        <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flex: 1 }}>
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                {userData.name}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                {userData.username}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                                {userData.bio}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 3 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {userData.followers}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Followers
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {userData.following}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Following
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {userData.completedLessons}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Recipes
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Achievements */}
                    <Box sx={{ mt: 3, display: 'flex', overflowX: 'auto', pb: 1, gap: 1 }}>
                        {userData.achievements.map((achievement, index) => (
                            <Chip 
                                key={index}
                                icon={<EmojiEventsIcon sx={{ color: theme.palette.warning.main }} />}
                                label={achievement}
                                sx={{ 
                                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                                    borderColor: theme.palette.warning.main,
                                    fontWeight: 'medium',
                                    px: 1
                                }}
                                variant="outlined"
                            />
                        ))}
                    </Box>
                </Container>
            </Box>
            
            {/* Tabs Navigation */}
            <Box sx={{ bgcolor: 'white', borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Container maxWidth="md">
                    <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                minWidth: 'unset',
                                fontWeight: 'medium',
                                fontSize: '0.9rem',
                            }
                        }}
                    >
                        <Tab icon={<CollectionsIcon />} label="Shared" />
                        <Tab icon={<BookmarkIcon />} label="Saved" />
                        <Tab icon={<RestaurantIcon />} label="Recipes" />
                    </Tabs>
                </Container>
            </Box>
            
            {/* Tab Content */}
            <Container maxWidth="md" sx={{ mt: 3 }}>
                {/* Shared Content Tab */}
                {tabValue === 0 && (
                    <>
                        {sharedContent.length > 0 ? (
                            <Grid container spacing={2}>
                                {sharedContent.map((post, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card 
                                            elevation={0} 
                                            sx={{ 
                                                borderRadius: 3, 
                                                overflow: 'hidden',
                                                border: `1px solid ${theme.palette.divider}`
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                image={post.image}
                                                alt={post.lessonName}
                                            />
                                            <CardContent>
                                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                    {post.lessonName}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" gutterBottom component="div">
                                                    {post.cuisineType} • {post.timestamp || 'Just now'}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    {post.comment}
                                                </Typography>
                                                
                                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <IconButton size="small">
                                                            <FavoriteIcon 
                                                                fontSize="small" 
                                                                sx={{ 
                                                                    color: alpha(theme.palette.error.main, 0.9) 
                                                                }} 
                                                            />
                                                        </IconButton>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {post.likes || 0}
                                                        </Typography>
                                                    </Box>
                                                    <IconButton size="small">
                                                        <ShareIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Box sx={{ 
                                textAlign: 'center', 
                                py: 6, 
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center' 
                            }}>
                                <Paper
                                    elevation={0}
                                    sx={{ 
                                        width: 80, 
                                        height: 80, 
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        mb: 3
                                    }}
                                >
                                    <AddPhotoAlternateIcon 
                                        sx={{ 
                                            fontSize: 42, 
                                            color: theme.palette.primary.main 
                                        }} 
                                    />
                                </Paper>
                                <Typography variant="h6" gutterBottom>
                                    Nothing shared yet
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph sx={{ maxWidth: 400, mx: 'auto' }}>
                                    Complete cooking lessons and share photos of your culinary creations to see them here.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    startIcon={<PhotoIcon />}
                                    onClick={navigateToShare}
                                    sx={{ mt: 2, borderRadius: 2 }}
                                >
                                    Share a Recipe
                                </Button>
                            </Box>
                        )}
                    </>
                )}
                
                {/* Saved Recipes Tab */}
                {tabValue === 1 && (
                    <Grid container spacing={2}>
                        {savedRecipes.map(recipe => (
                            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                                <Card 
                                    elevation={0} 
                                    sx={{ 
                                        borderRadius: 3, 
                                        overflow: 'hidden',
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                >
                                    <CardActionArea onClick={() => navigate(`/lesson/${recipe.id}`)}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={recipe.image}
                                            alt={recipe.name}
                                        />
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {recipe.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {recipe.cuisine}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
                
                {/* Recipes Tab */}
                {tabValue === 2 && (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <RestaurantIcon sx={{ fontSize: 60, color: alpha(theme.palette.text.primary, 0.2), mb: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Recipe Collection
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom paragraph>
                            Start creating and storing your own recipes
                        </Typography>
                        <Button 
                            variant="contained" 
                            sx={{ mt: 2, borderRadius: 2 }}
                        >
                            Add First Recipe
                        </Button>
                    </Box>
                )}
            </Container>
        </Box>
    );
} 