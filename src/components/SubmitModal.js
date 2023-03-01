import { addDoc, collection } from "firebase/firestore"
import { useEffect, useState } from "react";
import { db } from "../config/firebase"
import { Toast } from "./Toast";

export const SubmitModal = (props) => {

    useEffect(() => {
        setSubmitted(false)
    }, [])

    const [submitted, setSubmitted] = useState(false)

    const leaderboardCollectionRef = collection(db, "leaderboard")

    const addEntry = async () => {
        if (props.username || submitted === false) {
            await addDoc(leaderboardCollectionRef, {name: props.username, score: props.score})
            setSubmitted(true)
        } else {
            return
        }
    }

    const greyedOutButton = {
        backgroundColor: (!props.username && "grey")
    }

    return (
        <div className="modal-background">
            {submitted === true && <Toast mainMessage={"Success"} subMessage={"You have submitted your score!"}/>}
            <div className="modal-container">
                <div className="title">
                    <h1>Would you like to submit your score?</h1>
                </div>
                <div className="body">
                    <span> Your score: {props.score} seconds!</span>
                    <button onClick={() => props.closeModal()} className="modal-button">Cancel</button>
                    {submitted === false && <button style={greyedOutButton} onClick={addEntry} className="modal-button">Continue</button>}
                    {submitted === true && <button className="modal-button"> Next Level </button>}
                </div>
                <div className="login-warning">
                {!props.username && "You must be logged in to do this!" }
                </div>
            </div>

        </div>
    )
}
