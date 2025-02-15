import {
    PlayArrowRounded,
    InfoOutlined,
    PauseRounded,
} from "@mui/icons-material";
import {Box, Typography, Button, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import {
    getMoviePreviewVideo,
    staticImageUrl,
    youtubeVideoUrl
} from "../services/library.ts";
import {useNavigate} from "react-router-dom";
import {Movie} from "../types";
import {fetchMoviePreviewVideos} from "../services/tmdb.ts";

function BackDropDisplay({item}: { item: Movie }) {
    const navigate = useNavigate();
    const [previewVidPlaying, setPreviewVidPlaying] = useState<boolean>(false);
    const [moviePreviewUrl, setMoviePreview] = useState<string | undefined>(undefined);
    const staticMovieBackDrop = `${staticImageUrl + item.backdrop_path}`

    useEffect(() => {
        if (!item?.id) return;

        const fetchMoviePreview = async () => {
            try {
                const previews = await fetchMoviePreviewVideos(item.id);
                const preview = getMoviePreviewVideo(previews)

                setMoviePreview(`${youtubeVideoUrl}${preview?.key}`);
            } catch (error) {
                console.error("Failed to fetch movie preview:", error);
            }
        };

        fetchMoviePreview();
    }, [previewVidPlaying]);

    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
            }}
        >
            {moviePreviewUrl && <Box
                sx={{
                    position: "absolute",
                    right: "1vw",
                    bottom: "20vh",
                    opacity: moviePreviewUrl ? 1 : 0,
                    transition: "all 1s ease",
                    zIndex: 1,
                    cursor: "pointer",
                    pointerEvents: "all",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                }}
            >
                <IconButton
                    onClick={() => {
                        setPreviewVidPlaying(!previewVidPlaying);
                    }}
                >
                    {previewVidPlaying ? <PauseRounded/> : <PlayArrowRounded/>}
                </IconButton>
            </Box>}

            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    background: previewVidPlaying ? `linear-gradient(90deg, #000000AA, #000000AA)` : `linear-gradient(90deg, #000000AA, #000000AA), url(${staticMovieBackDrop})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: 0,
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        filter: "brightness(0.5)",
                        opacity: previewVidPlaying ? 1 : 0,
                        transition: "all 2s ease",
                        backgroundColor: previewVidPlaying ? "#000000" : "transparent",
                        pointerEvents: "none",
                        overflow: "hidden",
                    }}
                >
                    <ReactPlayer
                        url={moviePreviewUrl ?? undefined}
                        controls={false}
                        width="100vw"
                        height="100vh"
                        playing={previewVidPlaying}
                        volume={0.1}
                        onEnded={() => {
                            setPreviewVidPlaying(false);
                        }}
                        pip={false}
                    />
                </Box>

                <Box
                    sx={{
                        ml: 10,
                        mb: "40vh",
                        zIndex: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            mb: 0,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "24px",
                                fontWeight: "900",
                                letterSpacing: "0.1em",
                                color: theme => theme.palette.primary.main,
                                textTransform: "uppercase",
                            }}
                        >
                            Movie
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: "3rem",
                            fontWeight: "bold",
                        }}
                    >
                        {item.title}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "medium",
                            fontWeight: "light",
                            maxWidth: "35vw",
                            display: "-webkit-box",
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            userSelect: "none",
                            cursor: "zoom-in",
                        }}
                    >
                        {item.overview}
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            mt: 4,
                            gap: 2,
                            ml: 0,
                            height: "36.5px",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme => theme.palette.text.primary,
                                color: theme => theme.palette.background.paper,
                                fontWeight: "bold",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                gap: "10px",
                                "&:hover": {
                                    backgroundColor: "primary.main",
                                },
                                transition: "all 0.2s ease-in-out",
                            }}
                            onClick={() => {
                                if (!item) return;
                                navigate(
                                    `/watch/${item.id.toString()}`
                                );
                            }}
                        >
                            <PlayArrowRounded fontSize="medium"/> Play
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: theme => theme.palette.background.paper,
                                color: theme => theme.palette.text.secondary,
                                fontWeight: "bold",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                "&:hover": {
                                    backgroundColor: "#333333",
                                    "& > *:nth-of-type": {
                                        width: "91px",
                                        ml: "10px",
                                    },
                                },
                                transition: "all 0.2s ease-in-out",
                            }}
                            onClick={() => {
                                if (!item) return;
                                setPreviewVidPlaying(false);
                                navigate(
                                    `/watch/${item.id.toString()}`
                                );
                            }}
                        >
                            <InfoOutlined fontSize="medium"/> <Typography sx={{
                            width: "0px",
                            userSelect: "none",
                            display: "inline",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            transition: "all 0.2s ease-in-out",
                            fontSize: "0.875rem",
                            lineHeight: "1.75",
                        }}>More Info</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "40vh",
                    position: "absolute",
                    bottom: "0",
                    backgroundImage: "linear-gradient(180deg, #00000000, #000000FF)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "transparent",
                    zIndex: 0,
                }}
            />
        </Box>
    );
}

export default BackDropDisplay;
