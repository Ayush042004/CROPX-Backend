
export const weatherData = async(latitude,longitude)=>{

        console.log("hello");
        
        const lat = latitude;
        const lng = longitude;
        const params = 'airTemperature,pressure,currentSpeed,currentDirection,windSpeed,precipitation,windSpeed';


        const response = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
          headers: {
            'Authorization': 'b82c7c0a-ebad-11ef-bb67-0242ac130003-b82c7c6e-ebad-11ef-bb67-0242ac130003'
          }
        })
        const data = await response.json()
        console.log(data);
        
      return data.hours[0]
}