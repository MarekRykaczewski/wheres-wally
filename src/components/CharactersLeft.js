export const CharactersLeft = (props) => {

    const characterImages = Object.keys(props.clientCurrentLevelData.characters).map(character => (
        <div key={character} className="character-container">
            <img className="character-icon" alt="character" key={character} src={props.clientCurrentLevelData.characters[character].url}></img>
            {props.clientCurrentLevelData.characters[character].found === true && <img className="character-tick" alt="tick" src="../tick.png"></img>}
        </div>
    ))

    return (
        <div className="characters">
            <h3> Find these folks! </h3>
            <div className="characters-container">
            {characterImages}
            </div>
        </div>
    )
}
