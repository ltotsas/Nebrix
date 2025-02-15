import {Movie, MoviePreviewsVideos, MoviePreviewVideo} from "../types";

const staticImageUrl = "https://image.tmdb.org/t/p/original/";
const youtubeVideoUrl = "https://www.youtube.com/watch?v=";

const getContentDuration = (duration: number | undefined): string => {
    if (!duration) return "";
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return (
        (hours > 0 ? `${hours}h` : "") +
        (Math.floor(minutes) > 0 ? ` ${Math.floor(minutes)}m` : "")
    ).trim();
}

const getMoviePreviewVideo = (moviePreviewVideos: MoviePreviewsVideos): MoviePreviewVideo | undefined => {
    return moviePreviewVideos.results.find(video => video.type === "Teaser" || video.type === "Trailer");
}
const getRandomMovie = (movies: Movie[] | undefined): number => {
    return movies ? Math.floor(Math.random() * movies!.length) : 0
}

export {
    staticImageUrl,
    youtubeVideoUrl,
    getContentDuration,
    getRandomMovie,
    getMoviePreviewVideo
}