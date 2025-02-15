import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Typography,
} from "@mui/material";
import {
    useParams, useNavigate
} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    CloseRounded,
    PlayArrowRounded,
} from "@mui/icons-material";
import {
    getContentDuration,
    staticImageUrl,
    youtubeVideoUrl
} from "../services/library.ts";
import ReactPlayer from "react-player";
import {useMovieDetails, useMoviePreviewVideo} from "../hooks";


function MediaViewer() {
    const navigate = useNavigate();
    const {mediaID} = useParams();
    const {data: movieTrailer, isFetching: isFetchingMovieTrailer} = useMoviePreviewVideo(Number(mediaID))
    const {data: movieDetails, isFetching: isFetchingMovieDetails} = useMovieDetails(mediaID!)

    const [previewVidURL, setPreviewVidURL] = useState<string | null>(null);
    const [previewVidPlaying, setPreviewVidPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (!movieDetails) return;

        const movieTrailerURL = isFetchingMovieTrailer ? `${staticImageUrl + movieDetails.backdrop_path}`
            : `${youtubeVideoUrl}${movieTrailer?.key}?rel=0&amp;controls=0`;
        setPreviewVidURL(movieTrailerURL);
        const timeout = setTimeout(() => {
            setPreviewVidPlaying(true);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [isFetchingMovieTrailer, movieDetails]);

    if (isFetchingMovieDetails)
        return (
            <Backdrop open={true}>
                <CircularProgress/>
            </Backdrop>
        );
    return (
        <Backdrop
            open={!!mediaID}
            sx={{
                height: "100vh",
                display: "flex",
                zIndex: 9999,
            }}
            onClick={() => {
                navigate('/')
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 0,
                }}
            >
                <Box
                    sx={{
                        width: "100vw",
                        height: "100vh",
                        backgroundImage: `url(${staticImageUrl + movieDetails?.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "#000000AA",
                        backgroundBlendMode: "darken",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        justifyContent: "flex-start",
                        padding: "1%",
                        position: "relative",
                        zIndex: 0,
                        userSelect: "none",
                    }}
                >
                    <Box
                        sx={{
                            filter: "brightness(0.5)",
                            opacity: previewVidPlaying ? 1 : 0,
                            transition: "all 2s ease",
                            backgroundColor: previewVidPlaying ? "#000000" : "transparent",
                            pointerEvents: "none",
                            overflow: "hidden",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <div style={{
                            paddingTop: "56.25%", // Percentage ratio for 16:9
                            position: "relative"
                        }}>
                            <ReactPlayer
                                url={previewVidURL ?? undefined}
                                controls={false}
                                width="100%"
                                height="100%"
                                playing={previewVidPlaying}
                                onEnded={() => {
                                    setPreviewVidPlaying(false);
                                }}
                                pip={false}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            />
                        </div>
                    </Box>
                    <Box
                        sx={{
                            ml: "auto",
                            display: "flex",
                            flexDirection: "row",
                            // alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 2,
                            position: "fixed",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            <CloseRounded fontSize="medium"/>
                        </IconButton>
                    </Box>
                </Box>

                <Box
                    sx={{
                        height: "20vh",
                        width: "100%",
                        background:
                            "linear-gradient(180deg, #18181800, #181818FF, #181818FF)",
                        zIndex: 1,
                        position: "absolute",
                        bottom: 0
                    }}
                />

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "end",
                        width: "100%",
                        padding: "0 3%",
                        mb: "5vh",
                        gap: "3%",
                        position: "absolute",
                        zIndex: 2,
                        bottom: "5vh"
                    }}
                >
                    <img
                        src={`${staticImageUrl + movieDetails?.poster_path}`}
                        alt=""
                        style={{
                            width: "30%",
                            aspectRatio: "2/3",
                            boxShadow: "-10px 10px 01px 0px #000000FF",
                            backgroundColor: "#00000088",
                            objectFit: "cover",
                            borderRadius: "10px",
                            marginBottom: "-5vh"
                        }}
                    />

                    <Box
                        sx={{
                            width: "70%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-end",
                            height: "100%",
                            marginLeft: "1%",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                width: "100%",
                                height: "65%",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    mb: "-10px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "30px",
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
                                    mt: 0,
                                }}
                            >
                                {movieDetails?.title}
                            </Typography>

                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    mt: -1,
                                }}
                            >
                                {movieDetails?.vote_average && (
                                    <Typography
                                        sx={{
                                            fontSize: "medium",
                                            fontWeight: "light",
                                            color: "#FFFFFF",
                                            border: "1px dotted #AAAAAA",
                                            borderRadius: "5px",
                                            px: 1,
                                            py: -0.5,
                                        }}
                                    >
                                        {movieDetails?.vote_average.toFixed(1)}
                                    </Typography>
                                )}
                                {movieDetails?.release_date && (
                                    <Typography
                                        sx={{
                                            fontSize: "medium",
                                            fontWeight: "light",
                                            color: "#FFFFFF",
                                            ml: 1,
                                        }}
                                    >
                                        {movieDetails?.release_date}
                                    </Typography>
                                )}
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    gap: 2,
                                    mt: 1,
                                }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: theme => theme.palette.text.primary,
                                        color: theme => theme.palette.background.default,
                                        fontWeight: "bold",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        "&:hover": {
                                            backgroundColor: "primary.main",
                                            gap: 1.5,
                                        },
                                        gap: 1,
                                        transition: "all 0.2s ease-in-out",
                                    }}
                                >
                                    <PlayArrowRounded fontSize="medium"/> Play{" "}
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    mt: 2,
                                }}
                            >
                                <Typography>Audio: {movieDetails?.original_language} </Typography>
                                <Typography>Duration: {getContentDuration(movieDetails?.runtime)}</Typography>
                                <Typography>Genres: {movieDetails?.genres?.map(genre => genre.name + " ")} </Typography>
                            </Box>

                            <Typography
                                sx={{
                                    mt: 1.5,
                                    fontSize: "1rem",
                                    fontWeight: "normal",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 5,
                                    WebkitBoxOrient: "vertical",
                                    maxInlineSize: "100%",
                                    userSelect: "none",
                                    cursor: "zoom-in",
                                }}
                                onClick={() => {
                                    if (!movieDetails?.overview) return;
                                }}
                            >
                                {movieDetails?.overview}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Backdrop>
    );
}

export default MediaViewer;
