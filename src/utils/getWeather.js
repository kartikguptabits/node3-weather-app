const request = require('postman-request')

const getWeather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7a0db5bafcf756ee6343cce6a5b4e9e6&query=' + lat + ',' + long
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to reach the server. Please check your connection!', undefined)
        }else if (body.error){
            callback(body.error.info, undefined)
        }else if(!body.location.name){
            callback("Place Not Found", undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity,
                forecast: "Hello There. The current temperature is " + body.current.temperature + " Degrees and it feels like " + body.current.feelslike + " Degrees in " + body.location.name + "(" +body.location.region + " - " + body.location.country + "), Also the humidity is " + body.current.humidity + '%',
                place: body.location.name,
                region: body.location.region,
                country: body.location.country 
            })
        }
    })
}

module.exports = getWeather