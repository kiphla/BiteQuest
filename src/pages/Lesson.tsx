//@ts-nocheck
import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    IconButton,
    MobileStepper,
    useTheme,
    CardMedia,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        title: 'Introduction to Fattoush',
        content: 'Fattoush is a vibrant Lebanese salad made with fresh vegetables, crispy pita, and a zesty dressing. Let’s learn how to make it step by step!',
        image: '/fattoush.jpg',
    },
    {
        title: 'Step 1: Prepare the Vegetables',
        content: 'Chop tomatoes, cucumbers, radishes, lettuce, and green onions into bite-sized pieces. Freshness is key!',
        image: '/chopped.jpg',
    },
    {
        title: 'Step 2: Toast the Pita',
        content: 'Cut pita bread into small pieces and toast or fry until golden and crispy. This adds the signature crunch to Fattoush.',
        image: '/toastpita.jpg',
    },
    {
        title: 'Step 3: Make the Dressing',
        content: 'Whisk together olive oil, lemon juice, sumac, garlic, salt, and pepper. Sumac gives Fattoush its tangy flavor.',
        image: '/dressing.jpg',
    },
    {
        title: 'Step 4: Toss & Serve',
        content: 'Combine veggies, pita, and dressing. Toss well and serve immediately for the best crunch. Enjoy your homemade Fattoush!',
        image: '/tossandserve.jpg',
    },
];

export default function Lesson() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            navigate('/complete', { state: { lesson: { name: 'Fattoush' } } });
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        } else {
            navigate(-1);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'I just completed the Fattoush lesson on BiteQuest!',
                text: 'Check out my progress and try this delicious Lebanese salad!',
                url: window.location.href,
            });
        } else {
            alert('Sharing is not supported on this device.');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                pb: 14,
            }}
        >
            <Container maxWidth="sm" sx={{ pt: 4, pb: 2 }}>
                {/* header with back button */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={handleBack}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            flex: 1,
                            textAlign: 'center',
                            fontWeight: 'medium',
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Step {activeStep + 1} of {steps.length}
                    </Typography>
                    <Box sx={{ width: 40 }} />
                </Box>

                {/* image for the step */}
                <CardMedia
                    component="img"
                    image={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 3,
                        mb: 3,
                    }}
                />

                {/* title + content */}
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                        textAlign: 'center',
                    }}
                >
                    {steps[activeStep].title}
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: 'center', mb: 3 }}
                >
                    {steps[activeStep].content}
                </Typography>
            </Container>

            {/* sticky footer */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: theme.palette.background.default,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    px: 2,
                    py: 1.5,
                }}
            >
                <MobileStepper
                    variant="dots"
                    steps={steps.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={<div />}
                    backButton={<div />}
                    sx={{
                        justifyContent: 'center',
                        display: 'flex',
                        bgcolor: 'transparent',
                        mb: 1,
                    }}
                />
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    fullWidth
                    sx={{ py: 1.5, borderRadius: 3 }}
                >
                    {activeStep === steps.length - 1 ? 'Finish Lesson' : 'Continue'}
                </Button>
            </Box>
        </Box>
    );
}
