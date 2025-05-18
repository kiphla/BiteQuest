import React from 'react';
import {
    Box,
    Container,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
    Divider,
    useTheme,
    Paper
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';

// Mock friends data
const friendsData = [
    {
        id: '1',
        name: 'Emily Chen',
        username: '@emilyskitchen',
        avatar: '/avatar-1.jpg',
        bio: 'Aspiring chef specializing in Asian fusion',
        posts: 28,
        following: true
    },
    {
        id: '2',
        name: 'Marcus Johnson',
        username: '@marcuscooks',
        avatar: '/avatar-2.jpg',
        bio: 'BBQ enthusiast and home baker',
        posts: 42,
        following: true
    },
    {
        id: '3',
        name: 'Sophia Williams',
        username: '@sophiaeats',
        avatar: '/avatar-3.jpg',
        bio: 'Plant-based recipes and sustainable cooking',
        posts: 31,
        following: true
    },
    {
        id: '4',
        name: 'Aiden Rodriguez',
        username: '@aidenplates',
        avatar: '/avatar-4.jpg',
        bio: 'Mexican cuisine and cocktail mixing',
        posts: 19,
        following: true
    },
    {
        id: '5',
        name: 'Olivia Thompson',
        username: '@oliviabakes',
        avatar: '/avatar-5.jpg',
        bio: 'Pastry chef sharing dessert recipes',
        posts: 54,
        following: true
    }
];

export default function Friends() {
    const theme = useTheme();
    const navigate = useNavigate();

    const navigateToProfile = (friendId: string) => {
        navigate(`/friendprofile/${friendId}`);
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

            {/* Friends List Header */}
            <Box sx={{ 
                pt: 8,
                pb: 4, 
                textAlign: 'center',
                background: alpha('#d6004c', 0.04),
            }}>
                <Typography 
                    variant="h4" 
                    fontWeight="bold"
                    sx={{ mb: 1 }}
                >
                    My Friends
                </Typography>
                <Typography 
                    variant="body1" 
                    color="text.secondary"
                >
                    Connect with fellow cooking enthusiasts
                </Typography>
            </Box>

            {/* Friends List */}
            <Container maxWidth="sm" sx={{ mt: 3 }}>
                <Paper 
                    elevation={0} 
                    sx={{ 
                        borderRadius: 4, 
                        overflow: 'hidden',
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <List sx={{ p: 0 }}>
                        {friendsData.map((friend, index) => (
                            <React.Fragment key={friend.id}>
                                <ListItem 
                                    alignItems="flex-start"
                                    sx={{ 
                                        p: 2,
                                        transition: 'all 0.2s ease',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: alpha('#d6004c', 0.05)
                                        }
                                    }}
                                    onClick={() => navigateToProfile(friend.id)}
                                >
                                    <ListItemAvatar>
                                        <Avatar 
                                            src={friend.avatar} 
                                            alt={friend.name}
                                            sx={{ 
                                                width: 56, 
                                                height: 56,
                                                mr: 1,
                                                border: '2px solid white',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                            }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {friend.name}
                                            </Typography>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {friend.username}
                                                </Typography>
                                                <Box sx={{ mt: 0.5 }}>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                        {friend.bio}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#d6004c' }}>
                                                        {friend.posts} recipes shared
                                                    </Typography>
                                                </Box>
                                            </React.Fragment>
                                        }
                                        sx={{ ml: 1 }}
                                    />
                                    <IconButton 
                                        edge="end" 
                                        aria-label="favorite"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle favorite
                                        }}
                                        sx={{ 
                                            color: '#d6004c',
                                            '&:hover': {
                                                bgcolor: alpha('#d6004c', 0.1)
                                            }
                                        }}
                                    >
                                        <FavoriteIcon />
                                    </IconButton>
                                </ListItem>
                                {index < friendsData.length - 1 && (
                                    <Divider component="li" />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Container>
        </Box>
    );
} 