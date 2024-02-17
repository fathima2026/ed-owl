import './App.css';
import Main from './components/Main';
import React, {useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {loadFull} from "tsparticles";
import "./App.css";
import particlesOptions from "./particles.json";
function App() {
  const [init, setInit] = useState(false);

    useEffect(() => {
        if (init) {
            return;
        }

        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
  return (

    <div className="App">
      {init && <Particles options={particlesOptions}/>} 
      <Main/>
    </div>
    
  );
}

export default App;
