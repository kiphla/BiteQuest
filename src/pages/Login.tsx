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
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSocial = (provider: 'apple' | 'google') => {
        // TODO: implement social login
        console.log(`Social login with ${provider}`);
        navigate('/dashboard');
    };

    const handleLogin = () => {
        // TODO: implement login logic
        console.log({ email, password });
        navigate('/dashboard');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                pb: 8,
            }}
        >
            <Container maxWidth="xs" sx={{ pt: 4 }}>
                {/* Header with back button */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{
                            flex: 1,
                            textAlign: 'center',
                            fontWeight: 'medium',
                            color: theme.palette.text.secondary
                        }}
                    >
                        Welcome Back
                    </Typography>
                    <Box sx={{ width: 40 }} />
                </Box>

                {/* Title */}
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
                    Log In to BiteQuest
                </Typography>

                {/* Social auth buttons */}
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

                {/* Divider */}
                <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
                    <Divider sx={{ flex: 1 }} />
                    <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
                        or
                    </Typography>
                    <Divider sx={{ flex: 1 }} />
                </Box>

                {/* Login form */}
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

                    {/* Forgot password link */}
                    <Link
                        component="button"
                        variant="body2"
                        sx={{ alignSelf: 'flex-end' }}
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot Password?
                    </Link>

                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={!email || !password}
                        onClick={handleLogin}
                        sx={{ py: 1.5, borderRadius: 3, mt: 2 }}
                    >
                        Log In
                    </Button>
                </Stack>

                {/* Sign up link */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/onboarding/1')}
                        >
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}