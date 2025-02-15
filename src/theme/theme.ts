import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#ff0125",
            dark: "#9d222c",
            light: "#ea5e6e",
        },
        secondary: {
            main: "#ed3a64",
        },
        background: {
            default: "#000000",
            paper: "#1A1A1A",
        },
        text: {
            primary: "#F4F8FF",
            secondary: "#F4F8FF",
        },
        success: {
            main: "#22C55E",
        },
        warning: {
            main: "#FACC15",
        },
        error: {
            main: "#EF4444",
        },
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 400,
            md: 1200,
            lg: 1500,
            xl: 2000,
        },
    },

    typography: {
        fontFamily: '"Roboto", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: "3rem",
            "@media (max-width:400px)": {
                fontSize: "2rem",
            },
        },
        h2: {
            fontWeight: 600,
            fontSize: "2.5rem",
        },
        h4: {
            fontWeight: 700,
            fontSize: "2rem",
            "@media (max-width:400px)": {
                fontSize: "1.5rem",
            },
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: '"Roboto", sans-serif',
                    borderRadius: "7px",
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    height: "100vh",
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;