import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    request: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    postal: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
})

const Request = mongoose.model('Request', RequestSchema)

export default Request