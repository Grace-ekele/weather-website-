const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=4a154e52200fb530282a3ce09cd9245c&query=${latitude},${longitude}&units=f`
    
    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('unable to read forecast', undefined)
        } else if (body.error) {
               
                callback('Unable to find location', undefined);


        }else{

            const data = body.current?.weather_descriptions?.[0] + 
            '. it is currently ' + body.current?.temperature + 
            ' degrees out. it feels like ' + body.current?.feelslike +
            ' degrss out'

            callback(undefined,data)



        }
    })
}

module.exports = forecast