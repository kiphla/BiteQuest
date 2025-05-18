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
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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

    // Get the cuisine data based on the cuisineId parameter
    useEffect(() => {
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
    }, [cuisineId]);

    const getAvailableQuantity = (ingredientName: string): string => {
        const pantryIngredient = ingredientsData.find(
            (item: Ingredient) => item.ingredient.toLowerCase() === ingredientName.toLowerCase()
        );
        return pantryIngredient?.quantity || '0';
    };

    // const formatQuantity = (amount: string): string => {
    //     // Convert decimal to fraction if needed
    //     const num = parseFloat(amount);
    //     if (num === 0.5) return '1/2';
    //     if (num === 0.25) return '1/4';
    //     if (num === 0.75) return '3/4';
    //     if (num === 0.33) return '1/3';
    //     if (num === 0.67) return '2/3';
    //     return amount;
    // };

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
        
        // Navigate to lesson
        navigate('/lesson', { state: { lesson: openLesson } });
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

    if (!currentCuisine) {
        return <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Loading...</Typography>
        </Box>;
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'white', py: 6 }}>
            <Container maxWidth="xs">
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton onClick={() => navigate('/dashboard')}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        sx={{
                            flex: 1,
                            textAlign: 'center',
                            fontFamily: 'Playfair Display, serif',
                            color: theme.palette.primary.main,
                        }}
                    >
                        {currentCuisine.name}
                    </Typography>
                    <Box sx={{ width: 40 }} />
                </Box>

                {/* Curved Path */}
                <Box sx={{ position: 'relative', height: 1900 }}>
                    <svg
                        viewBox="0 0 300 1900"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                        }}
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M70 50 C 70 150, 230 150, 230 250 C 230 350, 70 350, 70 450 C 70 550, 230 550, 230 650 C 230 750, 70 750, 70 850 C 70 950, 230 950, 230 1050"
                            stroke="#ddd"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="6 6"
                        />
                    </svg>

                    {/* Lessons */}
                    <Box sx={{ position: 'relative', zIndex: 1 }}>
                        {lessons.map((lesson, index) => {
                            const isLeft = index % 2 === 0;
                            const offset = isLeft ? '20%' : '60%';

                            return (
                                <Box
                                    key={lesson.id}
                                    sx={{
                                        position: 'absolute',
                                        top: `${index * 200 + 30}px`,
                                        left: offset,
                                        transform: 'translateX(-50%)',
                                        textAlign: 'center',
                                        width: 120,
                                    }}
                                >
                                    <ButtonBase
                                        onClick={() => handleLessonClick(lesson)}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            position: 'relative',
                                            boxShadow: 3,
                                            bgcolor: 'background.paper',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                boxShadow: lesson.unlocked ? 6 : 3,
                                                transform: lesson.unlocked ? 'scale(1.05)' : 'none',
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={lesson.image}
                                            alt={lesson.name}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                filter: lesson.unlocked ? 'none' : 'grayscale(100%)',
                                                transition: 'filter 0.3s',
                                            }}
                                        />
                                        {!lesson.unlocked && (
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    bgcolor: 'rgba(255,255,255,0.7)',
                                                    transition: 'background-color 0.3s',
                                                }}
                                            >
                                                <LockIcon fontSize="small" sx={{ mb: 0.5 }} />
                                            </Box>
                                        )}
                                    </ButtonBase>

                                    <Typography
                                        variant="subtitle2"
                                        fontWeight="bold"
                                        mt={1}
                                        sx={{ 
                                            fontSize: 13,
                                            color: lesson.unlocked ? 'text.primary' : 'text.secondary',
                                            transition: 'color 0.3s',
                                        }}
                                    >
                                        {lesson.name}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Container>

            {/* Modal */}
            <Modal open={!!openLesson} onClose={() => setOpenLesson(null)}>
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
                    }}
                >
                    {openLesson && (
                        <>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                {openLesson.name}
                            </Typography>

                            {/* Difficulty Stars */}
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Typography variant="body2" mr={1}>
                                    Difficulty:
                                </Typography>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: '50%',
                                            mx: 0.3,
                                            bgcolor: i < openLesson.difficulty ? 'primary.main' : 'grey.300',
                                        }}
                                    />
                                ))}
                            </Box>

                            <Typography variant="subtitle2" mb={1}>
                                Recipes Needed:
                            </Typography>
                            <Stack spacing={1}>
                                {openLesson.recipes.map((recipe, i) => {
                                    const availableQuantity = getAvailableQuantity(recipe.ingredient);
                                    const requiredAmount = parseFloat(recipe.amount);
                                    const hasEnough = parseFloat(availableQuantity) >= requiredAmount;
                                    
                                    return (
                                        <FormControlLabel
                                            key={i}
                                            control={
                                                <Checkbox
                                                    checked={recipe.done}
                                                    onChange={() => handleToggleRecipe(i)}
                                                />
                                            }
                                            label={
                                                <Box>
                                                    <Typography 
                                                        component="span" 
                                                        sx={{ 
                                                            color: hasEnough ? 'text.primary' : 'error.main',
                                                            fontSize: 13 
                                                        }}
                                                    >
                                                        {recipe.ingredient} ({availableQuantity}/{recipe.amount} {recipe.unit || ''})
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    );
                                })}
                            </Stack>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mt: 3,
                                }}
                            >
                                <IconButton onClick={() => setOpenLesson(null)}>
                                    <Typography variant="button" color="text.secondary">
                                        Close
                                    </Typography>
                                </IconButton>

                                <Box>
                                    <Box
                                        sx={{
                                            display: 'inline-block',
                                            mr: 1,
                                        }}
                                    >
                                        <Box
                                            component="span"
                                            sx={{
                                                bgcolor: openLesson.recipes.every((r) => r.done)
                                                    ? theme.palette.primary.main
                                                    : theme.palette.action.disabled,
                                                px: 3,
                                                py: 1,
                                                borderRadius: 2,
                                                color: 'white',
                                                fontWeight: 'bold',
                                                cursor: openLesson.recipes.every((r) => r.done) ? 'pointer' : 'not-allowed',
                                                transition: 'background 0.2s',
                                                '&:hover': {
                                                    bgcolor: openLesson.recipes.every((r) => r.done)
                                                        ? theme.palette.primary.dark
                                                        : theme.palette.action.disabled,
                                                },
                                            }}
                                            onClick={openLesson.recipes.every((r) => r.done)
                                                ? handleCompleteRecipe
                                                : undefined}
                                        >
                                            Continue
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}
                </Paper>
            </Modal>

            {/* Locked Lesson Modal */}
            <Modal open={showLockedModal} onClose={() => setShowLockedModal(false)}>
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
                    }}
                >
                    <LockIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        Lesson Locked
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={2}>
                        Please complete the previous lesson to unlock this one.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Or spend 1 token to unlock immediately
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setShowLockedModal(false)}
                            sx={{
                                color: theme.palette.text.secondary,
                                borderColor: theme.palette.text.secondary,
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleUnlockWithToken}
                            disabled={tokens < 1}
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: theme.palette.action.disabled,
                                    color: theme.palette.text.disabled,
                                },
                            }}
                        >
                            Unlock (1 token)
                        </Button>
                    </Box>
                    <Typography variant="caption" color="text.secondary" mt={2} display="block">
                        Tokens remaining: {tokens}
                    </Typography>
                </Paper>
            </Modal>
        </Box>
    );
}
