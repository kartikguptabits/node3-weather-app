const request = require('postman-request')


const fwdGeoCode = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?limit=1&access_token=pk.eyJ1Ijoia2FydGlrZXhzIiwiYSI6ImNrYWF4cTV4aTB6YmQycXFmc2hoNGsya3cifQ.OZWaNiGaqcIRvs5kr6CnUg'
    request({url, json:true}, (error, {body}) => {
        
        if (error) {
            callback('Unable to reach the server. Please check your connection!', undefined)
        } else if(!body.features[0]){
            callback('Place Not Found', undefined)
        } else {
            const latLong = {
                long: body.features[0].center[0], 
                lat: body.features[0].center[1],
                place: body.features[0].place_name
            }
            callback(undefined, latLong)
        }
        
    })
}

module.exports = fwdGeoCode
