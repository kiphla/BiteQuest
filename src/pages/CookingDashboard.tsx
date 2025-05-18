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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../components/Profile';
import AddIcon from '@mui/icons-material/Add';

export default function CookingDashboard() {
    const theme = useTheme();
    const navigate = useNavigate();

    const userCourses = [
        { name: 'Asian Cuisine', image: '/asian-cusine.jpg' },
        { name: 'Baking Basics', image: '/baking.jpg' },
        { name: 'Mediterranean Magic', image: '/meda.jpg' },
        { name: 'Vegan Delights', image: '/vegan.jpg' },
    ];

    const recommendedCourses = [
        { name: 'Sushi Mastery', image: '/sushi.jpg' },
        { name: 'Indian Street Food', image: '/indianstreet.jpg' },
    ];

    const [primary, ...others] = userCourses;

    return (
        <Box sx={{ bgcolor: theme.palette.grey[50], minHeight: '100vh', pt: 4 }}>
            <Profile />
            <Container maxWidth="md">
                <Box sx={{ position: 'relative', mb: 0 }}>
                    <Card sx={{ height: 250, borderRadius: 4, overflow: 'hidden', boxShadow: 4 }}>
                        <CardMedia
                            component="img"
                            image={primary.image}
                            alt={primary.name}
                            sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
                        />
                    </Card>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            bgcolor: 'rgba(0, 0, 0, 0.4)',
                            color: 'white',
                            px: 2,
                            py: 1,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontFamily: 'Playfair Display, serif' }}>
                            {primary.name}
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* Your Courses */}
            <Container maxWidth="md">
                <Typography
                    variant="h6"
                    sx={{
                        mt: 4,
                        mb: 2,
                        fontWeight: 'bold',
                        fontFamily: 'Playfair Display, serif',
                        color: theme.palette.primary.main,
                    }}
                >
                    Your Courses
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: 2,
                        px: 1,
                        pb: 2,
                        scrollSnapType: 'x mandatory',
                    }}
                >
                    {others.map((course, index) => {
                        const isClickable = course.name === 'Mediterranean Magic';
                        const cardContent = (
                            <Card
                                sx={{
                                    minWidth: 180,
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: 2,
                                    scrollSnapAlign: 'start',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={course.image}
                                    alt={course.name}
                                    sx={{ height: 120, objectFit: 'cover' }}
                                />
                                <Box sx={{ px: 1, py: 1 }}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {course.name}
                                    </Typography>
                                </Box>
                            </Card>
                        );

                        return isClickable ? (
                            <ButtonBase
                                key={index}
                                onClick={() => navigate('/lessonpath')}
                                sx={{ borderRadius: 3 }}
                            >
                                {cardContent}
                            </ButtonBase>
                        ) : (
                            <Box key={index}>{cardContent}</Box>
                        );
                    })}
                </Box>
            </Container>

            {/* Recommended Courses */}
            <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        fontFamily: 'Playfair Display, serif',
                        color: theme.palette.primary.main,
                    }}
                >
                    Recommended for You
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recommendedCourses.map((course, index) => (
                        <ButtonBase key={index} sx={{ borderRadius: 3 }}>
                            <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 2, width: '100%' }}>
                                <CardMedia
                                    component="img"
                                    image={course.image}
                                    alt={course.name}
                                    sx={{ height: 130, objectFit: 'cover' }}
                                />
                                <Box sx={{ px: 1, py: 1 }}>
                                    <Typography variant="body2" fontWeight="bold">
                                        {course.name}
                                    </Typography>
                                </Box>
                            </Card>
                        </ButtonBase>
                    ))}
                </Box>

                <Box textAlign="center" mt={4}>
                    <Button variant="contained" size="large" sx={{ borderRadius: 3, px: 4, py: 1.5 }}>
                        Add New Course
                    </Button>
                </Box>
            </Container>

            {/* Floating Action Button */}
            <Fab
                variant="extended"
                color="primary"
                onClick={() => navigate('/pantry')}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
            >
                <AddIcon sx={{ mr: 1 }} />
                Add Ingredients
            </Fab>
        </Box>
    );
}
