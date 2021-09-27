import React from 'react'

export default function ContestCard(props) {
    let ratingChange = props.NewRating - props.OldRating;
    let color = "gray";
    if (ratingChange > 0) {
        ratingChange = '+' + ratingChange;
        color = "green";
    }
    let hr = "https://codeforces.com/contest/" + props.id;
    return (
        <tr>
            <td>{props.id}</td>
            <td><a href={hr} style={{ textDecoration: "none", fontWeight: "bold", color: "#0068de" }}>{props.round}</a></td>
            <td>{props.rank}</td>
            <td><b><font color={color}>{ratingChange}</font></b></td>
        </tr>
    )
}
