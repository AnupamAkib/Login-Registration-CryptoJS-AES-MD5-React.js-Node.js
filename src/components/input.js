import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import logo from "../components/codeforces.png"

export default function Input() {
    const [cfHandle, setcfHandle] = useState('');
    const [foundFlag, setFoundFlag] = useState(false);
    const [email, setEmail] = useState('')
    const [picture, setPicture] = useState('')
    const [org, setOrg] = useState('')
    const [rank, setRank] = useState('')
    const [rating, setRating] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [maxRating, set_maxRating] = useState('')
    const [hndl, set_hndl] = useState('')


    let history = useHistory()
    const handleChange = (e) => {
        setcfHandle(e.target.value);
        fetch('https://codeforces.com/api/user.info?handles=' + e.target.value)
            .then(response => response.json())
            .then((jsonData) => {

                setEmail(jsonData.result[0].email);
                setPicture(jsonData.result[0].avatar);
                setRank(jsonData.result[0].rank);
                setOrg(jsonData.result[0].organization);
                setRating(jsonData.result[0].rating);

                setFirstName(jsonData.result[0].firstName);
                setLastName(jsonData.result[0].lastName);
                setCity(jsonData.result[0].city);
                setCountry(jsonData.result[0].country);

                set_maxRating(jsonData.result[0].maxRating)
                set_hndl(jsonData.result[0].handle)

                setFoundFlag(true);
            })
            .catch((error) => {
                setFoundFlag(false);
                //console.error(error)
                console.log("not found")
            })
    }
    const getHandle = () => {
        //alert(cfHandle);
        history.push({
            pathname: '/profile',
            state: { foundFlag, cfHandle, firstName, lastName, picture, email, rank, rating, org, city, country, hndl, maxRating } // your data array of objects
        })
    }
    localStorage.clear();
    return (
        < div className="container" >
            <div className="cardBody">
                <title>Search CF Handle</title>
                <img src={logo} width="250" /><br /><br />
                <form onSubmit={getHandle}>
                    <input type="text" idName="handle" className="form-control" placeholder="Enter your CodeForces handle" value={cfHandle} onChange={handleChange} />
                    <font color={foundFlag ? 'green' : 'red'}>{foundFlag ? 'Profile found' : cfHandle.length ? 'Profile not found' : 'Enter a handle'}</font><br /><br />
                    <button onClick={getHandle} className="btn btn-primary btn-lg" disabled={foundFlag == true ? '' : 'true'}>Show Fetched Data</button>
                </form>
            </div>
            <img src={picture} width="0" /><br />
        </div >
    )
}



