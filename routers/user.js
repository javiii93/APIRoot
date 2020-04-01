const express = require('express')
const User = require('../models/User')
const Event = require('../models/Event')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }

})
router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})
router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})
router.delete('/users/deleteone/:id', auth,async function (req,res){
    try{
        //var user= await User.findById(req.params.id);
        User.findByIdAndRemove(req.params.id, (err, user) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
          
            return res.status(200).send('user del');
        });
    }
        catch(error){
            res.status(400).send(error);
        }

});
router.put('/users/modify/:id', auth, async function(req, res) {
    try{
    var user= await Event.findById(req.params.id);
    user.name=req.body.name;
    user.surname=req.body.surname;
    user.province=req.body.province;
    user.address=req.body.address;
    user.cp=req.body.cp;
    user.phonenumber=req.body.phonenumber;
    user.language=req.body.language;
    await user.save();
    res.send('user update succesfully');}
    catch(error){
        res.status(400).send(error);
    }
});

module.exports = router