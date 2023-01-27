const express = require('express');
const router = express.Router();
let tasks=require('../tasks');

router.get('/',(req,res)=>{
  try {
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
});

router.post('/',(req,res)=>{
  try {
    const {message}=req.body;
    tasks.push({id:tasks.length+1,message,isDone:false});
    // tasks.push({
    //   ...req.body,
    //   id:tasks.length+1,
    //   isDone:false
    // });
    res.status(201).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(400).json({message:'No task given'});
  }
});

router.patch('/:id',(req,res)=>{
  try {
    const {id}=req.params;  //return object of key:string val:string
    const {message,isDone}=req.body;

    tasks=tasks.map((task)=>{
      if(task.id===Number(id)){
        return {
          ...task,
          message: message??task.message,
          isDone: isDone??task.isDone
        };
      }
      return task;
    });
    res.status(200).json(tasks);

  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Server Error'});
  }

});

router.delete('/:id',(req,res)=>{
  try {
    const {id}=req.params;
    tasks=tasks.filter((task)=>{
      return task.id!==Number(id);
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:'Server Error'});
  }
  
});
module.exports = router;