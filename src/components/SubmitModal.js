import { addDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase"

export const SubmitModal = (props) => {

    const leaderboardCollectionRef = collection(db, "leaderboard")

    const addEntry = async () => {
        if (props.username || props.submitted === false) {
            await addDoc(leaderboardCollectionRef, {level: props.currentLevel, name: props.username, score: +props.score})
            props.setSubmitted(true)
        } else {
            return
        }
    }

    const greyedOutButton = {
        backgroundColor: (!props.username && "grey")
    }

    return (
        <div className="modal-background">
            <div className="modal-container">
                <div className="title">
                    <h1>Would you like to submit your score?</h1>
                </div>
                <div className="body">
                    <span> Your score: {props.score} seconds!</span>
                    <button onClick={() => props.closeModal()} className="modal-button">Cancel</button>
                    {props.submitted === false && <button style={greyedOutButton} onClick={addEntry} className="modal-button">Continue</button>}
                    {props.submitted === true && <button onClick={props.goToNextLevel} className="modal-button"> Next Level </button>}
                </div>
                <div className="login-warning">
                {!props.username && "You must be logged in to do this!" }
                </div>
            </div>

        </div>
    )
}
