require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
let cors = require('cors')
const app = express();

let Model = require('./model/userSchema')

mongoose.connect(process.env.DB_URL);

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(cors())
app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

app.post('/register', async(req, res) => {
    // Validation using schema
    let values = new Model({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
        date: req.body.date
    })
    try{
        let result = await values.save()
        console.log(result)
        res.json(result)
    }
    catch(e){
        res.json({
            message: "Please enter valid details"
        })
    }
})

app.get('/getData', async(req, res) => {
    try{
        let result = await Model.find()
        res.json({
            status: 'success',
            data: result
        })
    }
    catch(e){
        res.json({
            status: 'failed',
            data: e
        })
    }
})

app.get('/getById/:id', async(req, res) => {
    try{
        let result = await Model.findById(req.params.id)
        res.json({
            status: 'success',
            data: result
        })
    }
    catch(e){
        res.json({
            status: 'failed',
            data: e
        })
    }
})

app.patch('/update/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        let result = await Model.findByIdAndUpdate(id, updatedData, options)
        res.json({
            status: 'success',
            data: result
        })
    }
    catch(e){
        res.json({
            status: 'failed',
            data: e
        })
    }
})

app.delete('/delete/:id', async(req, res) => {
    try{
        const id = req.params.id;

        let result = await Model.findByIdAndDelete(id)
        res.json({
            status: 'success',
            data: 'Data deleted successfully !'
        })
    }
    catch(e){
        res.json({
            status: 'failed',
            data: e
        })
    }
})