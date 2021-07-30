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

AgencySchema.statics.login = async(pseudo, password) => { // Fonction qui permet de logger l'utisateur
    const agency = await this.findOne({pseudo}) // cherche selon un pseudo
    if (agency) {
        if (agency.password == password) // si le mdp est bon, ok
        {
            return agency
        } 
    }
    return false
}

const Agency = mongoose.model('Agency', AgencySchema)

export default Agency