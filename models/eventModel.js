import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref:'user'
    },

    business:{
       name:{
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        },
       mail:{
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        },
       phone:{
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        },
        CEphone:{
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        }
    },
    benefit:{
        type:{
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        },
        serviceProvider:{
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        },
        price:{
            type: Number,
            required: true,
            trim: true,
            lowercase: true  
        }
    },
        equipment:{
            entitled:{
                type: String,
                required: true,
                trim: true,
                lowercase: true  
            },
            price:{
                type: Number,
                required: true,
                trim: true,
                lowercase: true  
            },
            Number:{
                type: Number,
                required: true,
                trim: true,
                lowercase: true  
            }
        },
        typeOfEvent:{
            type: String,
            required: true,
            trim: true,
            lowercase: true 
        },
        hourlyRate:{
            type: String,
            required: true,
            trim: true,
            lowercase: true 
        },
        request:{
            type: String,
            required: true,
            trim: true,
            lowercase: true  
        },
        numberOfPeople:{
            type: Number,
            required: true,
            trim: true,
            lowercase: true   
        },
        day:{
            type: Date,
            required: true,
            trim: true,
            lowercase: true   
        },
        description:{
            type: String,
            required: true,
            trim: true,
            lowercase: true   
        }
        
    }
)
const event = mongoose.model('event', eventSchema)

export default event