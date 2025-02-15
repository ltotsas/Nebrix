import {useQuery} from "@tanstack/react-query";
import {fetchMoviePreviewVideos} from "../services/tmdb.ts";
import {getMoviePreviewVideo} from "../services/library.ts";

export function useMoviePreviewVideo(movieId: number | null) {
    return useQuery({
        queryKey: ['moviePreviewVideo', movieId],
        queryFn: async () => {
            if (movieId) {
                const moviePreviewVideos = await fetchMoviePreviewVideos(movieId);
                return moviePreviewVideos ? getMoviePreviewVideo(moviePreviewVideos) : null;
            } else return null
        },
    });
}