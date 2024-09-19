const getDirector = (directors, directorId) => {
    const directorVar = directors.find(director => director.directorId === directorId)
    return directorVar.directorName
}
export default getDirector;