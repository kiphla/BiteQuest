import React, { useState } from "react";
import { Box, Button, Typography, Container, TextField, Rating, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Review: React.FC = () => {
    const [rating, setRating] = useState<number | null>(0);
    const [review, setReview] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you could send the review/rating to a backend or state
        navigate("/dashboard");
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#fff", pb: 8 }}>
            <Container maxWidth="xs" sx={{ pt: 6 }}>
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                    Review Your Dish
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary" mb={3}>
                    How was your food? Share your thoughts!
                </Typography>
                <CardMedia
                    component="img"
                    image="fattoush.jpg"
                    alt="Dish photo"
                    sx={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 3, mb: 3 }}
                />
                <Box component="form" onSubmit={handleSubmit}>
                    <Typography variant="subtitle2" mb={1}>
                        Your Rating
                    </Typography>
                    <Rating
                        name="dish-rating"
                        value={rating}
                        onChange={(_, value) => setRating(value)}
                        size="large"
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        label="Write a review (optional)"
                        multiline
                        minRows={3}
                        fullWidth
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        variant="outlined"
                        sx={{ mb: 3, borderRadius: 3 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        disabled={!rating}
                        sx={{ py: 1.5, borderRadius: 3 }}
                    >
                        Submit Review
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Review;