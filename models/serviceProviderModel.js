import mongoose from 'mongoose'
import { isEmail, isURL, isMobilePhone } from 'validator'

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
            // match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ // regex pour mail
            validate: [isEmail, 'le mail est invalide'] // installer et importer le validator
        },
        phone: {
            type: String,
            trim: true,
            lowercase: true,
            validate : [isMobilePhone, 'le numéro n\'est pas correct'] // installer et importer le validator
        },
        website :{
            type: String,
            trim: true,
            validate : [isURL, 'l\'adresse n\'est pas une URL valide'] // installer et importer le validator
        },
        price: {
            type:Number
        },
    }
})

export default mongoose.model('serviceProvider', serviceProviderSchema)