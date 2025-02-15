import {useQuery} from "@tanstack/react-query";
import {fetchGenres} from "../services/tmdb.ts";

export function useGenresList() {
    return useQuery({
        queryKey: ['genres'],
        queryFn: () => fetchGenres(),
    })
}