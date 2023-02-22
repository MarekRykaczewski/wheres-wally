import { auth, googleProvider } from "../config/firebase"
import { signInWithPopup, signOut } from "firebase/auth"
import { useState } from "react"

export const Auth = () => {

    const [username, setUsername] = useState("")
    const [profilePicUrl, setProfilePicUrl] = useState("")

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const username = result.user.displayName
            const profilePicUrl = result.user.photoURL

            setUsername(username)
            setProfilePicUrl(profilePicUrl)
        })
    }

    const logOut = async () => {
        try {
            await signOut(auth)
            setUsername("")
            setProfilePicUrl("")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="auth">
            {username && <span className="auth--username"> Welcome, {username} </span>}
            {profilePicUrl && <img className="auth--img" alt="Profile" src={profilePicUrl}></img>}
            {!username && <button className="auth--button" onClick={signInWithGoogle}>Sign in</button>}
            <button className="auth--button" onClick={logOut}>Sign out</button>
        </div>
    )
}