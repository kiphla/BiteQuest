import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: `'Open Sans', sans-serif`,
        h1: {
            fontFamily: `'Playfair Display', serif`,
        },
        h4: {
            fontFamily: `'Playfair Display', serif`,
        },
    },
    palette: {
        primary: {
            main: '#d6004c', // deep pinkish red
        },
    },
});

export default theme;
