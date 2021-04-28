const express = require('express');
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId

var {PostMessage} = require('../models/postMessage.js');

router.get('/',(req,res) =>{
  PostMessage.find((err,docs)=>{
    if (!err) {
      res.send(docs)
    }
    else {
      console.log("Error while retrieving all record: "+ JSON.stringify(err,undefined,2));
    }
  })
})

router.post('/',(req,res) =>{
  var newRecord = new PostMessage ({
    title : req.body.title,
    message : req.body.message
  })

  newRecord.save((err,docs) =>{
    if (!err) {
      res.send(docs)
    }
    else {
      console.log("Error while creating newRecord record: "+ JSON.stringify(err,undefined,2));
    }
  })
})

router.put('/:id',(req,res) =>{
  if (!ObjectID.isValid(req.params.id)) {
    return(res.status(400).send('No record with given ID: '+ res.params.id))
  }

  var updatedRecord = {
    title : req.body.title,
    message : req.body.message
  }

  PostMessage.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true},(err,docs) =>{
    if (!err) {
      res.send(docs)
    }
    else {
      console.log("Error while updating newRecord record: "+ JSON.stringify(err,undefined,2));
    }
  })
})

router.delete('/:id',(req,res) =>{
  if (!ObjectID.isValid(req.params.id)) {
    return(res.status(400).send('No record with given ID: '+ res.params.id))
  }
  PostMessage.findByIdAndRemove(req.params.id,(err,docs) =>{
    if (!err) {
      res.send(docs)
    }
    else {
      console.log("Error while deleting newRecord record: "+ JSON.stringify(err,undefined,2));
    }
  })
})


module.exports = router
