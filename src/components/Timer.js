import { useEffect, useState } from 'react';

export const Timer = (props) => {

    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(true);

    useEffect(() => {
      let interval;
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        if (props.stopTimer === true) {
            setRunning(false)
        }
    }, [props.stopTimer])

    return (
    <div className="timer">
      <div className="timer-numbers">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="timer-buttons">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)}>Stop</button>
        <button onClick={() => setTime(0)}>Reset</button>       
      </div>
    </div>
    )
}
