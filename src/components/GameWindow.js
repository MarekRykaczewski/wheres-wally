import level1 from "../img/level_1.jpg"
import { ContextMenu } from "./ContextMenu"
import { useState } from "react"


export const GameWindow = (props) => {

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

    return (
        <div>
            <img onContextMenu={handleContextMenu} id="game-window" alt="game" src={level1} />
            {contextMenu.show && 
            <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            />}
        </div>

    )
}