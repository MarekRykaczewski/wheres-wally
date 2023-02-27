import { ContextMenu } from "./ContextMenu"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { CharactersLeft } from "./CharactersLeft"
import { Timer } from "./Timer";
import { SubmitModal } from "./SubmitModal";

export const GameWindow = (props) => {

    const [openModal, setOpenModal] = useState(false)

    const closeModal = () => {
        setOpenModal(false)
    }

    useEffect(() => {
        props.resetClientLevelsData()
    }, [])

    const { id } = useParams()

    const initialContextMenu = {
        show: false,
        x: 0,
        y: 0,
    }

    const [contextMenu, setContextMenu ] = useState(initialContextMenu)

    const handleContextMenu = event => {
        event.preventDefault()
        console.log("clicked")
        const { pageX, pageY } = event
        setContextMenu({ show: true, x: pageX, y: pageY })
    }

    const contextMenuClose = () => setContextMenu(initialContextMenu)

    const currentLevelData = props.clientLevelsData.find(x => x.id == id)
    
    const characterArr = Object.keys(currentLevelData.characters)
    let counter = 0
    let stopTimer = false

    if (stopTimer === false) {
        for (let i = 0; i < characterArr.length; i++) {
            console.log(currentLevelData.characters[characterArr[i]].found)
            if (currentLevelData.characters[characterArr[i]].found) {
                counter++
            }
            if (counter === characterArr.length) {
                stopTimer = true
                if (openModal === false) {
                    setOpenModal(true)
                }
                console.log("you won")
            }
        }
    }


    return (
        <div id="game-window-main">
            {openModal && <SubmitModal closeModal={() => closeModal()}/>}
            <Timer stopTimer={stopTimer}/>
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