window.addEventListener('load', ()=>{
    //Logic to read the coordinates
    let apiKey='yLCMCtvQuJhsSIDNzv9ALMSG78jtdf7I';
    let geoPositionApiUrl="http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
    let lat,long;
    let geoLocationResponse={};
    //let country,locationKey,timeZone,locationName;
    navigator.geolocation.getCurrentPosition((position)=>{
        //console.log(position);
        lat=position['coords']['latitude'];
        long=position['coords']['longitude'];
        console.log(lat+" "+long);
        let geopositionApiUrl=`${geoPositionApiUrl}?apikey=${apiKey}&q=${lat},${long}`;
        axios.get(geopositionApiUrl).then((response)=>{
        console.log(response);
        geoLocationResponse['country']=response.data.Country.EnglishName;
        geoLocationResponse['locationKey']=response.data.Key;
        geoLocationResponse['timeZone']=response.data.TimeZone;
        geoLocationResponse['locationName']=response.data.LocalizedName;
       // console.log(geoLocationResponse['locationKey'],apiKey,geoLocationResponse);
        getWeatherData(geoLocationResponse['locationKey'],apiKey,geoLocationResponse);

        });
    })
})
    let getWeatherData=(locationKey, apiKey, LocationInformation)=>{
    let weatherData={};
    let forecastsUrl=`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}`
    
    axios.get(forecastsUrl).then((res)=>{
        console.log(res);
        weatherData['today']=new Date(res.data.DailyForecasts[0].Date);
        weatherData['day']=res.data.DailyForecasts[0].Day;
        weatherData['night']=res.data.DailyForecasts[0].Night;
        weatherData['temperature']=res.data.DailyForecasts[0].Temperature;
        console.log(weatherData);
        console.log(LocationInformation);
        returnId("today").textContent=weatherData['today'].getDate()+"/"+(weatherData['today'].getMonth()+1)+"/"+ weatherData['today'].getFullYear();
        returnId("location").textContent=LocationInformation['locationName']+","+LocationInformation['country']
        returnId("day-title").textContent=weatherData.day.IconPhrase;
        returnId("night-title").textContent=weatherData.night.IconPhrase;
        let dayImage=returnId("day-image");
        weatherData.day.Icon <10 ?dayImage.setAttribute("src",`https://developer.accuweather.com/sites/default/files/0${weatherData.day.Icon}-s.png`):dayImage.setAttribute("src",`https://developer.accuweather.com/sites/default/files/${weatherData.day.Icon}-s.png`)
        let nightImage=returnId("night-image");
        weatherData.night.Icon <10 ?nightImage.setAttribute("src",`https://developer.accuweather.com/sites/default/files/0${weatherData.night.Icon}-s.png`):nightImage.setAttribute("src",`https://developer.accuweather.com/sites/default/files/${weatherData.night.Icon}-s.png`)
        returnId('max-temp').textContent = "Max Temperature:"+farToCelConverter(weatherData.temperature.Maximum.Value)+"C";returnId('min-temp').textContent = "Min Temperature:"+farToCelConverter(weatherData.temperature.Minimum.Value)+"C",console.log(farToCelConverter(weatherData.temperature.Maximum.Value));
        console.log(farToCelConverter(weatherData.temperature.Maximum.Value));
        console.log(farToCelConverter(weatherData.temperature.Minimum.Value));
        
    })
}

function farToCelConverter(temperature) {
    return Math.round(0.5555*(temperature-32));
    
}

function returnId(id) {
    return document.getElementById(id)
    
}



