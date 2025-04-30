//@ts-nocheck
import React from 'react';
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
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

const lessons = [
    {
        id: 1,
        name: 'Spiced Potatoes',
        unlocked: true,
        difficulty: 2,
        recipes: [
            { name: 'Boiled Potatoes', ingredient: 'Potatoes', amount: '500g' },
            { name: 'Spice Mix', ingredient: 'Spice Mix', amount: '2 tsp' },
            { name: 'Pan Fry', ingredient: 'Oil', amount: '2 tbsp' },
        ],
        image: '/spicedpotato.jpg',
    },
    {
        id: 2,
        name: 'Tabbouleh',
        unlocked: true,
        difficulty: 3,
        recipes: [
            { name: 'Parsley Prep', ingredient: 'Parsley', amount: '1 bunch' },
            { name: 'Lemon Dressing', ingredient: 'Lemon', amount: '1 pc' },
            { name: 'Grain Cook', ingredient: 'Bulgur', amount: '100g' },
        ],
        image: '/tabbouleh.jpg',
    },
    {
        id: 3,
        name: 'Fattoush',
        unlocked: true,
        difficulty: 3,
        recipes: [
            { name: 'Toast Bread', ingredient: 'Pita Bread', amount: '2 pcs' },
            { name: 'Chop Veggies', ingredient: 'Mixed Veggies', amount: '200g' },
            { name: 'Mix Dressing', ingredient: 'Dressing', amount: '50ml' },
        ],
        image: '/fattoush.jpg',
    },
    {
        id: 4,
        name: 'Mujadara',
        unlocked: false,
        difficulty: 4,
        recipes: [
            { name: 'Cook Lentils', ingredient: 'Lentils', amount: '200g' },
            { name: 'Fry Onions', ingredient: 'Onions', amount: '2 pcs' },
            { name: 'Steam Rice', ingredient: 'Rice', amount: '150g' },
        ],
        image: 'https://placehold.co/100x100?text=Mujadara',
    },
    {
        id: 5,
        name: 'Kofta',
        unlocked: false,
        difficulty: 4,
        recipes: [
            { name: 'Mix Meat', ingredient: 'Ground Meat', amount: '300g' },
            { name: 'Form Skewers', ingredient: 'Skewers', amount: '4 pcs' },
            { name: 'Grill', ingredient: 'Oil', amount: '1 tbsp' },
        ],
        image: 'https://placehold.co/100x100?text=Kofta',
    },
    {
        id: 6,
        name: 'Shish Tawook',
        unlocked: false,
        difficulty: 3,
        recipes: [
            { name: 'Marinate Chicken', ingredient: 'Chicken', amount: '400g' },
            { name: 'Skewer Prep', ingredient: 'Skewers', amount: '4 pcs' },
            { name: 'Grill', ingredient: 'Oil', amount: '1 tbsp' },
        ],
        image: 'https://placehold.co/100x100?text=Shish+Tawook',
    },
];

export default function LessonPath() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [openLesson, setOpenLesson] = React.useState(null);

    const handleOpenModal = (lesson) => {
        setOpenLesson({
            ...lesson,
            recipes: lesson.recipes.map((r) => ({ ...r, done: false })),
        });
    };

    const handleToggleRecipe = (index) => {
        setOpenLesson((prev) => {
            const updated = [...prev.recipes];
            updated[index].done = !updated[index].done;
            return { ...prev, recipes: updated };
        });
    };

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
                        Mediterranean Journey
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
                                        disabled={!lesson.unlocked}
                                        onClick={() => handleOpenModal(lesson)}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            position: 'relative',
                                            boxShadow: 3,
                                            bgcolor: 'background.paper',
                                            transition: 'box-shadow 0.3s',
                                            '&:hover': {
                                                boxShadow: lesson.unlocked ? 6 : 3,
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
                                        sx={{ fontSize: 13 }}
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
                                {openLesson.recipes.map((recipe, i) => (
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
                                                <Typography component="span" fontWeight="bold">{recipe.name}</Typography>
                                                <Typography component="span" sx={{ ml: 1, color: 'text.secondary', fontSize: 13 }}>
                                                    {recipe.ingredient && recipe.amount ? `(${recipe.ingredient}${recipe.amount ? `, ${recipe.amount}` : ''})` : ''}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                ))}
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
                                                ? () => {
                                                    navigate('/lesson', { state: { lesson: openLesson } });

                                                }
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

        </Box>
    );
}
