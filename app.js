const express = require('express')
const {success, getUniqueId} = require('./helper')
const { Sequelize, DataTypes } = require('sequelize')
const morgan = require('morgan')
const bodyParse = require('body-parser')
const port = 3000
const app = express()
let parkings = require('./parking.json')
const ParkingModel = require('./src/models/parkings')

//Creer l'instance sequelize
const sequelize = new Sequelize( 'parkings' //Nom de la BD
    , 'root', // L'identifiant et par defaut le nom d'utilisateur est root
    '',  // Password de votre bd
    {
    host: 'localhost', // indique ou se trouve la base de donnees depuis votre machne
    dialect: 'mariadb',//Le nom du driver pour permettre a sequelize d'interagir avec BD
    dialectOptions: { // Permet d'arreter l'affichage d'avertissement dans console plutard 
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

  //tester si la connexion a reussie ou pas : on utilise authentication de notre instance sequelize
  sequelize.authenticate()
  .then(_ => console.log(' La connexion a la base de données a bien été etablie'))
  .catch(error => console.error(`Impossible de se connecter a la base de données ${error}`))

  const Parking = ParkingModel(sequelize, DataTypes)
  
  sequelize.sync({force: true})
  .then(_ => console.log('La base de données a bien été synchroniser'))


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

app.put('/parkings/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const parkingUpdate = {...req.body, ...{id: id}}
    parkings = parkings.map(parking => {
        return parking.id === id ? parkingUpdate: parking
    })
    const message = "Modifiée"
    res.json(success(message, parkingUpdate))
})

app.delete('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const parkingDeleted = parkings.find(parking => parking.id === id)
    parkings = parkings.filter(parking => parking.id !== id)
    const message = "Supprimé"
    res.json(success(message, parkingDeleted))
})

app.listen(port, ()=>{
    console.log('Le serveur a bien été demarré')
})