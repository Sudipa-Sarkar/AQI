const { request, response } = require('express');
const express = require('express');
const app1 = express();
const fetch = require('node-fetch');
const df = require('dialogflow-fulfillment')

require('dotenv').config()
const port = process.env.PORT || 3000;
app1.listen(port, () => console.log('listening at '+port+''));
app1.use(express.static('public'));

//console.log(process.env);

app1.post("/webhook",express.json(),(req,res)=>{
   const agent=new df.WebhookClient({
       request:req,
       response:res
   });
   const getData=async(agent)=>{
       var cityVal=agent.parameters.city;
      // dataType:'json';
       
       let url='https://open.mapquestapi.com/geocoding/v1/address?key=JB69ZJ0bqgZxmfFggnHV4NAAL7a5RMGQ&location='+cityVal+'&format=json';
       const response=await fetch(url);
       const data= await response.json();
       const arraydata=[data];
       const lat=arraydata[0].results[0].locations[0].latLng.lat;
       const lon=arraydata[0].results[0].locations[0].latLng.lng;
       const api_key =process.env.API_KEY;
       let url2=`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;
       const response1=await fetch(url2);
       const data1=await response1.json();
       const arrdata1=[data1];
       const a=arrdata1[0].list[0].main.aqi
       const p=["Carbon dioxide","Nitric oxide","Nitrogen dioxide","Ozone","Sulfur dioxide","Particulate matter 2","Particulate matter 10","Ammonia"];
          if(a==1){
           agent.add(`The air quality in ${cityVal} is Good having components `);
           var jsonA=arrdata1[0].list[0].components;
           var jsonP=JSON.parse(JSON.stringify(jsonA));
           var i=0;
           

           for(key in jsonP){
               
                   agent.add(p[i]+" is "+jsonP[key]);
                   i=i+1;
               

           }
          }
          else if(a==2){
              agent.add(`The air quality in ${cityVal} is Fair having components`);
              var jsonA=arrdata1[0].list[0].components;
              var jsonP=JSON.parse(JSON.stringify(jsonA));
              var i=0;
              
  
           
                  for(key in jsonP){
                      agent.add(p[i]+" is "+jsonP[key]);
                      i=i+1;
                  }
  
              
          }
          else if(a==3){
            agent.add(`The air quality in ${cityVal} is Moderate having components`);
            var jsonA=arrdata1[0].list[0].components;
            var jsonP=JSON.parse(JSON.stringify(jsonA));
            var i=0;
            

            for(key in jsonP){
           
                    agent.add(p[i]+" is "+jsonP[key]);
                    i=i+1;
                

            }
          }
          else if(a==4){
           agent.add(`The air quality in ${cityVal} is Poor having components`);
           var jsonA=arrdata1[0].list[0].components;
           var jsonP=JSON.parse(JSON.stringify(jsonA));
           var i=0;
           

           for(key in jsonP){
               
                   agent.add(p[i]+" is "+jsonP[key]);
                   i=i+1;
               

           }
          }
          else if(a==5){
           agent.add(`The air quality in ${cityVal} is Very Poor having components`);
           var jsonA=arrdata1[0].list[0].components;
           var jsonP=JSON.parse(JSON.stringify(jsonA));
           var i=0;

           for(key in jsonP){
           
                   agent.add(p[i]+" is "+jsonP[key]);
                   i=i+1;
               

           }
          }
          else{
     // agent.add(`The air quality in ${cityVal} having  components ${JSON.stringify(arrdata1[0].list[0].components)}`);
          agent.add(`The air quality in ${cityVal} having components`);
          var jsonA=arrdata1[0].list[0].components;
          var jsonP=JSON.parse(JSON.stringify(jsonA));
          var i=0;
          

          for(key in jsonP){
       
                  agent.add(p[i]+" is "+jsonP[key]);
                  i=i+1;
              

          }
          }
          





       };
   
       
   
   
   intentMap=new Map();
   intentMap.set("Air Quality Index in City",getData);
   agent.handleRequest(intentMap);
   
});
 
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