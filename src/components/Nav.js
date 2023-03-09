import { Link } from "react-router-dom"

export const Nav = (props) => {
    return (
        <nav className="nav">
            <Link className="nav--title" to={"/"}>
            <h1> Where's Wally </h1>
            </Link>
            <Link id="home-navigation-link" to={"/leaderboard"}>
            <div className="nav--leaderboard-button">
                Leaderboard
            </div>
            </Link>
            <div className="auth">
            {props.username && <span className="auth--username"> Welcome, {props.username} </span>}
            {props.profilePicUrl && <img className="auth--img" alt="Profile" src={props.profilePicUrl}></img>}
            {!props.username && <button className="auth--button" onClick={props.signInWithGoogle}>Sign in</button>}
            <button className="auth--button" onClick={props.logOut}>Sign out</button>
            </div>
        </nav>
    )
}