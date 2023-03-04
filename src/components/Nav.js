import { Link } from "react-router-dom"

export const Nav = (props) => {
    return (
        <nav className="nav">
            <Link id="home-navigation-link" to={"/"}>
            <h1 className="nav--title"> Where's Wally </h1>
            </Link>
            <div id="home-navigation">
            <Link id="home-navigation-link" to={"/leaderboard"}>
                Leaderboard
            </Link>
            </div>
            <div className="auth">
            {props.username && <span className="auth--username"> Welcome, {props.username} </span>}
            {props.profilePicUrl && <img className="auth--img" alt="Profile" src={props.profilePicUrl}></img>}
            {!props.username && <button className="auth--button" onClick={props.signInWithGoogle}>Sign in</button>}
            <button className="auth--button" onClick={props.logOut}>Sign out</button>
            </div>
        </nav>
    )
}