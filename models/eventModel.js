import mongoose from 'mongoose'


const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user' // reference à la collection user n'importe peut être que l'id ? 
    },
    // user: 'user' ou userSchema // pour inclure toutes les données
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
        ServiceProvider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'serviceProvider'
        },
        equipment: {
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
        }
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


export default mongoose.model('event', eventSchema)