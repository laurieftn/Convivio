import mongoose from 'mongoose'

const equipmentStockSchema = new mongoose.Schema({
    equipmentType: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    stockMax: {
        type: Number,
        required: true
    }
})

export default mongoose.model('stock', equipmentStockSchema)