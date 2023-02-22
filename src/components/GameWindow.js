import level1 from "../img/level_1.jpg"
import level2 from "../img/level_2.jpg"
import { ContextMenu } from "./ContextMenu"
import { useState } from "react"
import { useParams } from "react-router-dom";


export const GameWindow = (props) => {

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

    return (
        <div>
            <img 
            onClick={contextMenuClose} 
            onContextMenu={handleContextMenu} 
            id="game-window" 
            alt="game" 
            src={level1} 
            />
            {contextMenu.show && 
            <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            />}
        </div>

    )
}