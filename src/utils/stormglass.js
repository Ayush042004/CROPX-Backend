
export const weatherData = async(latitude,longitude)=>{

        console.log("hello");
        
        const lat = latitude;
        const lng = longitude;
        const params = 'airTemperature,pressure,currentSpeed,currentDirection,windSpeed,precipitation,windSpeed';


        const response = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
          headers: {
            'Authorization': '5a0df504-ed6a-11ef-b651-0242ac130003-5a0df57c-ed6a-11ef-b651-0242ac130003'
          }
        })
        const data = await response.json()
        console.log(data);
        
      return data.hours[0]
}
