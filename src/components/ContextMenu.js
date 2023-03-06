export const ContextMenu = (props) => {

    const contextMenuElements = Object.keys(props.clientCurrentLevelData.characters).map(character => (
        <div key={character} onClick={() => props.handleCharacterClick(character, props.imgX, props.imgY, props.currentLevel)} className="context-menu--item">{character.toUpperCase()}</div>
    ))

    return (
        <div style={{top: `${props.y}px`, left: `${props.x}px`}} id="context-menu">
            {contextMenuElements}
        </div>
    )
}
