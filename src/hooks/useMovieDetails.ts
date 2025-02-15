import {useQuery} from "@tanstack/react-query";
import {fetchMovieDetails} from "../services/tmdb.ts";

export function useMovieDetails(movieId: string | null) {
    return useQuery({
        queryKey: ['movieDetails', movieId],
        queryFn: () => {
            if (movieId) {
                return fetchMovieDetails(movieId)
            } else return null
        },
    })
}
