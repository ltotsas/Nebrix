import React, { createContext, useContext } from 'react';
import {Movie} from "../types";
import {useGenresList, usePopularMovies} from "../hooks";

interface AllMediaContextValue {
    popularMovies: Movie[] | undefined;
    genreMap: Record<number, string>;
    isFetching: boolean;
}

const AllMediaContext = createContext<AllMediaContextValue>({
    popularMovies: undefined,
    genreMap: {},
    isFetching: false,
});

export function AllMediaProvider({ children }: { children: React.ReactNode }) {
    const {
        data: popularMoviesData,
        isFetching: isFetchingPopular,
        error: errorPopular
    } = usePopularMovies()

    const {
        data: genreData,
        isFetching: isFetchingGenres,
        error: errorGenres,
    } = useGenresList()

    const genreMap: { [key: number]: string } = {};
    if (genreData?.genres) {
        genreData.genres.forEach(g => {
            genreMap[g.id] = g.name;
        });
    }

    // Combine both fetching states to get an overall "isFetching" if needed
    const isFetching = isFetchingPopular || isFetchingGenres;

    // Optionally handle or log errors
    if (errorPopular) {
        console.error('Error fetching popular movies:', errorPopular);
    }
    if (errorGenres) {
        console.error('Error fetching genres:', errorGenres);
    }

    const contextValue: AllMediaContextValue = {
        popularMovies: popularMoviesData?.results, // the array of movies
        genreMap,
        isFetching,
    };

    return (
        <AllMediaContext.Provider value={contextValue}>
            {children}
        </AllMediaContext.Provider>
    );
}

export function useAllMedia() {
    return useContext(AllMediaContext);
}