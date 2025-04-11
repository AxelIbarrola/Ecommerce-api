const errorHandler = (err, req, res, next) => {

    console.error(err.stack)

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        details: err.details || null
    })
}

module.exports = { errorHandler }