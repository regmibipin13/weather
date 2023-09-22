require('dotenv').config()

const port = process.env.SERVER_PORT

const express = require('express');
const axios = require('axios');

const app = express()
// Serving the static assets
app.use(express.json())
app.use(express.static(__dirname+"/assets/"))



app.get('/',(req, res) => {
    res.sendFile(__dirname+"/index.html")
})
app.post('/weather',(req, res) => {
    const api = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_APP_KEY}&q=${req.body.lat},${req.body.lng}`
    axios.get(api).then(response => {res.json({location:response.data.location, weather:response.data.current})}).catch((error) => {console.log(error)})
})



app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})


