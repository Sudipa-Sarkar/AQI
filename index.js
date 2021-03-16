const { request, response } = require('express');
const express = require('express');
const app1 = express();
const fetch = require('node-fetch');
require('dotenv').config()
const port = process.env.PORT || 3000;
app1.listen(port, () => console.log('listening at '+port+''));
app1.use(express.static('public'));

//console.log(process.env);

//app1.get('/abc', async (request, response) =>{
    app1.get('/abc/:latlon', async (request, response) =>{
    //console.log(request.params);
    //console.log('hi');
    const latlon = request.params.latlon.split(',');
   // console.log(latlon[0]);
    const lati = latlon[0];
    const longi = latlon[1];
    //console.log(lat)
    const api_key =process.env.API_KEY;
    console.log(api_key);
    const api_url='https://api.openweathermap.org/data/2.5/air_pollution?lat='+lati+'&lon='+longi+'&appid='+api_key+'';
    const fetch_response =await fetch(api_url);
    const data1 = await fetch_response.json();
    response.json(data1);
});