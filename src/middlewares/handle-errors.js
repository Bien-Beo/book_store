import createError from 'http-errors'

export const badRequest = (err, res) =>{
    const error = createError.BadRequest(err)
    return res.status(err.status).json({
        err: 1,
        mes: err.message
    })
} 

export const internalServerError = (res) => {
    const error = createError.InternalServerError()
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const notFound = (req, res) => {
    const error = createError.NotFound('This route is not define')
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}

export const unauthorized = (err, res) => {
    const error = createError.Unauthorized(err)
    return res.status(error.status).json({
        err: 1,
        mes: error.message
    })
}