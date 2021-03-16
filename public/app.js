
var input = document.querySelector('.input_text');
var button= document.querySelector('.submit');
//var place = document.getElementById("place");
//var is = document.getElementById("is");
//var words = document.querySelector('.words');
var Latitude = document.querySelector('.Latitude');
var Longitude = document.querySelector('.Longitude');
var co = document.querySelector('.co');
var nh3 = document.querySelector('.nh3');
var no = document.querySelector('.no');
var o3 = document.querySelector('.o3');
var pm2_5 = document.querySelector('.pm2_5');
var no2 = document.querySelector('.no2');
var pm10 = document.querySelector('.pm10');
var so2 = document.querySelector('.so2');
//const api_url1=
let lat,lon;
 const get_info = async(event ) =>
{
    event.preventDefault();
  const resp = await fetch('https://open.mapquestapi.com/geocoding/v1/address?key=JB69ZJ0bqgZxmfFggnHV4NAAL7a5RMGQ&location='+input.value+'');
  const data = await resp.json();
  const arraydata=[data];
  //console.log(arraydata);
   lat =arraydata[0].results[0].locations[0].latLng.lat;
   lon =arraydata[0].results[0].locations[0].latLng.lng;
  //console.log(lat);
 // console.log(lon);
  //Latitude.innerHTML="Latitude -"+Latit;
  //Longitude.innerHTML="Longitude -"+Longi
  const api_url = `abc/${lat},${lon}`;
 // const api_url = `aqi/${lat,lon}`;
 // const api_url = `/abc`;
   //const api_url = `/abc/${lat}`;
  const response = await fetch(api_url);
  const data1 = await response.json();
  //console.log(data1);
  const co_1=  data1.list[0].components.co;
  const nh3_1=  data1.list[0].components.nh3;
  const no_1=  data1.list[0].components.no;
  const no2_1=  data1.list[0].components.no2;
  const o3_1=  data1.list[0].components.o3;
  const pm2_5_1=  data1.list[0].components.pm2_5;
  const pm10_1=  data1.list[0].components.pm10;
  const so2_1=  data1.list[0].components.so2;
  //var str_compo = JSON.stringify(response[compo])
  //words.innerHTML="The Air Quality of";
  //is.innerHTML="is";
 // place.innerHTML="input";
 //document.write("The Air Quality of ");
 document.querySelector('.words').innerHTML="the Air Quality Index at "+ input.value + " is:";
  co.innerHTML="co -"+co_1;
  nh3.innerHTML="nh3 -"+nh3_1;
  no.innerHTML="no -"+no_1;
  no2.innerHTML="no2 -"+no2_1;
  o3.innerHTML="o3 -"+o3_1;
  pm2_5.innerHTML="pm2 -"+pm2_5_1;
  pm10.innerHTML="pm10 -"+pm10_1;
  so2.innerHTML="so2 -"+so2_1;
  //console.log(data1.list[0].components);
  //console.log(data1);
 //Latitude.innerHTML= "Latitude - "+Latit;
  //Longitude.innerHTML= "Longitude - "+Longi;
  //const resp1=await fetch(api_url1);
  //const data1 = await resp.json();
  //console.log(data1);
  //const Notwo = data1.list[0].main.components.no2;
  //NO2.innerHTML ="no2 - "+Notwo;
  //return fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=88d78b2888c39bf61bf2f25a79325cae')
  
}
button.addEventListener('click', get_info);













