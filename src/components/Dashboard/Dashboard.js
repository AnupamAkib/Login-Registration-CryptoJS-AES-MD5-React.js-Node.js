import React from 'react'
import { useHistory } from "react-router-dom"

export default function Dashboard() {
    const history = useHistory()
    const user = localStorage.getItem('username');
    if (!user) {
        history.push('/login')
        alert("You must login first")
        return (
            <>
                login first
            </>
        )
    }
    const logout = () => {
        localStorage.clear();
        history.push('/login')
    }
    return (
        <div align='center' style={{ margin: '160px' }}>
            <h2>Login Successful</h2><hr />
            <h1>Welcome <font color='green'>{localStorage.getItem('username')}</font> !!</h1><br />
            <button className='btn btn-primary' onClick={logout}>LOGOUT</button>
        </div >
    )
}
