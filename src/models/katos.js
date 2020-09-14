const mongoose = require('mongoose');

const katoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    stickerName: String, 
    stickerPrice: String, 
    soldDate: Date,
    stickerMarketplace: String,
    stickerRarity: String,
}, {timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Katos', katoSchema);