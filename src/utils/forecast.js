const request = require('request')


const forecast = (lat, long, callback) => {

    const url ='http://api.weatherstack.com/current?access_key=1ceba44c921790f69c7ffaf4c785c093&query='+ lat +',' + long +'&units=m'

    request( { url: url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to connecto to location services!', undefined)
        }else if(response.body.error){
            // callback('Wrong coordinates!', undefined)
            callback('Wrong coordinates', undefined)
        }
        else{
        callback(undefined, 'As of ' + response.body.location.localtime + ' It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain')
        
        }
    })
}


module.exports = forecast

