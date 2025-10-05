const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//Post router to add a new person
router.post('/',async (req,res)=>{
   try{
     const data = req.body; //Assuming body contains all required fields
    
    //Create a new Person document using the Mongosse model
    const newPerson = new Person(data);

    const response = await newPerson.save();      
    console.log('data saved');
    res.status(201).json(response); // Return the created document in the response with status 201 Created  
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//Get method to get the Menu Items 
router.get('/',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log(data);
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType; // Extract the work type form the URL parameter
        if(workType=='chef' || workType=='waiter' || workType=='manager'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body; // Extract the id from the URL parameter

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new : true,
            runValidators : true
        });

        if(!response){
            return res.status(404).json({error: 'Person not founf '});
        }

        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId); 

    if (!response) {
      return res.status(404).json({ error: 'Person not found' }); 
    }

    console.log('Data deleted');
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;