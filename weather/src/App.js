import React, {useState} from 'react';

function App() {
  const [input, setInput] = useState("")
  const [data, setData] = useState({})
  function changeHandler(e) {
    setInput(e.target.value)
  }
  function submitHandler(e) {
    e.preventDefault()
    console.log("hey")
    //setData somehow
    setInput("")
  }
  return (
    <div className="App">
        <h1>Weather App</h1>

        <form onSubmit={submitHandler}>
          <input value={input} type="text" placeholder="Enter city name" onChange={changeHandler}/>
          <button>Submit</button>
        </form>
    </div>
  );
}

export default App;
