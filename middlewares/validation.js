const validation = (schema)=> {
    return (req, res, next)=> {
        const {error} = schema.validate(req.body);
        if(error){
            error.status = 400;
            next({"message": error.message});
        }
        next()
    }
}

module.exports = validation;