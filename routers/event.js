const express = require('express')
const User = require('../models/User')
const Event = require('../models/Event')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/events', auth, async (req, res) => {
    // Create a new event
    try {
        const event = new Event(req.body)
        await event.save()
        res.status(201).send({event})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/events/all', auth, async(req, res) => {
	
	 try {
        const event = await Event.findByDate();
        if (!event) {
            return res.status(401).send({error: 'Load events fail, there are no events'});
        }
       res.send(event);
       //next();
    } catch (error) {
        res.status(400).send(error);
    }});

router.get('/events/available', auth, async (req, res) => {
	 try {
        const event = await Event.findByEventsAvailable();
        if (!event) {
            return res.status(401).send({error: 'Load events fail, there are no events available'});
        }
       res.send(event);
       //next();
    } catch (error) {
        res.status(400).send(error);
    }});
    
    router.put('/events/take/:id', auth, async function(req, res) {
        try{
        var event= await Event.findById(req.params.id);
        event.available=false;
        var useremail = {"email": req.body.email};
        event.users = event.users.concat(useremail);
        await event.save();
        res.send('event update succesfully');}
        catch(error){
            res.status(400).send(error);
        }
    });
    
 
   
        /*
        Event.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
         if (err) return next(err);
         res.json(post);
        });
       });*/
/*
    router.put('/events/take/:id', auth, async (req, res) => {
        try{
        var event = await Event.findEventsById(req.params.id);
                event.available = false;
                event.users.email = req.body.email;
                event.save(function(err) {
                    if(err) return res.status(500).send(err.message);
              res.status(200).jsonp(event);
                });}
                catch(error){
                    res.status(400).send(error);
                }
            });*/
        

/*router.post('/events/', auth, async(req, res) => {
});*/
module.exports = router;