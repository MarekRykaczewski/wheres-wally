export const ContextMenu = (props) => {

    const handleCharacterClick = (character) => {
        const clientCoordinates = {x: props.x, y: props.y}
        const { x, y } = props.serverLevelsData[0].characters[character].coordinates
        const serverCoordinates = {x, y}
        console.log("client click")
        console.log(clientCoordinates)
        console.log("server loc")
        console.log(serverCoordinates)
        if (isNear(clientCoordinates.x, serverCoordinates.x) && isNear(clientCoordinates.y, serverCoordinates.y)) {
            console.log("hit")
        } else {
            console.log("miss")
        }
    }

    const isNear = (a, b) => {
        if (a < b+5) {
            return true
        } else {
            return false
        }
    }



    // a = 10, b = 1
    // 10 > 6? True
    // a = 1, b = 10
    // 1 > 15? False

    return (
        <div style={{top: `${props.y}px`, left: `${props.x}px`}} id="context-menu">
            <div onClick={() => handleCharacterClick("wally")} className="context-menu--item">Wally</div>
        </div>
    )
}
