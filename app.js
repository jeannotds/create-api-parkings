// Integrer ou inclure ou encore importer et ses fonctions dans notre code la librerie express js
// "test": "echo \"Error: no test specified\" && exit 1"

const express = require('express')
// import express from 'express'

// la constante est l'instaciation de notre objet express qui va contenir notre serveur ainsi que les 
// methodes que nous aurons besoinspour le faire fonctonner
const app = express()

const port = 8080

// jusque la le serveur est preparer mais pas lancé

// Pour que notre serveur puisse être à l’écoute il faut maintenant utiliser la méthode listen 
// fournie dans app et lui spécifier un port.

// En lançant la commande node index.js dans votre terminal, vous verrez qu’il affichera que votre 
// serveur est à l’écoute. Cela veut dire que tout fonctionne bien. S’il y a une erreur, vous aurez 
// droit à un message d’erreur sur votre terminal.
const parkings = require('./parking.json')

console.log(parkings)


app.get('/parkings', (req, res)=>{
    res.status(200).json(parkings)
    console.log('Il a eu une requete')
})

app.listen(port, ()=>{
    console.log('Serveur est demarré')
})