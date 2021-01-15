const express = require('express') 
const router = new express.Router()
const axios = require("axios")

router.get('/api/posts/getAllSortedPostsWithComments' ,async (req,res)=>{
    let a = getAllPosts().then(async (success)=>{
        let data = await Promise.all(success.data.map(async (m)=>{
            let c = await getCommentCountWithPostID(m.id,(count=>{
                return {
                    post_id: m.id,
                    post_title: m.title,
                    post_body: m.body,
                    total_number_of_comments: count
                }
            }))
            return c
       }).sort(function(a, b){return b.total_number_of_comments-a.total_number_of_comments}))
        res.status(200).send({status:true,posts:data})
    })

})


function getAllPosts(){
    return axios.get('https://jsonplaceholder.typicode.com/posts')
}

const getCommentCountWithPostID= async(postID,callback)=>{
    let data = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${Number(postID)}`)
    return callback(data.data.length);
}

module.exports = router