export const ContextMenu = (props) => {

    return (
        <div style={{top: `${props.y}px`, left: `${props.x}px`}} id="context-menu">
            <div onClick={() => props.handleCharacterClick("wally", props.x, props.y, props.currentLevel)} className="context-menu--item">Wally</div>
        </div>
    )
}
