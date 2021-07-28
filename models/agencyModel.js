import mongoose from 'mongoose'

const AgencySchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: false,
        lowercase: false
    },
    role: {
        type: Boolean,
        required: true,
        trim: false,
        lowercase: false
    },
})

const Agency = mongoose.model('Agency', AgencySchema)

export default Agency