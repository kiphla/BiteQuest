//@ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    IconButton,
    TextField,
    Card,
    CardContent,
    CircularProgress,
    useTheme,
    Paper,
    Divider,
    alpha,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Share() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [lessonInfo, setLessonInfo] = useState({
        lessonName: 'My Recipe',
        cuisineId: 'unknown',
        difficulty: 3,
        image: '/fattoush.jpg'
    });

    // Get lesson information from state
    useEffect(() => {
        if (location.state) {
            setLessonInfo({
                ...lessonInfo,
                ...location.state
            });
        }
    }, [location.state]);

    // Handle taking a photo or selecting from gallery
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenCamera = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    // Handle share button click
    const handleShare = () => {
        // In a real app, you would upload the image and comment here
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
        }, 1500);
    };

    // Handle success dialog close
    const handleSuccessClose = () => {
        setShowSuccess(false);
        // Navigate back to lesson path
        navigate(`/lessonpath/${lessonInfo.cuisineId}`);
    };

    // Format cuisineId for display
    const formatCuisineName = (id) => {
        if (!id || id === 'unknown') return 'Cooking';
        
        return id.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <Box sx={{ bgcolor: '#fff', minHeight: '100vh', pb: 5 }}>
            {/* Header */}
            <Box 
                sx={{ 
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    p: 2,
                    mb: 3,
                    position: 'relative',
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                            onClick={() => navigate(-1)}
                            sx={{ color: '#fff', mr: 2 }}
                        >
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flex: 1, fontWeight: 'medium' }}>
                            Share Your {lessonInfo.lessonName}
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="sm">
                {/* Photo Upload Area */}
                <Card 
                    elevation={0} 
                    sx={{ 
                        borderRadius: 4, 
                        border: imagePreview ? 'none' : `1px dashed ${theme.palette.grey[400]}`,
                        mb: 3,
                        overflow: 'hidden',
                        bgcolor: imagePreview ? 'transparent' : alpha(theme.palette.grey[100], 0.5),
                    }}
                >
                    {imagePreview ? (
                        <Box sx={{ position: 'relative' }}>
                            <Box
                                component="img"
                                src={imagePreview}
                                alt="Food preview"
                                sx={{ 
                                    width: '100%', 
                                    height: 300, 
                                    objectFit: 'cover',
                                    borderRadius: 4,
                                }}
                            />
                            <IconButton
                                onClick={() => setImagePreview(null)}
                                sx={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    bgcolor: 'rgba(0,0,0,0.5)',
                                    color: '#fff',
                                    '&:hover': {
                                        bgcolor: 'rgba(0,0,0,0.7)',
                                    }
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box 
                            sx={{ 
                                height: 200, 
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 3,
                                textAlign: 'center'
                            }}
                        >
                            <CameraAltIcon sx={{ fontSize: 48, color: theme.palette.grey[400], mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                Add a photo of your dish
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Show off your culinary masterpiece!
                            </Typography>
                        </Box>
                    )}
                </Card>

                {/* Camera/Gallery Buttons */}
                <Stack 
                    direction="row" 
                    spacing={2} 
                    sx={{ mb: 3 }}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<CameraAltIcon />}
                        onClick={handleOpenCamera}
                        sx={{ 
                            borderRadius: 2,
                            py: 1.2,
                            borderColor: theme.palette.grey[300]
                        }}
                    >
                        Take Photo
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<PhotoLibraryIcon />}
                        onClick={handleOpenCamera}
                        sx={{ 
                            borderRadius: 2,
                            py: 1.2,
                            borderColor: theme.palette.grey[300]
                        }}
                    >
                        From Gallery
                    </Button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        capture={navigator.mediaDevices ? "user" : undefined}
                    />
                </Stack>

                {/* Comment Field */}
                <Box sx={{ mb: 4 }}>
                    <Typography 
                        variant="subtitle1" 
                        fontWeight="medium" 
                        sx={{ mb: 1.5 }}
                    >
                        Add a Comment
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        placeholder={`Share your ${lessonInfo.lessonName} cooking experience...`}
                        value={comment}
                        onChange={handleCommentChange}
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                            }
                        }}
                    />
                </Box>

                {/* Recipe Info */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.grey[100], 0.7),
                        mb: 3,
                        border: `1px solid ${theme.palette.grey[200]}`
                    }}
                >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Sharing details:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Typography variant="body2" fontWeight="medium">
                            Recipe: <span style={{color: theme.palette.text.secondary}}>{lessonInfo.lessonName}</span>
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        <Typography variant="body2" fontWeight="medium">
                            Cuisine: <span style={{color: theme.palette.text.secondary}}>{formatCuisineName(lessonInfo.cuisineId)}</span>
                        </Typography>
                    </Box>
                </Paper>

                {/* Share Button */}
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<ShareIcon />}
                    onClick={handleShare}
                    disabled={isSubmitting || !imagePreview}
                    sx={{
                        borderRadius: 3,
                        py: 1.8,
                        backgroundColor: '#EC3C7E',
                        textTransform: 'none',
                        fontWeight: 'medium',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 12px rgba(236,60,126,0.25)',
                        '&:hover': {
                            backgroundColor: '#D2336A',
                        }
                    }}
                >
                    {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Share to Community'}
                </Button>
            </Container>

            {/* Success Dialog */}
            <Dialog
                open={showSuccess}
                onClose={handleSuccessClose}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
                    <CheckCircleIcon sx={{ fontSize: 48, color: theme.palette.success.main, mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                        Successfully Shared!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" align="center">
                        Your {lessonInfo.lessonName} has been shared with the community. Thanks for sharing your culinary creation!
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button 
                        onClick={handleSuccessClose}
                        variant="contained"
                        sx={{ 
                            borderRadius: 2,
                            px: 4,
                            py: 1
                        }}
                    >
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}