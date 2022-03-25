import mongoose from 'mongoose'

const serviceProviderSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    company: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true
    },
    mail: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    website :{
        type: String,
        trim: true,
    }
})

export default mongoose.model('serviceProviders', serviceProviderSchema)