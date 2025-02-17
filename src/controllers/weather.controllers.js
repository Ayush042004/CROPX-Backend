import { weatherData } from "../utils/stormglass.js"

export const weatherKnowledge = async(req,res)=>{
    
    const { lat, lon } = req.body;
    console.log(lat,"  ",lon)

    const data = await weatherData(lat,lon);
    console.log(data);
    return res.json(
        {data:data}
    )
}
