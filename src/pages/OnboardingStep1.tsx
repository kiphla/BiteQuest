import {
    Box,
    Button,
    Typography,
    Container,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    IconButton,
    MobileStepper,
    useTheme
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../contexts/OnboardingContext';

const cuisines = [
    { name: 'Korean', img: '/korean.jpg' },
    { name: 'Indian', img: '/indian.jpg' },
    { name: 'Mexican', img: '/mexican.jpg' },
    { name: 'Japanese', img: '/japanese.jpg' },
    { name: 'Italian', img: '/italian.jpg' },
    { name: 'Chinese', img: '/chinese.jpg' },
    { name: 'Thai', img: '/thai.jpg' },
    { name: 'French', img: '/french.jpg' },
    { name: 'Spanish', img: '/spanish.jpg' },
];

export default function OnboardingStep1() {
    const theme = useTheme();
    const { cuisines: selected, setCuisines: setSelected } = useOnboarding();
    const navigate = useNavigate();

    const toggle = (cuisine: string) =>
        setSelected(selected.includes(cuisine)
            ? selected.filter(c => c !== cuisine)
            : [...selected, cuisine]
        );

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                pb: 14, // reserve space for footer
            }}
        >
            <Container maxWidth="sm" sx={{ pt: 4, pb: 2 }}>
                {/* header with back button */}
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
                        Step 1 of 4
                    </Typography>
                    {/* spacer */}
                    <Box sx={{ width: 40 }} />
                </Box>

                {/* title + subtitle */}
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
                    What are you hungry to explore?
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', mb: 3 }}
                >
                    Tap one or more cuisines below to continue
                </Typography>

                {/* 3×3 cuisine grid */}
                <Grid container mt={6} spacing={{ xs: 4, sm: 2 }} justifyContent={"center"}>
                    {cuisines.map(({ name, img }) => {
                        const isActive = selected.includes(name);
                        return (
                            //@ts-ignore
                            <Grid item xs={4} key={name}>
                                <Card
                                    elevation={isActive ? 8 : 2}
                                    sx={{
                                        borderRadius: 3,
                                        border: isActive
                                            ? `2px solid ${theme.palette.primary.main}`
                                            : "2px solid transparent",
                                    }}
                                >
                                    <CardActionArea onClick={() => toggle(name)}>
                                        <CardMedia
                                            component="img"
                                            // force 1:1 aspect ratio, cover image, cut off overflow
                                            sx={{
                                                aspectRatio: '1 / 1',
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: { xs: 80, sm: 120 },
                                                // ensure no stretching
                                                display: 'block',
                                            }}
                                            image={img}
                                            alt={name}
                                        />
                                        <CardContent
                                            sx={{
                                                textAlign: "center",
                                                py: 1,
                                                // light background when active
                                                bgcolor: isActive
                                                    ? theme.palette.primary.light + "20"
                                                    : "transparent",
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: isActive ? "bold" : "normal",
                                                    color: isActive
                                                        ? theme.palette.primary.main
                                                        : theme.palette.text.primary,
                                                    // slightly smaller text on xs
                                                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                                }}
                                            >
                                                {name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
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
                    steps={4}
                    position="static"
                    activeStep={0}
                    sx={{
                        justifyContent: 'center',
                        display: 'flex',
                        bgcolor: 'transparent',
                        mb: 1,
                    }}
                    backButton={undefined}
                    nextButton={undefined}
                />

                <Button
                    variant="contained"
                    size="large"
                    disabled={selected.length === 0}
                    onClick={() =>
                        navigate('/onboarding/2', { state: { cuisines: selected } })
                    }
                    fullWidth
                    sx={{ py: 1.5, borderRadius: 3 }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
}