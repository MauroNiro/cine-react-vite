import { useState, useEffect } from 'react';
import Main from './Main';
import getDirector from '../functions/Directors/getDirector'
import postShow from '../api/PostShow';
import putShow from '../api/PutShow';
import deleteShowApi from '../api/DeleteShow';
import { fetchDirectors, fetchShows, fetchMovies } from "../functions/fetchData"


const Body = () => {
    const [movies, setMovies] = useState([])
    const [shows, setShows] = useState([])
    const [directors, setDirectors] = useState([])


    useEffect(() => {
        const setAll = async () => {
            setMovies(await fetchMovies());
            setShows(await fetchShows());
            setDirectors(await fetchDirectors());
        }
        setAll();
    }, []);

    const addShow = async (showForm, movie, showId) => {
        const newShow = {
            showId: showId,
            movieId: movie.movieId,
            date: showForm.date,
            price: showForm.price,
            length: movie.length,
            directorId: movie.directorId,
            directorName: getDirector(directors, movie.directorId)
        }
        setShows(prevShows => [...prevShows, newShow])
    }

    const editShow = async (showForm, showId) => {
        setShows(prevShow => (
            prevShow.map(show => {
                if (show.showId === showId) {
                    return { ...show, price: showForm.price, date: showForm.date }
                }
                return { ...show }
            })
        ))
    }

    const deleteShow = async (showId) => {
        if (await deleteShowApi(showId)) {
            setShows(prevShows => {
                const updatedShow = prevShows.filter(show => show.showId !== showId)
                return updatedShow
            })
        }
    }

    const moviesComp = movies != [] && movies.map(movie => {
        return (
            <Main
                key={movie.movieId} handleAdd={addShow} handleEdit={editShow} handleDelete={deleteShow} movie={movie} shows={shows} />
        )
    })

    return (
        <div>
            <div className='body'>
                {moviesComp.length === 0 ?
                    <h3>No hay Peliculas cargadas</h3> :
                    moviesComp}
            </div>
            <div className='d-flex button-body mt-3'>
            </div>
        </div>
    )
}
export default Body