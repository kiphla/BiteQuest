import { Box, Button, Typography, Stack, Container, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: '100vh',
                bgcolor: theme.palette.grey[50],
                display: 'flex',
                flexDirection: 'column',
            }}
        >

            <Box
                sx={{
                    position: 'relative',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Background Image */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(https://images.unsplash.com/photo-1616169776580-c86189ee67b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 0,
                    }}
                />

                {/* Gradient overlay for better transition */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))',
                        zIndex: 1,
                    }}
                />

                {/* Wave decoration for transition */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: '80px',
                        zIndex: 2,
                        overflow: 'hidden',
                    }}
                >
                    <svg
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                        style={{ height: '100%', width: '100%' }}
                    >
                        <path
                            d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                            style={{ stroke: 'none', fill: theme.palette.common.white }}
                        />
                    </svg>
                </Box>
            </Box>

            {/* Bottom panel with rounded top */}
            <Container
                maxWidth="sm"
                sx={{
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    mt: -4,
                    pt: 6,
                    pb: 6,
                    px: 4,
                    position: 'relative',
                    zIndex: 3,
                    backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1) 100%)',
                }}
            >
                <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    sx={{ letterSpacing: 1, fontFamily: '"Open Sans", sans-serif' }}
                >
                    Welcome to
                </Typography>
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 700,
                        mb: 1,
                    }}
                >
                    BiteQuest
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{ color: theme.palette.text.secondary, mb: 3 }}
                >
                    Discover flavors from around the world
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/login')}
                        sx={{
                            flex: 1,
                            py: 1.5,
                            textTransform: 'none',
                            borderRadius: 3,
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/onboarding/1')}
                        sx={{
                            flex: 1,
                            py: 1.5,
                            textTransform: 'none',
                            borderRadius: 3,
                        }}
                    >
                        Get Started
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}