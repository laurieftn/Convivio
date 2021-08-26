import mongoose from 'mongoose'

const serviceProviderSchema = new mongoose.Schema({
    ServiceProvider: {
        type:{
            type: String,
            trim: true,
            lowercase: true  
        },
        company: {
            type: String,
            trim: true,
            lowercase: true  
        },
        mail: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
            lowercase: true,
        },
        website :{
            type: String,
            trim: true,
        },
        price: {
            type:Number
        },
        comment: {
            type: String,
            trim: true,
            lowercase: true  
        }
    }
})

export default mongoose.model('serviceProviders', serviceProviderSchema)