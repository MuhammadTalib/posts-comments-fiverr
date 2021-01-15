const express = require('express') 
const router = new express.Router()
const axios = require("axios")

router.post('/api/comments/searchComments' ,async (req,res)=>{
    let route = "https://jsonplaceholder.typicode.com/comments"
    if(req.body.name || req.body.email || req.body.body){
        route+="?"
    }
    if(req.body.name){
        route+="name="+req.body.name+"&"
    }
    if(req.body.email){
        route+="email="+req.body.email+"&"
    }
    if(req.body.body){
        route+="body="+req.body.body
    }
    axios.get(route).then(res=>{
        res.status(200).send({status:true,posts:res.data})
    })

})

module.exports = router