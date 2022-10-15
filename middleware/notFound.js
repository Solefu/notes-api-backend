const notFound = (request, response) => {

    response.status(404).json({
        error: 'Not Found'
    })
}

module.exports = notFound