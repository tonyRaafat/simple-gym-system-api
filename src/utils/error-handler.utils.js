function errorHandler(error, req, res, next ){
    error.statusCode = error.statusCode || 500
    console.log(error);
    return res.status(error.statusCode).send({
        error:error.message
    })
}

export default errorHandler