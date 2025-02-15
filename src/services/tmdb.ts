import {GenreList, Movie, MoviePreviewsVideos, PopularMovies} from "../types";

const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${VITE_TMDB_TOKEN}`
    }
};

export async function fetchPopularMovies(page = 1): Promise<PopularMovies> {
    const resp = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options
    );
    if (!resp.ok) {
        throw new Error("Failed to fetch popular movies");
    }
    return resp.json();
}

export async function fetchGenres(): Promise<GenreList> {
    const resp = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-U`, options
    );
    if (!resp.ok) {
        throw new Error("Failed to fetch genres");
    }
    return resp.json();
}

export async function fetchMovieDetails(movieId: string): Promise<Movie> {
    const resp = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options
    );
    if (!resp.ok) {
        throw new Error(`Failed to fetch details for movie ID: ${movieId}`);
    }
    return resp.json();
}

export async function fetchMoviePreviewVideos(movieId: number): Promise<MoviePreviewsVideos> {
    const resp = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options
    );
    if (!resp.ok) {
        throw new Error(`Failed to fetch movie preview videos: ${movieId}`);
    }
    return resp.json();
}
