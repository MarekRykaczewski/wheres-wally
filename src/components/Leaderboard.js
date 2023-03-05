import { useEffect, useState } from "react"
import { getDocs, collection, query, where, limit, orderBy } from "firebase/firestore"
import { db } from "../config/firebase"

export const Leaderboard = (props) => {

    const [scoresList, setScoresList] = useState([])

    useEffect(() => {
        const scoresListCollectionRef = collection(db, "leaderboard")
        const getScoresList = async () => {
            try {
                const q = query(scoresListCollectionRef, orderBy("score"), limit(10))
                const data = await getDocs(q)
                const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                filteredData.sort(({score:a}, {score:b}) => a-b)
                setScoresList(filteredData)
            } catch (err) {
                console.error(err)
            }
        }
        getScoresList()
    }, [])

    const leaderboardElements = scoresList.map((scoreEntry, index) => (
        <tr key={scoreEntry.id}>
            <td> {index+1} </td>
            <td className="leaderboard-name-cell"> {scoreEntry.name} </td>
            <td className="leaderboard-name-cell"> {scoreEntry.level} </td>
            <td className="leaderboard-score-cell"> {scoreEntry.score}</td>
        </tr>
    ))

    return (
        <div id="leaderboard-main">
            <table id="leaderboard">
            <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Level</th>
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