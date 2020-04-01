const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
  
    name: String,
    available: Boolean,
    departure: [{ depcity: String, depcountry: String, depdate: Date }],
    arrive: [{acity:String, acountry: String, adate: Date}],
    language: String,
    amountpeople: Number,
    users: [{
        email: String
    }]
})
    

eventSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const event = this
    
    next()
})



eventSchema.statics.findByDate = async () => {
    var today = new Date();
    const event = await Event.find ({ 'arrive.adate': { $gt: today } })
    if (!event) {
        throw new Error({ error: 'Invalid event' })
    }
    
    return event
}
eventSchema.statics.findByEventsAvailable = async () => {
    var today = new Date();
    const event = await Event.find ({ 'arrive.adate': { $gt: today }, available: true })
    if (!event) {
        throw new Error({ error: 'Invalid event' })
    }
    
    return event
}
eventSchema.statics.findEventsById = async (id) => {
    const event = await Event.find ({'_id': id});
    if (!event) {
        throw new Error({ error: 'Invalid event' })
    }
    
    return event
}

/*
eventSchema.statics.findByIdUpdate = async (_id) => {
   
    const event = await Event.findOne({ _id} )
    if (!event) {
        throw new Error({ error: 'Invalid id credentials' })
    }
    return event
}*/

const Event = mongoose.model('Event', eventSchema)

module.exports = Event