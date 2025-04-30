//@ts-nocheck
import React from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    IconButton,
    CardMedia,
    useTheme,
    Stack,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShareIcon from '@mui/icons-material/Share';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Complete() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const { width, height } = useWindowSize();

    const lessonName = location.state?.lesson?.name || 'Fattoush';



    return (
        <Box
            sx={{
                bgcolor: theme.palette.background.default,
                position: 'relative',
            }}
        >
            <Container maxWidth="sm" sx={{ pt: 4, pb: 2 }}>
                {/* back button + title */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={() => navigate(-1)}>
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
                        {lessonName}
                    </Typography>
                    <Box sx={{ width: 40 }} />
                </Box>


                {/* lesson image */}
                <CardMedia
                    component="img"
                    image={`fattoush.jpg`}
                    alt={`${lessonName} Complete`}
                    sx={{
                        width: '100%',
                        height: 180,
                        objectFit: 'cover',
                        borderRadius: 3,
                        mb: 3,
                        boxShadow: 3,
                    }}
                />

                {/* headings */}
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                        textAlign: 'center',
                        mb: 1,
                    }}
                >
                    You did it!
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, textAlign: 'center', mb: 1 }}
                >
                    {lessonName} Recipe Complete
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textAlign: 'center', mb: 3 }}
                >
                    Share your achievement with friends or continue your Mediterranean journey!
                </Typography>

                {/* pink Share button in body */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <Button
                        variant="contained"
                        startIcon={<ShareIcon />}
                        onClick={() => navigate('/share')}
                        sx={{
                            bgcolor: '#EC3C7E',
                            '&:hover': { bgcolor: '#D2336A' },
                            borderRadius: 3,
                            py: 1.5,
                            width: 'auto',
                        }}
                    >
                        Share
                    </Button>
                </Box>
            </Container>

            {/* sticky Continue button like Lesson */}
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
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/lessonpath')}
                    fullWidth
                    sx={{ py: 1.5, borderRadius: 3 }}
                >
                    Continue
                </Button>
            </Box>

            {/* confetti */}
            <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />
        </Box>
    );
}
