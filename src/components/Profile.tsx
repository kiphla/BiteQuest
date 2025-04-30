import { Box, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export function Profile() {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', px: 2, mt: -3, pb: 2 }}>
            <IconButton
                onClick={() => navigate('/myprofile')}
                sx={{
                    bgcolor: '#fff',
                    boxShadow: 2,
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    p: 0,
                }}
                aria-label="User profile"
            >
                <img
                    src="/turtle.jpg"
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
            </IconButton>
        </Box>
    );
}
