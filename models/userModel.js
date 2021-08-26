import mongoose from 'mongoose'

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

userSchema.statics.login = async function(pseudo, password){ // Fonction qui permet de logger l'utilisateur
    const user = await this.findOne({pseudo}) // cherche selon un pseudo
    if (user) {
        if (user.password == password) // si le mdp est bon, ok
        {
            return user
        } 
    }
    return false
}

export default mongoose.model('user', userSchema)