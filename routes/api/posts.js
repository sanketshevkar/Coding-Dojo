const express = require('express');
const router=express.Router();
const {check, validationResult}=require('express-validator');
const auth=require('../../middleware/auth');
const Post=require('../../models/Post');
const User=require('../../models/User');


//@route    POST api/posts
//@desc     create a post
//@access   Private
router.post('/:id', [auth,[
    check('text', 'Text is required').not().isEmpty()
]], async(req, res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user=await User.findById(req.user.id).select('-password');

    const newPost=new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id
    });

    const post= await newPost.save();

    const posts=await Post.find({ user: req.params.id } ).sort({date: -1});

    res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//@route    GET api/posts
//@desc     get all post
//@access   Private
router.get('/:id', auth, async(req, res)=>{
    try {
        const posts=await Post.find({ user: req.params.id } ).sort({date: -1});

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    DELETE api/posts/:id
//@desc     delete post
//@access   Private
router.delete('/:msgid/:userid', auth, async(req, res)=>{
    try {
        const post=await Post.findById(req.params.msgid);
        
        if(!post){
            return res.status(404).json({msg: 'post not found'});
        }

        //check on user

        if(post.user.toString()!==req.user.id){
            return res.status(401).json({msg:'User not autorized'});
        }
        await post.remove();
        const posts=await Post.find({ user: req.params.userid } ).sort({date: -1});

        res.json(posts);

    } catch (err) {
        console.error(err.message);
        if(!err.kind=='ObjectId'){
            return res,status(404).json({msg: 'post not found'});
        }
        res.status(500).send('Server Error');
    }
});


//@route    PUT api/posts
//@desc     update a post
//@access   Private
router.put('/:msgid/:userid', [auth,[
    check('text', 'Text is required').not().isEmpty()
]], async(req, res)=>{;
    try{
    let post=await Post.findById(req.params.msgid);

        if(!post){
            return res.status(404).json({msg: 'post not found'});
        }

        //check on user

        if(post.user.toString()!==req.user.id){
            return res.status(401).json({msg:'User not autorized'});
        }

        const user=await User.findById(req.user.id).select('-password');

        post.text=req.body.text,

     await post.save()

     const posts=await Post.find({ user: req.params.userid } ).sort({date: -1});

     res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;

