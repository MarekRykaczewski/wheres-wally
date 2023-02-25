export const ContextMenu = (props) => {

    const contextMenuElements = Object.keys(props.clientCurrentLevelData.characters).map(character => (
        <div key={character} onClick={() => props.handleCharacterClick(character, props.x, props.y, props.currentLevel)} className="context-menu--item">{character}</div>
    ))

    console.log(contextMenuElements)

    return (
        <div style={{top: `${props.y}px`, left: `${props.x}px`}} id="context-menu">
            {contextMenuElements}
        </div>
    )
}
