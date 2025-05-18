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
    Button,
    Chip,
    Divider,
    Rating
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoIcon from '@mui/icons-material/Photo';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate, useParams } from 'react-router-dom';

// Mock friends data
const friendsData = [
    {
        id: '1',
        name: 'Emily Chen',
        username: '@emilyskitchen',
        avatar: '/avatar-1.jpg',
        bio: 'Aspiring chef specializing in Asian fusion',
        posts: 28,
        followerCount: 345,
        followingCount: 212,
        following: true,
        content: [
            {
                image: "https://source.unsplash.com/random/300×300/?asian-food",
                lessonName: "Crispy Spring Rolls",
                cuisineType: "Asian",
                comment: "Made these spring rolls with homemade sweet chili sauce. Crispy on the outside, flavorful on the inside!",
                timestamp: "2 days ago",
                likes: 43,
                difficulty: 2,
                cookingTime: "45 min",
                tags: ["appetizer", "fried"]
            },
            {
                image: "https://source.unsplash.com/random/300×300/?noodles",
                lessonName: "Spicy Ramen",
                cuisineType: "Japanese",
                comment: "My take on tonkotsu ramen with homemade chili oil. Perfect for cold evenings!",
                timestamp: "1 week ago",
                likes: 86,
                difficulty: 3,
                cookingTime: "2 hours",
                tags: ["soup", "spicy"]
            }
        ]
    },
    {
        id: '2',
        name: 'Marcus Johnson',
        username: '@marcuscooks',
        avatar: '/avatar-2.jpg',
        bio: 'BBQ enthusiast and home baker',
        posts: 42,
        followerCount: 521,
        followingCount: 135,
        following: true,
        content: [
            {
                image: "https://source.unsplash.com/random/300×300/?bbq",
                lessonName: "Smoked Brisket",
                cuisineType: "American",
                comment: "12 hour smoked brisket with my special dry rub. Worth every minute of the wait!",
                timestamp: "3 days ago",
                likes: 112,
                difficulty: 3,
                cookingTime: "12 hours",
                tags: ["bbq", "meat"]
            },
            {
                image: "https://source.unsplash.com/random/300×300/?bread",
                lessonName: "Sourdough Loaf",
                cuisineType: "Baking",
                comment: "Finally perfected my sourdough technique. The crust is just right!",
                timestamp: "5 days ago",
                likes: 67,
                difficulty: 2,
                cookingTime: "1 day",
                tags: ["baking", "bread"]
            }
        ]
    },
    {
        id: '3',
        name: 'Sophia Williams',
        username: '@sophiaeats',
        avatar: '/avatar-3.jpg',
        bio: 'Plant-based recipes and sustainable cooking',
        posts: 31,
        followerCount: 298,
        followingCount: 174,
        following: true,
        content: [
            {
                image: "https://source.unsplash.com/random/300×300/?vegan",
                lessonName: "Chickpea Buddha Bowl",
                cuisineType: "Vegan",
                comment: "Colorful and nutritious Buddha bowl with spiced chickpeas and tahini dressing.",
                timestamp: "1 day ago",
                likes: 54,
                difficulty: 1,
                cookingTime: "30 min",
                tags: ["healthy", "vegan"]
            }
        ]
    },
    {
        id: '4',
        name: 'Aiden Rodriguez',
        username: '@aidenplates',
        avatar: '/avatar-4.jpg',
        bio: 'Mexican cuisine and cocktail mixing',
        posts: 19,
        followerCount: 186,
        followingCount: 93,
        following: true,
        content: [
            {
                image: "https://source.unsplash.com/random/300×300/?tacos",
                lessonName: "Street Tacos",
                cuisineType: "Mexican",
                comment: "Authentic street tacos with homemade corn tortillas. Topped with fresh cilantro and lime!",
                timestamp: "4 days ago",
                likes: 38,
                difficulty: 2,
                cookingTime: "1 hour",
                tags: ["tacos", "spicy"]
            }
        ]
    },
    {
        id: '5',
        name: 'Olivia Thompson',
        username: '@oliviabakes',
        avatar: '/avatar-5.jpg',
        bio: 'Pastry chef sharing dessert recipes',
        posts: 54,
        followerCount: 475,
        followingCount: 212,
        following: true,
        content: [
            {
                image: "https://source.unsplash.com/random/300×300/?cake",
                lessonName: "Chocolate Truffle Cake",
                cuisineType: "Dessert",
                comment: "Triple layer chocolate cake with ganache frosting. Perfect for special occasions!",
                timestamp: "2 days ago",
                likes: 89,
                difficulty: 3,
                cookingTime: "3 hours",
                tags: ["chocolate", "baking"]
            },
            {
                image: "https://source.unsplash.com/random/300×300/?cookies",
                lessonName: "Brown Butter Cookies",
                cuisineType: "Dessert",
                comment: "Brown butter adds a nutty flavor to these chocolate chip cookies. Game changer!",
                timestamp: "1 week ago",
                likes: 72,
                difficulty: 1,
                cookingTime: "40 min",
                tags: ["cookies", "baking"]
            }
        ]
    }
];

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

interface Friend {
    id: string;
    name: string;
    username: string;
    avatar: string;
    bio: string;
    posts: number;
    followerCount: number;
    followingCount: number;
    following: boolean;
    content: SharedContent[];
}

export default function FriendProfile() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [friend, setFriend] = useState<Friend | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    
    // Find friend by id
    useEffect(() => {
        if (id) {
            const foundFriend = friendsData.find(f => f.id === id);
            if (foundFriend) {
                setFriend(foundFriend);
                setIsFollowing(foundFriend.following);
            }
        }
    }, [id]);
    
    if (!friend) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Friend not found</Typography>
            </Box>
        );
    }

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <Box sx={{ 
            bgcolor: '#f5f7fa', 
            minHeight: '100vh', 
            pb: 8,
            position: 'relative'
        }}>
            {/* Back button */}
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
                            src={friend.avatar} 
                            alt={friend.name}
                            sx={{ 
                                width: 90, 
                                height: 90,
                                border: `3px solid white`,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                mb: 2
                            }}
                        />
                        
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {friend.name}
                        </Typography>
                        
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                        >
                            {friend.username}
                        </Typography>
                        
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ mb: 2, textAlign: 'center' }}
                        >
                            {friend.bio}
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
                                    {friend.posts}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Recipes
                                </Typography>
                            </Box>
                            
                            <Divider orientation="vertical" flexItem />
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {friend.followerCount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Followers
                                </Typography>
                            </Box>
                            
                            <Divider orientation="vertical" flexItem />
                            
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {friend.followingCount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Following
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant={isFollowing ? "outlined" : "contained"}
                                startIcon={isFollowing ? undefined : <PersonAddIcon />}
                                onClick={toggleFollow}
                                sx={{ 
                                    borderRadius: 8,
                                    textTransform: 'none',
                                    px: 3,
                                    py: 1,
                                    ...(isFollowing ? {
                                        borderColor: '#d6004c',
                                        color: '#d6004c',
                                        '&:hover': {
                                            borderColor: '#d6004c',
                                            bgcolor: alpha('#d6004c', 0.05),
                                        }
                                    } : {
                                        boxShadow: '0 4px 8px rgba(214,0,76,0.3)',
                                        bgcolor: '#d6004c',
                                        '&:hover': {
                                            bgcolor: alpha('#d6004c', 0.9),
                                            boxShadow: '0 6px 12px rgba(214,0,76,0.4)',
                                        }
                                    })
                                }}
                            >
                                {isFollowing ? "Following" : "Follow"}
                            </Button>
                            
                            <Button
                                variant="outlined"
                                startIcon={<MessageIcon />}
                                sx={{ 
                                    borderRadius: 8,
                                    textTransform: 'none',
                                    px: 3,
                                    py: 1,
                                    borderColor: theme.palette.divider,
                                    color: 'text.secondary',
                                    '&:hover': {
                                        borderColor: 'text.primary',
                                    }
                                }}
                            >
                                Message
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
            
            {/* Shared Recipes Content */}
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
                        {friend.name.split(' ')[0]}'s Culinary Creations
                    </Typography>
                    
                    {friend.content && friend.content.length > 0 ? (
                        <Grid container spacing={3}>
                            {friend.content.map((post, index) => (
                                <Grid item xs={12} key={index}>
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
                                                height="240"
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
                            <Typography variant="h6" color="text.secondary">
                                No recipes shared yet
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
} 