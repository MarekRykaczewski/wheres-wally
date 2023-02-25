export const CharactersLeft = (props) => {

    const characterImages = Object.keys(props.clientCurrentLevelData.characters).map(character => (
        <div className="character-container">
            <img className="character-icon" alt="character" key={character} src={props.clientCurrentLevelData.characters[character].url}></img>
            {props.clientCurrentLevelData.characters[character].found === true && <img className="character-tick" alt="tick" src="../tick.png"></img>}
        </div>
    ))

    console.log(props.clientCurrentLevelData)

    const characterArr = Object.keys(props.clientCurrentLevelData.characters)
    let counter = 0

    for (let i = 0; i < characterArr.length; i++) {
        console.log(props.clientCurrentLevelData.characters[characterArr[i]].found)
        if (props.clientCurrentLevelData.characters[characterArr[i]].found) {
            counter++
        }
        if (counter === characterArr.length) {
            console.log("you won")
        }
    }

    return (
        <div className="characters">
            <h1> Find these folks! </h1>
            {characterImages}
        </div>
    )
}
