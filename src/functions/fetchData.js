import getMovies from "../api/GetMovies";
import getDirectors from "../api/getDirectors";
import getShows from '../api/GetShows'
export const fetchMovies = async () => {
    try {
        const moviesData = await getMovies();
        if (moviesData) {
            return moviesData;
        }
        else {
            return [];
        }
    }
    catch {
        return [];
    }
};

export const fetchDirectors = async () => {
    try {
        const directorsData = await getDirectors();
        if (directorsData) {
            return directorsData
        }
        else {
            return []
        }
    }
    catch {
        return []
    }
}
export const fetchShows = async () => {
    try {
        const showsData = await getShows();
        if (showsData) {
            return showsData;
        }
        else {
            return [];
        }
    }
    catch {
        return [];
    }
}
