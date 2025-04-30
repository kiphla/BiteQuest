import { Box } from '@mui/material';

export default function HeaderImage() {
    return (
        <Box width="100%" height="240px" overflow="hidden">
            <img
                src="https://placehold.co/600x400"
                alt="Healthy Bowl"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
        </Box>
    );
}
