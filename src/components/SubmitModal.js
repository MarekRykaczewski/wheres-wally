import { addDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase"

export const SubmitModal = (props) => {

    const leaderboardCollectionRef = collection(db, "leaderboard")

    const addEntry = async () => {
        if (props.username) {
            await addDoc(leaderboardCollectionRef, {name: props.username, score: props.score})
        } else {
            return
        }
    }

    const greyedOutButton = {
        backgroundColor: !props.username && "grey"
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
                    <button style={greyedOutButton} onClick={addEntry} className="modal-button">Continue</button>
                </div>
                <div className="login-warning">
                {!props.username && "You must be logged in to do this!" }
                </div>
            </div>

        </div>
    )
}
