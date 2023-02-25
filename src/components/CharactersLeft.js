export const CharactersLeft = (props) => {

    const characterImages = Object.keys(props.clientCurrentLevelData.characters).map(character => (
        <div className="character-container">
            <img className="character-icon" alt="character" key={character} src={props.clientCurrentLevelData.characters[character].url}></img>
            {props.clientCurrentLevelData.characters[character].found === true && <img key={character} className="character-tick" alt="tick" src="../tick.png"></img>}
        </div>
    ))

    return (
        <div className="characters">
            <h1> Find these folks! </h1>
            {characterImages}
        </div>
    )
}
