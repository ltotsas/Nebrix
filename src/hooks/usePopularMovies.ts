import {useQuery} from "@tanstack/react-query";
import {fetchPopularMovies} from "../services/tmdb.ts";

export function usePopularMovies(pageNumber = 1) {
    return useQuery({
        queryKey: ['popularMovies', pageNumber],
        queryFn: () => fetchPopularMovies(pageNumber),
    })
}