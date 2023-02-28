export const Nav = (props) => {
    return (
        <nav className="nav">
            <h1 className="nav--title"> Where's Wally </h1>
            <div className="auth">
            {props.username && <span className="auth--username"> Welcome, {props.username} </span>}
            {props.profilePicUrl && <img className="auth--img" alt="Profile" src={props.profilePicUrl}></img>}
            {!props.username && <button className="auth--button" onClick={props.signInWithGoogle}>Sign in</button>}
            <button className="auth--button" onClick={props.logOut}>Sign out</button>
            </div>
        </nav>
    )
}