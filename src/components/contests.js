import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ContestCard from './contestCard';

function Contests(props) {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('https://codeforces.com/api/user.rating?handle=' + props.handle)
            .then(res => {
                //console.log(res)
                setData(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log("not found")
                console.log(err)
            })
    }, [])
    let arr = []
    for (let i in data.result) {
        arr.push(<ContestCard key={data.result[i].contestId} id={data.result[i].contestId} round={data.result[i].contestName} OldRating={data.result[i].oldRating} NewRating={data.result[i].newRating} rank={data.result[i].rank} />)
    }
    arr.reverse();
    if (isLoading) {
        return (
            <div>
                <br />
                <div className="spinner-border text-primary"></div><br />
                Please Wait
            </div>
        )
    }
    else {
        if (!arr.length) {
            return (
                <div className="container">
                    <br />
                    <center><h1>User hasn't participated any contest yet</h1></center>
                </div >
            )
        }
        return (
            <div className="container">
                <table className="table table-hover table-striped">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>Round</th>
                            <th>Rank</th>
                            <th>Rating Change</th>
                        </tr>
                        {arr}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Contests
