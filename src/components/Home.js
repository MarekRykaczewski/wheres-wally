import { Link } from "react-router-dom";

export const Home = (props) => {

    const getCharacterPreviews = (level) => {
        const characterPreviews = Object.keys(level.characters).map(character => (
            <img className="home--level-character" alt="character" src={`../${character}.png`}></img>
        ))
        return characterPreviews
    }

    const levelItems = props.levels.map(level => (
      <div className="home--level--container" key={level.id}> 
      <Link className="home--level-preview" to={`/level/${level.id}`}>
      <div className="home--level-characters">
      <span className="home--level-title"> Level {level.id}</span>
        {getCharacterPreviews(level)}
      </div>
      <img alt="level" className="home--level-preview--image" src={level.url}></img>
      </Link>
      </div>
    ))

    return (
        <main id="home">
            <div id="home-levels">
             {levelItems}
            </div>
        </main>
    )
}