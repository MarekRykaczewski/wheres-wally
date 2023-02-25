export const ContextMenu = (props) => {

    console.log(props.clientCurrentLevelData)
    console.log(props.clientCurrentLevelData.charactersFound)

    const contextMenuElements = Object.keys(props.clientCurrentLevelData.charactersFound).map(character => (
        <div key={character} onClick={() => props.handleCharacterClick(character, props.x, props.y, props.currentLevel)} className="context-menu--item">{character}</div>
    ))

    console.log(contextMenuElements)

    return (
        <div style={{top: `${props.y}px`, left: `${props.x}px`}} id="context-menu">
            {/* <div onClick={() => props.handleCharacterClick("wally", props.x, props.y, props.currentLevel)} className="context-menu--item">Wally</div> */}
            {contextMenuElements}
        </div>
    )
}
