const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiZ3JhLWNlIiwiYSI6ImNtMDgwbWZmZTExdWsybHM0Zm1yOTcycjEifQ.uniCWC8opeqELG7VVwBxoA&limit=1';


    request({url, json: true}, (error,{body}) =>{
        if(error){
            callback('unable to connect to location service!', undefined)
        }else if (body.features.length === 0){
            callback('unalbe to find location. try another search.', undefined)
        }else{
            callback(undefined, {
            latitude : body.features[0].geometry.coordinates[1],
            longitude: body.features[0].geometry.coordinates[0],
            location : body.features[0].properties.full_address
            })
        }
    })
};


module.exports = geocode