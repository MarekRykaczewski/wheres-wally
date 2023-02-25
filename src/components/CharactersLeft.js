export const CharactersLeft = (props) => {

    const characterImages = Object.keys(props.clientCurrentLevelData.characters).map(character => (
        <img className="character--icon" alt="character" key={character} src={props.clientCurrentLevelData.characters[character].url}></img>
    ))

    return (
        <div className="characters">
            <h1> Find these folks! </h1>
            {characterImages}
        </div>
    )
}
