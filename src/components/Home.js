import { Link } from "react-router-dom";

export const Home = (props) => {

    const levelItems = props.levels.map(level => (
      <div className="home--level-preview"  key={level.id}> 
      <img alt="level" className="home--level-preview--image" src={level.url}></img>
      <Link className="item" to={`/level/${level.id}`}>
      <span> Level {level.id}</span>
      </Link>
      </div>
    ))

    return (
        <main className="home">
            {levelItems}
        </main>
    )
}