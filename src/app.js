const path = require ('path')
const express = require('express')
const hbs = require('hbs')

const getWeather = require('./utils/getWeather.js')
const fwdGeoCode = require ('./utils/geoCode.js')

const app = express()

// Define paths for Express Config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Kartik'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About', 
        name: 'Kartik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        name: 'Kartik', 
        message: 'I am here to help you'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.place) {
        return res.send({
            error: 'Place must be Provided'
        }) 
    }   
    fwdGeoCode(req.query.place, (error, {lat, long, place} = {}) => {
        if (error){
            return res.send({
                error: error
            }) 
        }
    
        getWeather (lat, long, (error, weatherResponse) => {
            if (error){
                return res.send({
                    error: error
                }) 
            }
            return res.send(weatherResponse) 
            
        })
        
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        }) 
    } 
    console.log(req.query)
    res.send({
    products: []
    })
    
    
})

app.get('/travel-site', (req, res) => {
    res.send('Travel Site')
})

app.get('/help/*', (req, res) => {
    res.render('404-error', {
        title: 'Help', 
        name: 'Kartik', 
        message: 'Helo Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404-error', {
        title: '404', 
        name: 'Kartik', 
        message: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})