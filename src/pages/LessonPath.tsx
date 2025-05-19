//@ts-nocheck
import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    CardMedia,
    useTheme,
    IconButton,
    ButtonBase,
    Modal,
    Paper,
    Chip,
    Checkbox,
    FormControlLabel,
    Stack,
    Button,
    Avatar,
    Tooltip,
    Fade,
    Card,
    CircularProgress,
    Divider,
    Grid,
    CardContent,
    CardActionArea,
    Badge,
    LinearProgress
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { alpha } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import ingredientsData from './ingredients.js';
import cuisinePathsData from '../data/cuisinePaths.json';

interface Ingredient {
    ingredient: string;
    category: string;
    quantity?: string;
    unit?: string;
    image?: string;
    description?: string;
}

interface Recipe {
    name: string;
    ingredient: string;
    amount: string;
    done?: boolean;
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

export default function LessonPath() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { cuisineId } = useParams();
    const [openLesson, setOpenLesson] = React.useState<Lesson | null>(null);
    const [showLockedModal, setShowLockedModal] = React.useState(false);
    const [selectedLockedLesson, setSelectedLockedLesson] = React.useState<Lesson | null>(null);
    const [tokens, setTokens] = React.useState(5); // Starting with 5 tokens
    const [currentCuisine, setCurrentCuisine] = useState<CuisinePath | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    // Get the cuisine data based on the cuisineId parameter
    useEffect(() => {
        setLoading(true);
        // Simulate loading time for smooth transitions
        setTimeout(() => {
            // Default to "mediterranean-magic" if no cuisineId is provided
            const id = cuisineId || "mediterranean-magic";
            const cuisine = cuisinePathsData.find((c: CuisinePath) => c.id === id);
            
            if (cuisine) {
                setCurrentCuisine(cuisine);
                setLessons(cuisine.lessons);
            } else {
                // Fallback to Mediterranean cuisine if not found
                const fallbackCuisine = cuisinePathsData.find((c: CuisinePath) => c.id === "mediterranean-magic");
                if (fallbackCuisine) {
                    setCurrentCuisine(fallbackCuisine);
                    setLessons(fallbackCuisine.lessons);
                }
            }
            setLoading(false);
        }, 500);
    }, [cuisineId]);

    const getAvailableQuantity = (ingredientName: string): string => {
        const pantryIngredient = ingredientsData.find(
            (item: Ingredient) => item.ingredient.toLowerCase() === ingredientName.toLowerCase()
        );
        return pantryIngredient?.quantity || '0';
    };

    // Calculate how many lessons are unlocked
    const completedLessons = lessons.filter(lesson => lesson.unlocked).length;
    const percentComplete = lessons.length > 0 ? Math.round((completedLessons / lessons.length) * 100) : 0;

    const handleOpenModal = (lesson: Lesson) => {
        setOpenLesson({
            ...lesson,
            recipes: lesson.recipes.map((r) => {
                const availableQuantity = getAvailableQuantity(r.ingredient);
                const requiredAmount = parseFloat(r.amount);
                const hasEnough = parseFloat(availableQuantity) >= requiredAmount;
                return { ...r, done: hasEnough };
            }),
        });
    };

    const handleToggleRecipe = (index: number) => {
        setOpenLesson((prev) => {
            if (!prev) return null;
            const updated = [...prev.recipes];
            updated[index].done = !updated[index].done;
            return { ...prev, recipes: updated };
        });
    };

    const handleCompleteRecipe = () => {
        if (!openLesson) return;

        // Update pantry quantities
        const updatedIngredients = ingredientsData.map((pantryItem: Ingredient) => {
            const recipeItem = openLesson.recipes.find(
                r => r.ingredient.toLowerCase() === pantryItem.ingredient.toLowerCase()
            );
            
            if (recipeItem && recipeItem.done) {
                const currentQuantity = parseFloat(pantryItem.quantity || '0');
                const requiredAmount = parseFloat(recipeItem.amount);
                const newQuantity = Math.max(0, currentQuantity - requiredAmount);
                return { ...pantryItem, quantity: newQuantity.toString() };
            }
            return pantryItem;
        });

        // Update the ingredients data
        ingredientsData.splice(0, ingredientsData.length, ...updatedIngredients);
        
        // Navigate to lesson - pass both the full lesson object, the ID, and cuisineId
        // These will be used to find matching content in lessonContent.json
        navigate('/lesson', { 
            state: { 
                lesson: {
                    ...openLesson,
                    // Make sure we're passing the id for the JSON lookup
                    id: openLesson.id
                },
                // Pass the cuisine ID as well for more accurate lesson matching
                cuisineId: currentCuisine.id
            } 
        });
    };

    const handleLessonClick = (lesson: Lesson) => {
        if (!lesson.unlocked) {
            setSelectedLockedLesson(lesson);
            setShowLockedModal(true);
            return;
        }
        handleOpenModal(lesson);
    };

    const handleUnlockWithToken = () => {
        if (!selectedLockedLesson || tokens < 1) return;

        // Update the lesson to be unlocked
        const updatedLessons = lessons.map(lesson => 
            lesson.id === selectedLockedLesson.id 
                ? { ...lesson, unlocked: true }
                : lesson
        );
        setLessons(updatedLessons);

        // Deduct one token
        setTokens(prev => prev - 1);
        
        // Close the modal and return to journey view
        setShowLockedModal(false);
        setSelectedLockedLesson(null);
    };

    if (loading || !currentCuisine) {
        return (
            <Box 
                sx={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center',
                    bgcolor: 'white'
                }}
            >
                <CircularProgress size={60} color="primary" thickness={4} />
                <Typography variant="h6" mt={3} color="text.secondary" fontWeight="medium">
                    Loading your journey...
                </Typography>
            </Box>
        );
    }

    // Create color theme based on cuisine
    const getCuisineTheme = (cuisineId) => {
        const themes = {
            'asian-cuisine': {
                primary: '#FF4B2B',
                secondary: '#FF416C',
                light: '#FFF0ED'
            },
            'mediterranean-magic': {
                primary: '#4facfe',
                secondary: '#00f2fe',
                light: '#E8F7FF'
            },
            'baking-basics': {
                primary: '#F68084',
                secondary: '#A6C0FE',
                light: '#FFF0F0'
            },
            'vegan-delights': {
                primary: '#56ab2f',
                secondary: '#a8e063',
                light: '#F2FFEB'
            }
        };
        
        return themes[cuisineId] || themes['mediterranean-magic'];
    };

    const cuisineTheme = getCuisineTheme(currentCuisine.id);

    const getNextUnlocked = () => {
        const nextLesson = lessons.find(lesson => !lesson.unlocked);
        return nextLesson ? nextLesson.id : null;
    };

    const nextLessonId = getNextUnlocked();

    return (
        <Box 
            sx={{ 
                minHeight: '100vh', 
                bgcolor: alpha(cuisineTheme.light, 0.5), 
                pb: 6,
            }}
        >
            {/* Header with back button and progress */}
            <Box 
                sx={{ 
                    bgcolor: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{ 
                        py: 1.5, 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <IconButton 
                            onClick={() => navigate('/dashboard')}
                            sx={{ 
                                color: 'text.secondary',
                                mr: 1
                            }}
                        >
                            <ArrowBackIosNewIcon fontSize="small" />
                        </IconButton>
                        
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                {currentCuisine.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={percentComplete} 
                                    sx={{ 
                                        flexGrow: 1, 
                                        height: 6, 
                                        borderRadius: 3,
                                        bgcolor: alpha(cuisineTheme.primary, 0.1),
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: cuisineTheme.primary,
                                        }
                                    }} 
                                />
                                <Typography variant="caption" color="text.secondary">
                                    {completedLessons}/{lessons.length}
                                </Typography>
                            </Box>
                        </Box>
                        
                        <Chip 
                            icon={<SchoolIcon />} 
                            label={`${tokens} Tokens`}
                            color="primary"
                            size="small"
                            sx={{ ml: 1.5 }}
                        />
                    </Box>
                </Container>
            </Box>

            {/* Banner */}
            <Box 
                sx={{ 
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    bgcolor: alpha(cuisineTheme.primary, 0.9),
                    color: 'white',
                    boxShadow: `0 4px 20px ${alpha(cuisineTheme.primary, 0.4)}`
                }}
            >
                <Box 
                    sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${currentCuisine.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        mixBlendMode: 'overlay',
                        opacity: 0.3
                    }}
                />
                
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={7}>
                            <Typography variant="h4" component="h1" fontWeight="bold" 
                                sx={{ fontFamily: 'Playfair Display, serif' }}>
                                {currentCuisine.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1, mb: 2, opacity: 0.9 }}>
                                {currentCuisine.description}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                <Chip 
                                    icon={<EmojiEventsIcon />} 
                                    label={`${percentComplete}% Complete`} 
                                    sx={{ 
                                        bgcolor: 'rgba(255,255,255,0.2)', 
                                        color: 'white',
                                        fontWeight: 'medium' 
                                    }} 
                                />
                                <Chip 
                                    icon={<AccessTimeIcon />} 
                                    label={`${currentCuisine.totalLessons} Lessons`} 
                                    sx={{ 
                                        bgcolor: 'rgba(255,255,255,0.2)', 
                                        color: 'white',
                                        fontWeight: 'medium' 
                                    }} 
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={5} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Box sx={{ 
                                width: 180, 
                                height: 180, 
                                borderRadius: '50%', 
                                overflow: 'hidden',
                                border: '4px solid rgba(255,255,255,0.3)',
                                mx: 'auto'
                            }}>
                                <CardMedia
                                    component="img"
                                    image={currentCuisine.image}
                                    alt={currentCuisine.name}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Main content */}
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Your Learning Path
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Complete lessons in sequence to master {currentCuisine.name.toLowerCase()}. Unlock new techniques as you progress!
                    </Typography>
                </Box>

                <Grid container spacing={2.5} alignItems="stretch" justifyContent="center">
                    {lessons.map((lesson, index) => {
                        const isUnlocked = lesson.unlocked;
                        const isNextUp = !isUnlocked && lesson.id === nextLessonId;
                        
                        return (
                            <Grid item xs={12} sm={6} md={4} key={lesson.id} sx={{ display: 'flex' }}>
                                <Card 
                                    elevation={0} 
                                    sx={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 3,
                                        boxShadow: isNextUp 
                                            ? `0 8px 20px ${alpha(cuisineTheme.primary, 0.3)}`
                                            : '0 2px 12px rgba(0,0,0,0.05)',
                                        border: isNextUp
                                            ? `2px solid ${cuisineTheme.primary}`
                                            : `1px solid ${theme.palette.grey[200]}`,
                                        opacity: !isUnlocked && !isNextUp ? 0.75 : 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: (isUnlocked || isNextUp) ? 'translateY(-5px)' : 'none',
                                            boxShadow: (isUnlocked || isNextUp) 
                                                ? `0 12px 28px ${alpha(cuisineTheme.primary, 0.25)}`
                                                : '0 2px 12px rgba(0,0,0,0.05)'
                                        },
                                        backgroundColor: isNextUp 
                                            ? alpha(cuisineTheme.light, 0.6)
                                            : 'white'
                                    }}
                                >
                                    <CardActionArea 
                                        onClick={() => handleLessonClick(lesson)}
                                        disabled={!isUnlocked && !isNextUp}
                                        sx={{ 
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'stretch',
                                            justifyContent: 'flex-start'
                                        }}
                                    >
                                        <Box sx={{ position: 'relative' }}>
                                            <CardMedia
                                                component="img"
                                                height="160"
                                                image={lesson.image}
                                                alt={lesson.name}
                                                sx={{ 
                                                    filter: !isUnlocked ? 'grayscale(60%) brightness(0.9)' : 'none',
                                                    objectFit: 'cover' 
                                                }}
                                            />
                                            
                                            {/* Lesson number badge */}
                                            <Avatar
                                                sx={{
                                                    position: 'absolute',
                                                    top: 12,
                                                    left: 12,
                                                    width: 36,
                                                    height: 36,
                                                    bgcolor: isUnlocked 
                                                        ? cuisineTheme.primary 
                                                        : 'rgba(0,0,0,0.5)',
                                                    color: 'white',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.9rem',
                                                    border: '2px solid white',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                                }}
                                            >
                                                {lesson.id}
                                            </Avatar>
                                            
                                            {/* Status indicator */}
                                            {isUnlocked && (
                                                <Chip
                                                    icon={<CheckCircleIcon />}
                                                    label="Unlocked"
                                                    size="small"
                                                    color="success"
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 12,
                                                        right: 12,
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                                    }}
                                                />
                                            )}
                                            
                                            {isNextUp && (
                                                <Chip
                                                    icon={<FlagIcon />}
                                                    label="Next Up"
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 12,
                                                        right: 12,
                                                        bgcolor: cuisineTheme.primary,
                                                        color: 'white',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                                    }}
                                                />
                                            )}
                                            
                                            {!isUnlocked && !isNextUp && (
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        bgcolor: 'rgba(0,0,0,0.4)'
                                                    }}
                                                >
                                                    <LockIcon sx={{ color: 'white', fontSize: 40 }} />
                                                </Box>
                                            )}
                                        </Box>
                                        
                                        <CardContent sx={{ 
                                            p: 2.5, 
                                            flex: 1, 
                                            display: 'flex', 
                                            flexDirection: 'column',
                                            justifyContent: 'space-between' 
                                        }}>
                                            <Box>
                                                <Typography 
                                                    variant="h6" 
                                                    component="div" 
                                                    fontWeight="medium"
                                                    sx={{ 
                                                        fontSize: '1.1rem',
                                                        mb: 1,
                                                        minHeight: '2.5rem',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {lesson.name}
                                                </Typography>
                                            
                                                <Box sx={{ 
                                                    display: 'flex', 
                                                    mb: 1.5,
                                                    color: isUnlocked ? theme.palette.warning.main : theme.palette.grey[400]
                                                }}>
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Box
                                                            key={i}
                                                            component={i < lesson.difficulty ? StarIcon : StarBorderIcon}
                                                            sx={{ fontSize: 18, mr: 0.5 }}
                                                        />
                                                    ))}
                                                </Box>
                                            </Box>
                                            
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'space-between',
                                                mt: 'auto',
                                                pt: 1.5,
                                                borderTop: `1px solid ${alpha(theme.palette.grey[300], 0.5)}` 
                                            }}>
                                                <Chip
                                                    size="small"
                                                    label={`${lesson.recipes.length} ingredients`}
                                                    sx={{ 
                                                        height: 24,
                                                        backgroundColor: alpha(theme.palette.grey[500], 0.1),
                                                        color: 'text.secondary',
                                                        fontWeight: 'medium',
                                                        fontSize: '0.75rem'
                                                    }}
                                                />
                                                
                                                <Typography 
                                                    variant="caption" 
                                                    sx={{ 
                                                        fontWeight: 'medium',
                                                        color: isUnlocked ? 'text.primary' : 'text.secondary',
                                                        fontSize: '0.75rem',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    {isUnlocked ? 'Start Lesson' : isNextUp ? 'Unlock Next' : 'Locked'}
                                                    <ArrowBackIosNewIcon 
                                                        sx={{ 
                                                            ml: 0.5, 
                                                            fontSize: 12,
                                                            transform: 'rotate(180deg)'
                                                        }} 
                                                    />
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>

            {/* Lesson Modal */}
            <Modal 
                open={!!openLesson} 
                onClose={() => setOpenLesson(null)}
                closeAfterTransition
            >
                <Fade in={!!openLesson}>
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 360,
                            maxWidth: '90%',
                            p: 0,
                            borderRadius: 3,
                            outline: 'none',
                            overflow: 'hidden',
                            boxShadow: '0 16px 32px rgba(0,0,0,0.2)'
                        }}
                    >
                        {openLesson && (
                            <>
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        image={openLesson.image}
                                        alt={openLesson.name}
                                        sx={{ height: 140, objectFit: 'cover' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                            p: 2,
                                            pt: 4
                                        }}
                                    >
                                        <Typography variant="h5" fontWeight="bold" color="white">
                                            {openLesson.name}
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <Box sx={{ p: 3 }}>
                                    {/* Difficulty Stars */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="body2" mr={1} color="text.secondary">
                                            Difficulty:
                                        </Typography>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                sx={{
                                                    color: i < openLesson.difficulty ? theme.palette.warning.main : theme.palette.grey[300],
                                                    fontSize: 18,
                                                    mr: 0.5
                                                }}
                                            />
                                        ))}
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    <Typography variant="subtitle1" fontWeight="bold" mb={1.5}>
                                        Ingredients Needed:
                                    </Typography>
                                    <Stack spacing={1.5}>
                                        {openLesson.recipes.map((recipe, i) => {
                                            const availableQuantity = getAvailableQuantity(recipe.ingredient);
                                            const requiredAmount = parseFloat(recipe.amount);
                                            const hasEnough = parseFloat(availableQuantity) >= requiredAmount;
                                            
                                            return (
                                                <Paper
                                                    key={i}
                                                    variant="outlined"
                                                    sx={{ 
                                                        p: 1.5, 
                                                        borderRadius: 2,
                                                        borderColor: hasEnough ? theme.palette.success.light : theme.palette.error.light,
                                                        bgcolor: hasEnough 
                                                            ? alpha(theme.palette.success.main, 0.05)
                                                            : alpha(theme.palette.error.main, 0.05)
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={recipe.done}
                                                                onChange={() => handleToggleRecipe(i)}
                                                                sx={{
                                                                    color: hasEnough ? theme.palette.success.main : theme.palette.error.main,
                                                                    '&.Mui-checked': {
                                                                        color: hasEnough ? theme.palette.success.main : theme.palette.error.main,
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label={
                                                            <Box>
                                                                <Typography 
                                                                    fontWeight="medium"
                                                                    sx={{ 
                                                                        color: 'text.primary',
                                                                        fontSize: 14,
                                                                        mb: 0.5
                                                                    }}
                                                                >
                                                                    {recipe.name}
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <Typography 
                                                                        variant="caption" 
                                                                        sx={{ 
                                                                            color: hasEnough ? 'success.main' : 'error.main',
                                                                            fontWeight: 'medium'
                                                                        }}
                                                                    >
                                                                        {recipe.ingredient} {recipe.unit || ''}
                                                                    </Typography>
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {availableQuantity}/{recipe.amount}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        }
                                                        sx={{ alignItems: 'flex-start', ml: -0.5 }}
                                                    />
                                                </Paper>
                                            );
                                        })}
                                    </Stack>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        bgcolor: theme.palette.grey[50],
                                        p: 2,
                                        borderTop: `1px solid ${theme.palette.grey[200]}`
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        onClick={() => setOpenLesson(null)}
                                        sx={{
                                            borderRadius: 2,
                                            px: 3
                                        }}
                                    >
                                        Close
                                    </Button>

                                    <Button
                                        variant="contained"
                                        onClick={openLesson.recipes.every((r) => r.done) ? handleCompleteRecipe : undefined}
                                        disabled={!openLesson.recipes.every((r) => r.done)}
                                        sx={{
                                            borderRadius: 2,
                                            px: 3,
                                            boxShadow: openLesson.recipes.every((r) => r.done)
                                                ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
                                                : 'none',
                                            '&:hover': {
                                                boxShadow: openLesson.recipes.every((r) => r.done)
                                                    ? `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`
                                                    : 'none'
                                            }
                                        }}
                                    >
                                        Continue
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Paper>
                </Fade>
            </Modal>

            {/* Locked Lesson Modal */}
            <Modal 
                open={showLockedModal} 
                onClose={() => setShowLockedModal(false)}
                closeAfterTransition
            >
                <Fade in={showLockedModal}>
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 340,
                            maxWidth: '90%',
                            p: 3,
                            borderRadius: 3,
                            outline: 'none',
                            textAlign: 'center',
                            boxShadow: '0 16px 32px rgba(0,0,0,0.2)'
                        }}
                    >
                        <Avatar
                            sx={{ 
                                bgcolor: alpha(theme.palette.warning.main, 0.1),
                                color: theme.palette.warning.main,
                                width: 70,
                                height: 70,
                                margin: '0 auto',
                                mb: 2
                            }}
                        >
                            <LockIcon sx={{ fontSize: 36 }} />
                        </Avatar>
                        
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            Lesson Locked
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary" mb={2}>
                            Complete previous lessons to unlock this one naturally.
                        </Typography>
                        
                        <Box 
                            sx={{ 
                                bgcolor: alpha(theme.palette.primary.light, 0.08),
                                p: 2,
                                borderRadius: 2,
                                mb: 3
                            }}
                        >
                            <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
                                Or use 1 token to unlock immediately
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                You have {tokens} tokens remaining
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setShowLockedModal(false)}
                                sx={{
                                    borderRadius: 8,
                                    px: 3
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleUnlockWithToken}
                                disabled={tokens < 1}
                                sx={{
                                    borderRadius: 8,
                                    px: 3,
                                    boxShadow: tokens >= 1 ? `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}` : 'none'
                                }}
                            >
                                Unlock Now
                            </Button>
                        </Box>
                    </Paper>
                </Fade>
            </Modal>
        </Box>
    );
}