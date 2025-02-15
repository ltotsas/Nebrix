import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import HomeScreen from "./components/HomeScreen.tsx";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import MediaViewer from "./components/MediaViewer.tsx";
import {AllMediaProvider} from "./providers/AllMediaProvider.tsx";
import theme from "./theme/theme.ts";

const queryClient = new QueryClient()

function App() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <QueryClientProvider client={queryClient}>
                    <AllMediaProvider>
                        <Box
                            sx={{
                                width: "100%",
                                height: "auto",
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<HomeScreen/>}/>
                                <Route path="/watch/:mediaID" element={<MediaViewer/>}/>
                            </Routes>
                        </Box>
                    </AllMediaProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </div>
    )
}

export default App;
