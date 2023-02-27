import { addDoc, collection } from "firebase/firestore"
import { db } from "../config/firebase"

export const SubmitModal = (props) => {

    const leaderboardCollectionRef = collection(db, "leaderboard")

    const addEntry = async () => {
        await addDoc(leaderboardCollectionRef, {name: "test_user", score: props.score})
    }

    return (
        <div className="modal-background">
            <div className="modal-container">
                <button className="modal-close" onClick={() => props.closeModal()}>X</button>
                <div className="title">
                    <h1>Would you like to submit your score?</h1>
                </div>
                <div className="body">
                    <button className="modal-button">Cancel</button>
                    <button onClick={addEntry} className="modal-button">Continue</button>
                </div>
            </div>

        </div>
    )
}
