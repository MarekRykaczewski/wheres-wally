import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "../config/firebase"

export const Leaderboard = (props) => {

    const [scoresList, setScoresList] = useState([])

    useEffect(() => {
        const scoresListCollectionRef = collection(db, "leaderboard")
        const getScoresList = async () => {
            try {
                const data = await getDocs(scoresListCollectionRef)
                const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                filteredData.sort(({score:a}, {score:b}) => a-b)
                setScoresList(filteredData)
            } catch (err) {
                console.error(err)
            }
        }
        getScoresList()
    }, [])

    const leaderboardElements = scoresList.map((scoreEntry) => (
        <tr key={scoreEntry.id}>
            <td className="leaderboard-name-cell"> {scoreEntry.name} </td>
            <td className="leaderboard-score-cell"> {scoreEntry.score}</td>
        </tr>
    ))

    return (
        <div id="leaderboard-main">
            <table id="leaderboard">
            <thead>
            <tr>
                <th>Name</th>
                <th>Score (seconds)</th>
            </tr>
            </thead>
            <tbody>
            {leaderboardElements}
            </tbody>
            </table>
        </div>
    )
}