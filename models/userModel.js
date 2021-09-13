import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index:true
    },
    password: {
        type: String,
        required: true,
        trim: false,
        lowercase: false
    },
    role: {
        type: String,
        required: true,
        trim: false,
        lowercase: false,
        enum: ['staff','customer'] // limite à ces valeurs
    },
    firstname: {
        type: String,
        required: true,
        trim: false,
        lowercase: false
    },
    lastname: {
        type: String,
        required: true,
        trim: false,
        lowercase: false
    },
    company: {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index:true
        },
        address: {
            type: String,
            trim: true,
            lowercase: true,
        },
        city: {
            type: String,
            trim: true,
            lowercase: true,
        },
        zipcode:{
            type: String,
            trim: true,
            lowercase: true,
            minLength: 2,
            maxLength: 5
        },
        siret: {
            type: Number
        },
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
        unique:true
    },
    deletedAt: {
        type: Date    
    }
},
{ timestamps: true } // pour les champs createdAt et updatedAt
)

// possibilité de faire les methodes en async ou sync mais comme le hash demande de la ressource CPU il est conseillé de la faire en async pour ne pas bloquer le chargement de la page 

userSchema.statics.checkPassword = async function(user, password) {
    if (await bcrypt.compare(password, user.password)) {
        return true
    } else {
        return false
    }
}

userSchema.statics.hashing = async function(password) {
        return bcrypt.hash(password, 10)
}

export default mongoose.model('users', userSchema)