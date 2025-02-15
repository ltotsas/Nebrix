import { PlayArrowRounded } from "@mui/icons-material";
import {Box, Button, Typography,} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {staticImageUrl} from "../services/library.ts";
import {useState} from "react";
import {Movie} from "../types";

function MovieItem({
                       item,
                       itemsPerPage,
                   }: {
    item: Movie;
    itemsPerPage?: number;
    index?: number;
}) {

    const navigate = useNavigate();
    const [, setPlayButtonLoading] = useState(false);

    const handlePlay = async () => {
        if (!item) return;
        setPlayButtonLoading(true);
        navigate(
            `/watch/${item.id}`
        );
        setPlayButtonLoading(false);
    };
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    width: itemsPerPage
                        ? `calc((100vw / ${itemsPerPage}) - 10px - (5vw / ${itemsPerPage}))`
                        : "100%",
                    minWidth: itemsPerPage
                        ? `calc((100vw / ${itemsPerPage}) - 10px - (5vw / ${itemsPerPage}))`
                        : "100%",
                    backgroundColor: theme => theme.palette.background.paper,
                    borderRadius: "7px",
                    overflow: "hidden",
                    mb: "0px",
                    "&:hover": {
                        transform: "scale(1.15)",
                        transition: "all 0.2s ease, transform 0.5s ease",
                        zIndex: 1000,
                        boxShadow: "0px 0px 20px #000000",
                        position: "relative",
                        pb: "10px",
                        mb: "-42px",
                    },
                    "&:hover > :nth-of-type(4)": {
                        height: "32px",
                    },
                    transition: "all 0.2s ease, transform 0.5s ease",
                    cursor: "pointer",
                }}
                onClick={async () => {
                    if (item) {
                        navigate(
                            `/watch/${item.id.toString()}`
                        );
                    }
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        aspectRatio: "16/9",
                        backgroundImage: `url(${staticImageUrl + item.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                    }}
                >
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        height: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                        padding: "10px",
                        userSelect: "none",
                        transition: "all 0.5s ease",
                        transform: "translateX(0%)",
                        transformStyle: "preserve-3d",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#FFFFFF",
                            "@media (max-width: 2000px)": {
                                fontSize: "1rem",
                            },
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxLines: 1,
                            maxInlineSize: "100%",
                        }}
                    >
                        {item.title}
                    </Typography>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: "4px",
                            gap: 1,
                        }}
                    >
                        {item.vote_average && (
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "light",
                                    color: "#FFFFFF",
                                }}
                            >
                                {item.vote_average.toFixed(1)}
                            </Typography>
                        )}
                        {item.release_date && (
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: "light",
                                    color: "#FFFFFF",
                                }}
                            >
                                {item.release_date}
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        height: "0px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1,
                            padding: "2px 10px",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: theme => theme.palette.text.secondary,
                                color: "#1A1A1A",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                "&:hover": {
                                    backgroundColor: "primary.main",
                                },
                                gap: 1,
                                transition: "all 0.2s ease-in-out",
                                padding: "0px 10px",
                                fontSize: "12px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onClick={async (e) => {
                                e.stopPropagation();
                                await handlePlay();
                            }}
                        >
                            <>
                                <PlayArrowRounded fontSize="large"/> Play
                            </>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default MovieItem;
