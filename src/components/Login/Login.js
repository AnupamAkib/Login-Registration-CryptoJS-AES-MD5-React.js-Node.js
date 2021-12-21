import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CryptoJS from 'crypto-js';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
    const history = useHistory()
    if (localStorage.getItem('username')) {
        history.push('/dashboard')
    }
    const [User, setUser] = useState();
    const [Password, setPassword] = useState();
    const [msg, setMsg] = useState()
    const [msg_color, setMsg_color] = useState()
    const [open, setOpen] = useState(false);
    const [btn_msg, setbtn_msg] = useState('LOGIN')
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const check_login = (e) => {
        setbtn_msg('Please Wait...');

        var bodyFormData = new FormData();
        bodyFormData.append("username", User)

        axios({
            method: "post",
            url: "https://akib-server.herokuapp.com/get_data",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success

                let user_data = response.data;
                console.log(user_data.status);
                if (user_data.status == "ok") {
                    if (user_data.data.password == CryptoJS.MD5(Password).toString()) {
                        setMsg_color("success");
                        setMsg("Successfully Logged In");
                        setOpen(true);
                        localStorage.setItem("username", user_data.data.user)
                        history.push({
                            pathname: '/dashboard'
                        });
                    }
                    else {
                        setMsg_color("error");
                        setMsg("Incorrect Username or Password");
                        setOpen(true);
                    }
                }
                else {
                    setMsg_color("error");
                    setMsg("Incorrect Username or Password");
                    setOpen(true);
                }
                setbtn_msg('LOGIN');
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                setMsg_color("error");
                setMsg("Something wrong");
                setOpen(true);
                setbtn_msg('LOGIN');
            });

        e.preventDefault();
    }

    return (
        <div align="center" className='container'>
            <div style={{ margin: "80px 420px", background: "#f0f0f0", padding: '35px' }}>
                <h2>Login</h2>
                <form onSubmit={check_login} method="post">
                    <input className='form-control' placeholder='Username' type="text" onChange={(e) => { setUser(e.target.value) }} required /><br />
                    <input className='form-control' placeholder='Password' type="password" onChange={(e) => { setPassword(e.target.value) }} required /><br />
                    <input className='btn btn-primary form-control' value={btn_msg} type="submit" disabled={btn_msg == 'LOGIN' ? false : true} /><br />
                </form>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={msg_color} sx={{ width: '100%' }}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    )
}
