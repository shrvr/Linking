const errorHandler = (err, req, res, next) => {
    try {
        console.log('congrats you hit the error middleware');
        if (err.name === 'ValidationError')
            return (err = handleValidationError(err, res));
        if (err.code && err.code == 11000)
            return (err = handleDuplicateKeyError(err, res));
        else res.status(500).send({ messages: 'An unknown error occurred.' });
    } catch (err) {
        res.status(500).send({ messages: 'An unknown error occurred.' });
    }
};

const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    res.status(code).send({ messages: error, fields: field });
};

const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map((el) => el.message);
    let fields = Object.values(err.errors).map((el) => el.path);
    let code = 400;
    res.status(code).send({ messages: errors.join(', '), fields: fields });
};

module.exports = errorHandler;
