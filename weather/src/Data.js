import React from "react"

function Data(props) {
    return (props.name === "" ? null: (<div className="weatherInfo">
        <p>{props.name}, {props.country}</p>
        <p>Temperature: {props.temp} {props.celsius ? "°C" : "°F"}</p>
        <p>Feels like {props.feel} {props.celsius ? "°C" : "°F"}</p>
        <p>Pressure: {props.pressure} hPa</p>
        <p>Weather: {props.weather}</p>
        <p>Wind: {props.wind} m/s</p>
    </div>))
}

export default Data