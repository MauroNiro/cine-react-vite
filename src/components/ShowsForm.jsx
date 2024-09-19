import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import validateQuantity from '../functions/Validations/validateShow';
import Shows from './Shows'
import postShow from '../api/PostShow';
import putShow from '../api/PutShow';

const ShowsForm = ({ showModal, handleClose, handleAdd, handleEdit, handleDelete, shows, movie }) => {
    //initializes states and make variables more accesible
    const [showId, setShowId] = useState(0)
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(false)
    const [quantityError, setQuantityError] = useState(false)
    const [showSpec, setShowSpec] = useState({
        date: new Date(),
        price: 0,
    })
    //resets when adding a new show
    const resetShowSpec = () => {
        setShowSpec({
            date: new Date(),
            price: 0
        })
    }
    //sets showId and brings the old data for the edit
    const getShowSpec = (showId) => {
        setShowId(showId)
        const showToEdit = shows.find(show => show.showId === showId)
        setShowSpec({
            date: showToEdit.date,
            price: showToEdit.price
        })
    }
    //if form has been closed the errors go back to false and reset the showId
    const toggleForm = () => {
        setShowId(0)
        setShowForm(prevState => !prevState)
        setFormError(false)
        setQuantityError(false)
    }
    //executes everytime a value is changed
    const changeShow = (event) => {
        const { name, value } = event.target
        setShowSpec(prevShowSpec => {
            return {
                ...prevShowSpec,
                [name]: value
            }
        })
    }
    //addShow and editShow are made this way to close the toggle
    const addShow = async (showSpec, movie) => {
        const response = await postShow(showSpec, movie.movieId)
        if (response.showId > 0) {
            handleAdd(showSpec, movie, response.showId)
            toggleForm()
        }
        else {
            setQuantityError(true)
        }
    }
    const editShow = async (showSpec, showId) => {
        if (await putShow(showSpec, showId)) {
            handleEdit(showSpec, showId)
            toggleForm()
        }
        else {
            setQuantityError(true)
        }
    }
    //buttons for add or edit in the form
    const editAddButtonForm = () => {
        if (showId === 0) {
            return (
                <Button variant="primary" onClick={() =>
                    validateAndAdd(showSpec, movie)
                }>
                    Agregar Funcion
                </Button>
            )
        }
        return (
            <Button variant="primary" onClick={() => {
                validateAndEdit(showSpec, showId);
            }}>
                Editar Funcion
            </Button>
        )
    }
    const validateAndAdd = (showSpec, movie) => {
        validateItems() && addShow(showSpec, movie)
    }
    const validateAndEdit = (showSpec, showId) => {
        validateItems() && editShow(showSpec, showId)
    }
    //checks for conditions
    const validateItems = () => {
        const date = new Date(showSpec.date)
        if (date >= Date.now() && showSpec.price > 0) {
            if (showId !== 0) {
                const show = shows.find(show => (show.showId === showId))
                const showDate = new Date(show.date)
                const formDate = new Date(showSpec.date)
                if (showDate.getDate() !== formDate.getDate() || showDate.getMonth() !== formDate.getMonth() || showDate.getFullYear() !== formDate.getFullYear()) {
                    if (!validateQuantity(showSpec, movie, shows)) {
                        setQuantityError(true)
                        return false
                    }
                }
                return true
            }
            if (validateQuantity(showSpec, movie, shows)) {
                return true
            }
            else {
                setQuantityError(true)
                return false
            }
        }
        setFormError(true)
        return false
    }
    const handleHideModal = () => {
        setShowForm(false);
        handleClose()
    }
    const handleShowAddForm = () => {
        toggleForm();
        resetShowSpec()
    }
    const removeQuantityError = () => {
        setQuantityError(false)
    }
    const removeFormError = () => {
        setFormError(false)
    }
    return (
        <Modal show={showModal} onHide={handleHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Funciones de {movie.movieName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Shows shows={shows}
                    movie={movie}
                    showForm={showForm}
                    toggleForm={toggleForm}
                    getShowSpec={getShowSpec}
                    handleDelete={handleDelete} ></Shows>
                <Button className='mt-2' onClick={handleShowAddForm}>{!showForm ? "Agregar" : "Cerrar formulario"}</Button>
            </Modal.Body>
            {showForm &&
                <>
                    <Form>
                        <Form.Group controlId="formDate">
                            <Form.Label className='ms-2'>Fecha:</Form.Label>
                            <Form.Control className="w-50 ms-3" name="date" value={showSpec.date} onChange={changeShow} type='datetime-local'></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className='ms-2'>Precio:</Form.Label>
                            <Form.Text>
                                <Form.Control className='w-50 ms-3' name='price' value={showSpec.price} type='number' onChange={changeShow}></Form.Control>
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        {formError &&
                            <Alert variant="danger" onClose={removeQuantityError} dismissible>
                                Error: La fecha debe ser en el futuro o el precio es menor o igual a cero.
                            </Alert>}
                        {quantityError &&
                            <Alert variant="danger" onClose={removeFormError} dismissible>
                                Error: Ya alcanzo el limite de funciones para este tipo de peliculas en este dia.
                            </Alert>}
                        {editAddButtonForm()}
                    </Modal.Footer>
                </>}
        </Modal>
    )
}
export default ShowsForm;