import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import {ArrowForwardIosRounded} from "@mui/icons-material";
import MovieItem from "./MovieItem";
import {useEffect, useState} from "react";
import {Movie} from "../types";

function MovieItemSlider({
                             title,
                             link,
                             movies,
                         }: {
    title: string;
    link?: string;

    movies?: Movie[];
}) {
    const [items,] = useState<Movie[] | null>(
        movies ?? null
    );
    const theme = useTheme();
    const [currPage, setCurrPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(0)
    const matchesXs = useMediaQuery(theme.breakpoints.down("xs"));  // e.g. < 600px
    const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));  // e.g. < 960px
    const matchesMd = useMediaQuery(theme.breakpoints.down("md"));  // e.g. < 1280px
    const matchesLg = useMediaQuery(theme.breakpoints.down("lg"));  // e.g. < 1920px

    useEffect(() => {
        if (matchesXs) {
            setItemsPerPage(1);
        } else if (matchesSm) {
            setItemsPerPage(2);
        } else if (matchesMd) {
            setItemsPerPage(4);
        } else if (matchesLg) {
            setItemsPerPage(5);
        } else {
            setItemsPerPage(6);
        }
    }, []);

    if (!items || !itemsPerPage) return <></>;

    const itemCount = items.slice(0, itemsPerPage * 5).length;
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "auto",
                gap: "10px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: "2.5vw",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        mb: "-10px",
                        cursor: link ? "pointer" : "default",
                        "&:hover": {
                            gap: "20px",
                        },
                        "&:hover > :nth-of-type(2)": {
                            opacity: 1,
                            gap: "5px",
                        },
                        transition: "all 0.5s ease",
                        userSelect: "none",
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: "2rem",
                            fontWeight: "bold",
                            mb: "0px",
                        }}
                    >
                        {title}
                    </Typography>

                    {link && (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                mt: "0px",
                                opacity: 0,
                                gap: "0px",
                                transition: "all 0.5s ease",
                                color: "primary.main",
                            }}
                        >
                            <Typography sx={{fontSize: "1rem"}}>Browse</Typography>
                            <ArrowForwardIosRounded fontSize="small"/>
                        </Box>
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        visibility: itemCount > itemsPerPage ? "visible" : "hidden",
                    }}
                >
                    {Array(Math.ceil(itemCount / itemsPerPage))
                        .fill(0)
                        .map((_, i) => {
                            return (
                                <Box
                                    key={i}
                                    sx={{
                                        width: "10px",
                                        height: "4px",
                                        backgroundColor: i === currPage ? "#FFFFFF" : "#FFFFFF55",
                                        transition: "all 0.5s ease",
                                        mx: "2px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setCurrPage(i);
                                    }}
                                />
                            );
                        })}
                </Box>
            </Box>
            <Box
                sx={{
                    width: "100vw",
                    height: "auto",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",

                    py: "10px",
                    whiteSpace: "nowrap",
                    // clipPath: "inset(0px 0px -10px 0px)",
                    overflowX: "clip",
                    overflowY: "visible",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        width: "calc(2.5vw)",
                        height: "16vh",
                        position: "absolute",
                        left: "0px",
                        backgroundColor: "#00000022",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        visibility: itemCount > itemsPerPage ? "visible" : "hidden",
                        "&:hover": {
                            backgroundColor: "#000000AA",
                        },

                        transition: "all 0.5s ease",
                    }}
                    onClick={() => {
                        setCurrPage((currPage) =>
                            currPage - 1 < 0
                                ? Math.ceil(itemCount / itemsPerPage) - 1
                                : currPage - 1
                        );
                    }}
                >
                    <ArrowForwardIosRounded
                        sx={{
                            transform: "rotate(180deg)",
                        }}
                        fontSize="large"
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        transform: `translateX(calc((-${currPage} * (100vw - 5vw) + 2.5vw)))`,
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: `auto`,
                        gap: "10px",
                        transition: "transform 1s ease",
                    }}
                >
                    {items?.slice(0, itemsPerPage * 5).map((item, i) => {
                        const start = currPage * itemsPerPage - itemsPerPage;
                        const end = currPage * itemsPerPage + itemsPerPage * 2;

                        if (i >= start && i < end) {
                            return (
                                <MovieItem
                                    key={i}
                                    item={item}
                                    itemsPerPage={itemsPerPage}
                                    index={i}
                                />
                            );
                        } else {
                            return (
                                <Box
                                    style={{
                                        width: `calc((100vw - 5vw) / ${itemsPerPage} - 10px)`,
                                    }}
                                    key={i}
                                >
                                    <Box
                                        sx={{width: "100%", height: "auto", aspectRatio: "16/9"}}
                                    />
                                    <Box sx={{width: "100%", height: "104px"}}/>
                                </Box>
                            );
                        }
                    })}
                </Box>
                <Box
                    sx={{
                        width: "calc(2.5vw)",
                        height: "16vh",
                        position: "absolute",
                        right: "0px",
                        backgroundColor: "#00000022",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        visibility: itemCount > itemsPerPage ? "visible" : "hidden",

                        "&:hover": {
                            backgroundColor: "#000000AA",
                        },

                        transition: "all 0.5s ease",
                    }}
                    onClick={() => {
                        setCurrPage(
                            currPage + 1 > Math.ceil(itemCount / itemsPerPage) - 1
                                ? 0
                                : currPage + 1
                        );
                    }}
                >
                    <ArrowForwardIosRounded fontSize="large"/>
                </Box>
            </Box>
        </Box>
    );
}

export default MovieItemSlider;
