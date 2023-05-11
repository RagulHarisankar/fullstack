const express = require('express');
const mongoose = require('mongoose');
const app = express();

let Model = require('./model/userSchema')

mongoose.connect("mongodb://0.0.0.0:27017/api");

const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(express.json());

app.post('/register', async(req, res) => {
    let { name, email, password } = req.body
    let buff = new Buffer(password);
    let base64data = buff.toString('base64');
    const data = await Model.create({
        name: name,
        email: email,
        password: base64data
    })
    .then((success) => {
        res.json(success)
    })
    .catch((e) => {
        res.json({
            error: e.message
        })
    })
})

app.post('/login', async(req, res) => {
    let { name, email, password } = req.body
    try{
        const data = await Model.find();
        console.log(email);
        data.map((ele) => {
            let promise = new Promise((resolve, reject) => {
                if(ele.email === email){
                    let buff = new Buffer(password);
                    let base64data = buff.toString('base64');
                    if(ele.password === base64data){
                        resolve('Login success')
                    }
                }
                else{
                    reject('User not found')
                }
            })
            .then((success) => {
                res.send(success)
            })
            .catch(e => {
                res.send(e)
            }) 
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})