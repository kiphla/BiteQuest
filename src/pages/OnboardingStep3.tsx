import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    IconButton,
    TextField,
    Divider,
    Link,
    Stack,
    useTheme,
    MobileStepper,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSocial = (provider: 'apple' | 'google') => {
        // TODO: trigger OAuth flow
        console.log(`Social sign up with ${provider}`);
        navigate('/dashboard');
    };

    const handleRegister = () => {
        // TODO: submit email/password registration
        console.log({ email, password });
        navigate('/dashboard');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                pb: 14, // Add padding for the fixed bottom bar
            }}
        >
            <Container maxWidth="xs" sx={{ pt: 4 }}>
                {/* back button + step indicator */}
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
                            color: theme.palette.text.secondary
                        }}
                    >
                        Step 3 of 3
                    </Typography>
                    <Box sx={{ width: 40 }} />
                </Box>

                {/* title */}
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                        textAlign: 'center',
                        mb: 3
                    }}
                >
                    Create Account
                </Typography>

                {/* social auth */}
                <Stack spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<AppleIcon />}
                        fullWidth
                        onClick={() => handleSocial('apple')}
                        sx={{
                            textTransform: 'none',
                            py: 1.5,
                            borderRadius: 3
                        }}
                    >
                        Continue with Apple
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        fullWidth
                        onClick={() => handleSocial('google')}
                        sx={{
                            textTransform: 'none',
                            py: 1.5,
                            borderRadius: 3
                        }}
                    >
                        Continue with Google
                    </Button>
                </Stack>

                {/* divider */}
                <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
                    <Divider sx={{ flex: 1 }} />
                    <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
                        or
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                </Box>

                {/* email/password form */}
                <Stack spacing={2}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3
                            }
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3
                            }
                        }}
                    />
                </Stack>

                {/* login link */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/login')}
                        >
                            Log in
                        </Link>
                    </Typography>
                </Box>
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
                    steps={3}
                    position="static"
                    activeStep={2}
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
                    disabled={!email || !password}
                    onClick={handleRegister}
                    fullWidth
                    sx={{ py: 1.5, borderRadius: 3 }}
                >
                    Create Account
                </Button>
            </Box>
        </Box>
    );
}
