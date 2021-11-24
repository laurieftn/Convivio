import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // reference à la collection users il faut ajouter la fonction populate dans le controller
    },
    eventTitle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true
    },
    eventPicture: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
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
        },
        public: {
            type: Boolean,
            required: true
        }
    },
    options: {
        serviceProviders: [{
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
    private: {
        type: Boolean,
    },
    status: {
        status: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            enum: ['started', 'description', 'concepting', 'dating', 'placing', 'servicing', 'scheduled', 'budgeting', 'validating', 'billing', 'archived' ] // limite à ces valeurs
        },
        date: {
            type: Date,
            required: true
        },
        current: {
            type: Boolean,
            required: true
        },
        comment: {
            type: String,
            required: false
        }
    },
    comment: {
        type: String,
        trim: true,
        lowercase: true,
    },
    price: {
        budget: {
            type: Number,
            required: false
        },
        location:{
            type: Number,
            required: false
        },
        service: {
            type: Number,
            required: false
        }
    },
    deletedAt: {
        type: Date
    }
},
{ timestamps: true } // pour les champs createdAt et updatedAt
)


export default mongoose.model('events', eventSchema)