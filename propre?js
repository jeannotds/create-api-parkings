const express = require('express')
const {success, getUniqueId} = require('./helper')
const morgan = require('morgan')
const bodyParse = require('body-parser')
const port = 3000
const app = express()
const parkings = require('./parking.json')

app
.use(morgan('dev'))
.use(bodyParse.json())

app.get('/parkings', (req, res)=>{
    const message = "reussie"
    res.status(200)
    res.json(success(message, parkings))
})

app.get('/parkings/:id', (req, res)=>{
    const id = getUniqueId(req.params.id)
    const parking = parkings.find(parking => parking.id === id)
    const message = "success request"
    res.send(success(message, parking))
})

app.post('/parkings', (req, res) => {
    const id = getUniqueId(parkings)
    const createParking = {...req.body, ...{id: id, created: new Date()}}
    parkings.push(createParking)
    const message = "Element cree"
    res.json(success(message, createParking))
})

app.listen(port, ()=>{
    console.log('Le serveur a bien été demarré')
})