import { useEffect, useState } from "react"

export const ContextMenu = (props) => {

    return (
        <div style={{top: `${props.y}px`, left: `${props.x}px`}} id="context-menu">
            <div onClick={() => console.log(props.x, props.y)} className="context-menu--item">Wally</div>
        </div>
    )
}