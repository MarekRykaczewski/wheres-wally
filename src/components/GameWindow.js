import { ContextMenu } from "./ContextMenu"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { CharactersLeft } from "./CharactersLeft"
import { SubmitModal } from "./SubmitModal";
import { Toast } from "./Toast";

export const GameWindow = (props) => {

    const initialContextMenu = { show: false, x: 0, y: 0 }
    const { id } = useParams()
    const currentLevelData = props.clientLevelsData.find(x => x.id == id)
    const characterArr = Object.keys(currentLevelData.characters)
    const navigate = useNavigate()

    const [openModal, setOpenModal] = useState(false)
    const [contextMenu, setContextMenu ] = useState(initialContextMenu)
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(true);

    useEffect(() => {
        props.resetClientLevelsData()
        setOpenModal(false)
        setRunning(true)
    }, [])

    useEffect(() => {
        let interval;
        if (running) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
          }, 1000);
        } else if (!running) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [running]);

    const closeModal = () => {
        setOpenModal(false)
    }

    const handleContextMenu = event => {
        event.preventDefault()
        console.log("clicked")
        const { pageX, pageY } = event
        setContextMenu({ show: true, x: pageX, y: pageY })
    }

    const contextMenuClose = () => setContextMenu(initialContextMenu)

    const goToNextLevel = () => {
        navigate(`/level/${+id + 1}`)
        resetLevel()
    }

    const resetLevel = () => {
        setOpenModal(false)
        setTime(0)
        setRunning(true)
        contextMenuClose()
    }

    if (running === true) {
        let counter = 0
        for (let i = 0; i < characterArr.length; i++) {
            if (currentLevelData.characters[characterArr[i]].found) {
                counter++
            }
            if (counter === characterArr.length) {
                setRunning(true)
                if (openModal === false) {
                    setRunning(false)
                    setOpenModal(true)
                }
                console.log("you won")
            }
        }
    }

    window.onpopstate = () => {
        navigate("/");
      }


    return (
        <div id="game-window-main">
            {openModal && <SubmitModal currentLevel={+id} goToNextLevel={goToNextLevel} username={props.username} score={time} closeModal={() => closeModal() }/>}
            <div className="timer">
                <div className="timer-numbers">
                Time elapsed (s): {time}
            </div>
            {/* <div className="timer-buttons">
                <button onClick={() => setRunning(true)}>Start</button>
                <button onClick={() => setRunning(false)}>Stop</button>
                <button onClick={() => setTime(0)}>Reset</button>       
            </div> */}
            </div>
            <CharactersLeft clientCurrentLevelData={currentLevelData}/>
            <img 
            onContextMenu={contextMenuClose} 
            onClick={handleContextMenu} 
            id="game-window" 
            alt="game" 
            src={`../level_${id}.jpg`}
            />
            {contextMenu.show && 
            <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            clientCurrentLevelData={currentLevelData}
            serverLevelsData={props.serverLevelsData}
            handleCharacterClick={props.handleCharacterClick}
            currentLevel={id}
            />}
        </div>

    )
}