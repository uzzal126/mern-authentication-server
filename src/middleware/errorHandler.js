const mongoose = require("mongoose")

const notFoundHandler = (_req, res, next) => {
    res.status(404).json({message: "Page not found!"})
    next()
}

const errorHandler = (err, _req, res, _next) => {
    // Handle different types of errors
    if (res.headersSent) {
        res.status(500).json({ message: "There was an error" });
    } else {
        if (err instanceof mongoose.Error.CastError) {
            res.status(400).json({ message: "Invalid ID format" });
        } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
            res.status(404).json({ message: "Item not found" });
        } else {
            res.status(err.status || 500).json({ message: "Internal server error" });
        }
    }
};


module.exports = { notFoundHandler, errorHandler }