let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let models = require('../config/constants')

let schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: {type: String},
    addedCardsImageUrl: [{ type: String}],
    imageDesc: { type: String},
    keepCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    author: { type: String, required: true },
    createdDate: { type: String, required: true, default: new Date() },
    created: { type: Number, required: true, default: Date.now() },
    userId: { type: ObjectId, required: true, ref: models.models.user },
    cardId: [{type: ObjectId, ref: 'Card'}],
    private: {type: Boolean, default: false}
})

module.exports = mongoose.model('Deck', schema)