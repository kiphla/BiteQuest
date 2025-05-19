import { Box, Typography, Divider, Card, CardMedia, CardContent, Stack } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

const cooked = [
    {
        img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&w=80&h=80&fit=crop",
        title: "Spaghetti Marinara",
        desc: "Bob liked this recipe."
    },
    {
        img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=80&h=80&fit=crop",
        title: "Fattoush Salad",
        desc: "Bob liked this recipe."
    },
    {
        img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=80&h=80&fit=crop",
        title: "Chicken Katsu Curry",
        desc: "Bob disliked this recipe."
    }
];

export default function MyProfile() {
    const navigate = useNavigate();
    return (
        <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', py: 3, px: 1 }}>
            <Box sx={{ maxWidth: 400, mx: 'auto', bgcolor: '#fff', borderRadius: 4, p: { xs: 2, sm: 4 }, boxShadow: 1 }}>
                {/* Back button */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={() => navigate("/dashboard")}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Box sx={{ flex: 1 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Box
                        sx={{
                            width: 96,
                            height: 96,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            mb: 2,
                            boxShadow: 2,
                            bgcolor: '#eee',
                        }}
                    >
                        <img
                            src="/turtle.jpg"
                            alt="Caesar Zeppelli avatar"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                    <Typography variant="h5" fontWeight={500} gutterBottom>
                        Bob Jones
                    </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" color="text.secondary" fontWeight={500} mb={1}>
                        About me: Im Blue
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                        <b>Favourite food:</b> <span style={{ fontStyle: 'italic' }}>Spaghetti al nero di seppia</span>
                    </Typography>

                </Box>
                <Divider sx={{ my: 3 }} />
                <Typography variant="subtitle1" color="text.secondary" fontWeight={500} mb={2}>
                    Previously cooked:
                </Typography>
                <Stack spacing={2}>
                    {cooked.map((item, i) => (
                        <Card key={i} sx={{ display: 'flex', alignItems: 'center', bgcolor: '#f3f3f3', boxShadow: 0, borderRadius: 3 }}>
                            <CardMedia
                                component="img"
                                image={item.img}
                                alt={item.title}
                                sx={{ width: 56, height: 56, borderRadius: 2, m: 1 }}
                            />
                            <CardContent sx={{ p: 1, pl: 0 }}>
                                <Typography variant="subtitle2" fontWeight={600}>{item.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}