const request = require('request')


const geocode = (address, callback) => {

    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +  '.json?&access_token=pk.eyJ1IjoicmpqZmFqYXJkbyIsImEiOiJja2wybDZvb2EwZTA4MzJtcmZna3N1bGdkIn0.WI2d7blQrApVrMtIIygBxg&limit=1'
    
    request( { url: URL, json:true }, (error, response) => {
        if(error){
           callback('Unable to connecto to location services!')
        }else if(response.body.features.length === 0){
           callback('No matching results!')
        }else{
            callback(undefined, {
                 lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                loc: response.body.features[0].place_name   
                
            })
        }
    })
}

module.exports = geocode
