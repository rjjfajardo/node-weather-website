const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const request = require('request')
const geocode = require('./utils/geocode')



//console.log(__dirname)

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewPath);

hbs.registerPartials(partialPath)

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name:'RJ Fajardo'
    })
})
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'ABOUT',
        name: 'RJ Fajardo'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'HELP',
        name: 'RJ Fajardo'
    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         chanceofRain: '1%',
//         temperature: -14,
//         humidity: 45
//     })
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Provide an addressss'
        })
    }else{

        geocode(req.query.address, (error, data) => { 
            
            if(error){
                return res.send({error})
            }else{
                forecast(data.lat, data.long, (error, forecastData) => {
                    if(error){
                       return res.send({ error })
                    }                  
                    res.send({lat: data.lat, long: data.long, loc: data.loc, forecast: forecastData})
                    
                        })   
        }
        })
    }
        })
           
    



app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Provide search information'
        })
    }
    //     res.send({
    //     products: []
    //  })
})

app.get('*' , (req, res) => {
    res.render('404', {
        errorMessage: 404
    })
})





app.listen(3000, () => {
    console.log('Listening to port 3000!')
})
