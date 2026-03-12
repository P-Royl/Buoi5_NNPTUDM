var express = require('express');
var router = express.Router();
var User = require('../schemas/users');


/* =========================
   CREATE USER
========================= */
router.post('/', async function(req, res) {

    try{

        var user = new User(req.body);

        await user.save();

        res.json(user);

    }catch(err){
        res.status(500).json(err);
    }

});


/* =========================
   GET ALL USERS
========================= */
router.get('/', async function(req, res) {

    try{

        var users = await User.find({ isDeleted:false }).populate("role");

        res.json(users);

    }catch(err){
        res.status(500).json(err);
    }

});


/* =========================
   GET USER BY ID
========================= */
router.get('/:id', async function(req, res) {

    try{

        var user = await User.findById(req.params.id).populate("role");

        res.json(user);

    }catch(err){
        res.status(500).json(err);
    }

});


/* =========================
   UPDATE USER
========================= */
router.put('/:id', async function(req, res) {

    try{

        var user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );

        res.json(user);

    }catch(err){
        res.status(500).json(err);
    }

});


/* =========================
   SOFT DELETE USER
========================= */
router.delete('/:id', async function(req, res) {

    try{

        var user = await User.findByIdAndUpdate(
            req.params.id,
            { isDeleted:true },
            { new:true }
        );

        res.json(user);

    }catch(err){
        res.status(500).json(err);
    }

});


/* =========================
   ENABLE USER
========================= */
router.post('/enable', async function(req,res){

    try{

        var email = req.body.email;
        var username = req.body.username;

        var user = await User.findOne({
            email: email,
            username: username
        });

        if(!user){
            return res.json({message:"User not found"});
        }

        user.status = true;

        await user.save();

        res.json(user);

    }catch(err){
        res.status(500).json(err);
    }

});


/* =========================
   DISABLE USER
========================= */
router.post('/disable', async function(req,res){

    try{

        var email = req.body.email;
        var username = req.body.username;

        var user = await User.findOne({
            email: email,
            username: username
        });

        if(!user){
            return res.json({message:"User not found"});
        }

        user.status = false;

        await user.save();

        res.json(user);

    }catch(err){
        res.status(500).json(err);
    }

});


/* =========================
   GET USERS BY ROLE
   /users/role/:id/users
========================= */
router.get('/role/:id/users', async function(req,res){

    try{

        var users = await User.find({
            role:req.params.id,
            isDeleted:false
        }).populate("role");

        res.json(users);

    }catch(err){
        res.status(500).json(err);
    }

});


module.exports = router;