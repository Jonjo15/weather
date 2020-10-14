import React, {useState, useEffect} from 'react';
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
  // const [background, setBackground] = useState("")
  function changeHandler(e) {
    setInput(e.target.value)
  }
  useEffect(() => {
    if (weather === "") {
      return
    }
    let str = 'https://api.giphy.com/v1/gifs/translate?api_key=JV0YX3JjmxHqi9SsHqRv2V80Bxms3vTt&s=' + weather;
    fetch(str, {mode: "cors"})
    .then(function(response) {
      return response.json()
    })
    .then(function(gif) {
      console.log(gif)
      document.body.style.backgroundImage = "url(" + gif.data.images.original.url + ")";
    })
  }, [weather])
 async function submitHandler(e) {
    e.preventDefault()
    console.log("hey")
    if (input === "") {
      return
    }
    await getWeatherData(input).catch(function(err) {showError()})
    //setData somehow
    setInput("")
  }
  function showError() {
    const span = document.querySelector(".error")
    span.textContent = "City not found, try again."
    setTimeout(() => {span.textContent = ""}, 1500)
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
        <div><button id="switch" onClick={handleUnits}>Switch to {celsius ? "°F" : "°C"}</button></div>
        
        <form onSubmit={submitHandler}>
          <input value={input} type="text" placeholder="Enter city name" onChange={changeHandler}/>
          <button>Submit</button>
        </form>
        <span className="error"></span>
        <Data celsius={celsius} name={name} country={country} temp={temp} wind={wind} pressure={pressure} feel={feel} weather={weather}/>
    </div>
  );
}

export default App;
