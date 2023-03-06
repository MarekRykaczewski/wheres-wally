import { useState } from "react";
import { CharactersLeft } from "./CharactersLeft";

export const Details = (props) => {

    const toggleDetails = (event) => {
        event.currentTarget.classList.toggle('details-active')
        setOpenDetails(!openDetails)
    }

    const [openDetails, setOpenDetails] = useState(false)
    
  return (
    <div className="game-window-side">
    <button onClick={toggleDetails} className="game-window-side-title">Details</button>
    {openDetails &&    
    <div className="game-window-side-container">
        <div >
            <div className="timer">
                <div className="timer-numbers">
                Time elapsed (s): {props.time}
            </div>
        </div>
            <CharactersLeft clientCurrentLevelData={props.currentLevelData}/>
        </div>
    </div>
        }
    </div>
  )
}
