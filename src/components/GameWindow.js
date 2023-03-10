import { ContextMenu } from "./ContextMenu"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { SubmitModal } from "./SubmitModal";
import { Details } from "./Details";
import { Toast } from "./Toast"

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
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        props.resetClientLevelsData()
        setOpenModal(false)
        setRunning(true)
        setSubmitted(false)
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

    const handleContextMenu = (event) => {
        event.preventDefault()
        const imageX = Math.round(
            (event.nativeEvent.offsetX / event.nativeEvent.target.offsetWidth) * 100)
            const imageY = Math.round(
            (event.nativeEvent.offsetY / event.nativeEvent.target.offsetHeight) * 100)
        const { pageX, pageY } = event
        setContextMenu({ show: true, x: pageX, y: pageY, imgX: imageX, imgY: imageY })
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
        setSubmitted(false)
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
            }
        }
    }

    window.onpopstate = () => {
        navigate("/");
      }


    return (
        <div className='main'>
            {submitted === true && <Toast mainMessage={"Success"} subMessage={"You have submitted your score!"}/>}
            {openModal && <SubmitModal submitted={submitted} setSubmitted={setSubmitted} currentLevel={+id} goToNextLevel={goToNextLevel} triggerSubmitToast={() => props.triggerSubmitToast()} username={props.username} score={time} closeModal={() => closeModal() }/>}
            <Details time={time} currentLevelData={currentLevelData}/>
            <div id="game-window-main">
            <img 
            onContextMenu={contextMenuClose} 
            onClick={(event) => handleContextMenu(event)} 
            id="game-window" 
            alt="game" 
            src={`../level_${id}.jpg`}
            />
            {contextMenu.show && 
            <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            imgX={contextMenu.imgX}
            imgY={contextMenu.imgY}
            clientCurrentLevelData={currentLevelData}
            serverLevelsData={props.serverLevelsData}
            handleCharacterClick={props.handleCharacterClick}
            currentLevel={id}
            />}
            </div>
        </div>

    )
}