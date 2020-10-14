import React, {useState} from 'react';
import Data from "./Data"

function App() {
  const [input, setInput] = useState("")
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [feel, setFeel] = useState("")
  const [temp, setTemp] = useState("")
  const [weather, setWeather] = useState("")
  const [pressure, setPressure] = useState("")
  const [wind, setWind] = useState("")
  const [celsius, setCelsius] = useState(true);

  function changeHandler(e) {
    setInput(e.target.value)
  }
 
 async function submitHandler(e) {
    e.preventDefault()
    console.log("hey")
    if (input === "") {
      return
    }
    await getWeatherData(input)
    //setData somehow
    setInput("")
  }
  function handleUnits(e) {
    let prevCelsius = celsius
    setCelsius(!celsius)
    if (prevCelsius) {
      setFeel(Math.round(feel * 1.8 + 32))
      setTemp(Math.round(temp * 1.8 + 32))
    }
    else {
      setFeel(Math.round((feel- 32) / 1.8))
      setTemp(Math.round((temp- 32) / 1.8))
    }
  }
  async function getWeatherData(input) {
    let str = "http://api.openweathermap.org/data/2.5/weather?q=" + input + "&APPID=a373875a7380357c6b23579cc12167ed"
    let response = await fetch(str, {mode: "cors"})
    let data = await response.json()
    
    setWeather(data.weather[0].main)
    setPressure(data.main.pressure)
    setWind(data.wind.speed)
    setName(data.name)
    setCountry(data.sys.country)
    if (celsius) {
      setFeel(Math.round(data.main.feels_like -273.15))
      setTemp(Math.round(data.main.temp -273.15))
    }
    else {
      setFeel(Math.round((data.main.feels_like -273.15)* 1.8 + 32))
      setTemp(Math.round((data.main.temp - 273.15)* 1.8 + 32))
    }
    
  }
  return (
    <div className="App">
        <h1>Weather App</h1>
        <button onClick={handleUnits}>Switch to {celsius ? "°F" : "°C"}</button>
        <form onSubmit={submitHandler}>
          <input value={input} type="text" placeholder="Enter city name" onChange={changeHandler}/>
          <button>Submit</button>
        </form>
        <Data celsius={celsius} name={name} country={country} temp={temp} wind={wind} pressure={pressure} feel={feel} weather={weather}/>
    </div>
  );
}

export default App;
