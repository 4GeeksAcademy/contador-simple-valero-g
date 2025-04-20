import React from "react";
import { useEffect, useState, useRef } from "react";

const SecondsCounter = ({startTime=0}) =>{

    const [time, setTime] = useState(0);
    const idInterval = useRef(0);
    const [alertValue, setAlertValue] = useState(0);
    const [alertText, setAlertText] = useState("No hay alerta programada");
    const isAlert = useRef(false);
    const isBack = useRef(false);
    const [timeBack, setTimeBack]= useState(10);
    const [timeBackText, setTimeBackText] = useState("Cuenta atrás inactiva");

    useEffect( ()=>{
        setTime(parseInt(startTime));
        idInterval.current = setInterval(()=>setTime( prev => prev+1), 1000);
        console.log("IdInterval al cargar:" + idInterval.current);
        return () => clearInterval(idInterval.current);
    }, []);

    function getDigit(number,digit){
        return Math.floor(number/Math.pow(10,digit)) % 10
    }

    function handlePause () {
        clearInterval(idInterval.current);
        idInterval.current=0;
        console.log(idInterval);
    }
    function handleStop  () {
        isBack.current=false;
        setTimeBackText("Cuenta atrás inactiva");
        clearInterval(idInterval.current);
        idInterval.current=0;
        setTime(0);
        
    }

    function handlePlay () {
        console.log(idInterval);
        if (idInterval.current==0 && isBack.current==false){
            idInterval.current = setInterval(()=>setTime( prev => prev+1), 1000);
        }
        else if (idInterval.current==0 && isBack.current==true){
            idInterval.current = setInterval(()=>setTime( prev => prev-1), 1000);
        }
    }
    
    function handleAlarm (value) {
        setAlertText("Alerta programada para el segundo " + value);
        isAlert.current=true;
    }

    useEffect(()=>{
        if(time !=0 && time == alertValue && isAlert.current==true ){
            alert("El contador ha alcanzado el valor " + alertValue);
            setAlertText("No hay alerta programada");
            isAlert.current =false;
            setAlertValue(0);
        }
        if(time == 0 && isBack.current==true){
            clearInterval(idInterval.current);
            idInterval.current=0;
            alert("Cuenta atrás terminada!!!");
            isBack.current = false;
            setTimeBackText("Cuenta atrás inactiva");
        }
    }, [time]);

    const handleTimeBack = (countdownTime) =>{
        clearInterval(idInterval.current);
        setTime(countdownTime);
        isBack.current= true;
        setTimeBackText("Cuenta atrás activa");;
        idInterval.current = setInterval(()=>setTime( prev => prev-1), 1000);
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className = "containerClock m-2">
                <div className = "digit">
                    <p><i className="fa-solid fa-clock"></i></p>
                </div>
                <div className = "digit">
                    <p>{getDigit(time,5)}</p>
                </div>
                <div className = "digit">
                    <p>{getDigit(time,4)}</p>
                </div>
                <div className = "digit">
                    <p>{getDigit(time,3)}</p>
                </div>
                <div className = "digit">
                    <p>{getDigit(time,2)}</p>
                </div>
                <div className = "digit">
                    <p>{getDigit(time,1)}</p>
                </div>
                <div className = "digit">
                    <p>{getDigit(time,0)}</p>
                </div>
            </div>
            <div className="buttons m-2 w-25">
                <button className = "Play btn btn-secondary m-1 w-10" onClick ={handlePlay} ><i className="fa-solid fa-play"></i></button><button className = "Pause m-1 btn btn-secondary" onClick={handlePause}><i className="fa-solid fa-pause"></i></button><button className = "Reinit m-1 btn btn-secondary" onClick={handleStop}><i className="fa-solid fa-stop"></i></button>
            </div>
            <div className="timeAlert m-1 w-25 p-1">
                <label>Introduce el tiempo para mostrar alerta: &nbsp; </label><input type ="number" max="999999" min="1" step="1" onChange={ (e) => setAlertValue(e.target.value)} value ={alertValue}></input><button className = "Pause m-1 btn btn-warning" onClick={() => handleAlarm(alertValue)}><i className="fa-solid fa-bell"></i></button>
                <p className="alarmText" style={(alertValue !=0 && isAlert.current) ? {color: "red"} : { color: "black"}}>{alertText}</p>
            </div>
            <div className="timeBack m-1 w-25 p-1">
                <label>Introduce el tiempo para hacer una cuenta atrás: &nbsp; </label><input type ="number" max="999999" min="1" step="1" onChange={ (e) => setTimeBack(e.target.value)} value ={timeBack}></input><button className = "Pause m-1 btn btn-danger" onClick={() => handleTimeBack(timeBack)}><i class="fa-solid fa-backward-step"></i></button>
                <p className="alarmText" style={isBack.current ? {color: "red"} : { color: "black"}}>{timeBackText}</p>
            </div>
        </div>

    );

}

export default SecondsCounter;