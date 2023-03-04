import { Link } from "react-router-dom";

export const Home = (props) => {

    const levelItems = props.levels.map(level => (
      <div  key={level.id}> 
      <Link className="home--level-preview" to={`/level/${level.id}`}>
      <span className="home--level-title"> Level {level.id}</span>
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