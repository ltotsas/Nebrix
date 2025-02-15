import {getRandomMovie } from "../services/library.ts";
import {Box} from "@mui/material";
import MovieItemSlider from "./MovieItemSlider.tsx";
import BackDropDisplay from "./BackDropDisplay.tsx";
import {useEffect, useState} from "react";
import {useAllMedia} from "../providers/AllMediaProvider.tsx";

export default function HomeScreen() {
    const { popularMovies, isFetching } = useAllMedia();

    const [randomMovieIndex, setRandomMovieIndex] = useState<number>(0);

    useEffect(() => {
        if (!popularMovies) return;

        const interval = setInterval(() => {
            setRandomMovieIndex(getRandomMovie(popularMovies));
        }, 30000);
        return () => clearInterval(interval);
    }, [popularMovies]);

    if (isFetching) {
        return <p>Loading popular movies...</p>;
    }
    if (!popularMovies) {
        return <p>No data found</p>;
    }

    const randomMovie = popularMovies[randomMovieIndex];
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
            }}
        >
            {randomMovie && <BackDropDisplay item={randomMovie} />}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    gap: 6,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    mt: "-20vh",
                    zIndex: 1,
                }}
            >

                <Box
                    sx={{
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        gap: 8,
                    }}
                >
                    <MovieItemSlider title="Popular" movies={popularMovies} />
                </Box>
            </Box>
        </Box>
    )
}
