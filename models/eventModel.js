import mongoose from 'mongoose'
import users from './userModel.js'


const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: users, // reference à la collection user n'importe peut être que l'id ? 
    },
    // user: userSchema, // pour inclure toutes les données
    eventTitle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true 
    },
    eventDescription: {
        description: {
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        },
        city: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true 
        },
        zipcode:{
            type: String,
            trim: true,
            lowercase: true,
            minLength: 2,
            maxLength: 5
        },
        address: {
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        },
        eventType: {
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        },
        numberOfPeople: {
            type: Number
        }
    },
    option: {
        ServiceProvider: [{
            provider:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'serviceProviders',
            },
            comment: {
                type: String,
                trim: true,
                lowercase: true
            }
        }],
        equipment: [{
            type: {
                type: String,
                trim: true,
                lowercase: true,
            },
            neededQuantity: {
                type: Number
            },
            priceRent: {
                type: Number
            }
        }]
    },
    comment: {
        type: String,
        trim: true,
        lowercase: true,
    },
    totalPrice: {
        type: Number
    },
    deletedAt: {
        type: Date    
    }
},
{ timestamps: true } // pour les champs createdAt et updatedAt
)


export default mongoose.model('events', eventSchema)