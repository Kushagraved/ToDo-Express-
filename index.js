const express=require('express');
const app=express();

const port=8000;

//middleware
app.use(express.json());    //To get req.body



const route=require('./routes/route');



app.use('/api/tasks',route);



app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});

