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

export default function SignUp() {
    const history = useHistory()
    if (localStorage.getItem('username')) {
        history.push('/dashboard')
    }
    const [User, setUser] = useState();
    const [Password, setPassword] = useState();
    const [PasswordAgain, setPasswordAgain] = useState();
    const [Email, setEmail] = useState();
    const [Phone, setPhone] = useState();
    const [msg, setMsg] = useState()
    const [msg_color, setMsg_color] = useState()
    const [open, setOpen] = useState(false);
    const [btn_msg, setbtn_msg] = useState('SIGN UP')

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
        if (Password != PasswordAgain) {
            setMsg_color("error");
            setMsg("Password didn't match");
            setOpen(true);
        }
        else {
            setbtn_msg('Please Wait...');
            var bodyFormData = new FormData();
            bodyFormData.append("username", User);

            axios({
                method: "post",
                url: "https://akib-server.herokuapp.com/get_data",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    let user_data = response.data;
                    console.log(user_data.status);
                    if (user_data.status == "ok") {
                        setMsg_color("error");
                        setMsg("Username Alredy Exist");
                        setOpen(true);
                        setbtn_msg('SIGN UP');
                    }
                    else {
                        var signUpFormData = new FormData();
                        signUpFormData.append("user", User);
                        signUpFormData.append("password", CryptoJS.MD5(Password).toString());
                        signUpFormData.append("email", CryptoJS.AES.encrypt(Email, "SE332").toString());
                        signUpFormData.append("phone", CryptoJS.AES.encrypt(Phone, "SE332").toString());

                        axios({
                            method: "post",
                            url: "https://akib-server.herokuapp.com/sign_up",
                            data: signUpFormData,
                            headers: { "Content-Type": "multipart/form-data" },
                        })
                            .then(function (res) {
                                if (res.data.status == "ok") {
                                    setMsg_color("success");
                                    setMsg("Welcome " + User);
                                    setOpen(true);
                                    localStorage.setItem("username", User)
                                    history.push({
                                        pathname: '/dashboard'
                                    });
                                }
                                else {
                                    setMsg_color("error");
                                    setMsg("Something wrong");
                                    setOpen(true);
                                    console.log(res)
                                }
                                setbtn_msg('SIGN UP');
                            })
                            .catch(function (res) {
                                //handle error
                                console.log(res);
                                setMsg_color("error");
                                setMsg("Something wrong");
                                setOpen(true);
                                setbtn_msg('SIGN UP');
                            });
                    }
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                    setMsg_color("error");
                    setMsg("Something wrong");
                    setOpen(true);
                    setbtn_msg('SIGN UP');
                });
        }
        e.preventDefault();
    }
    return (
        <div align="center" className='container'>
            <div style={{ padding: "80px 400px" }}>
                <h2>Sign Up</h2>
                <form onSubmit={check_login} method="post">
                    <input className='form-control' placeholder='Username' type="text" onChange={(e) => { setUser(e.target.value) }} required /><br />
                    <input className='form-control' placeholder='Password' type="password" onChange={(e) => { setPassword(e.target.value) }} required /><br />
                    <input className='form-control' placeholder='Re-enter Password' type="password" onChange={(e) => { setPasswordAgain(e.target.value) }} required /><br />
                    <input className='form-control' placeholder='Email' type="email" onChange={(e) => { setEmail(e.target.value) }} required /><br />
                    <input className='form-control' placeholder='Phone Number' type="number" onChange={(e) => { setPhone(e.target.value) }} required /><br />
                    <input className='btn btn-primary form-control' value={btn_msg} type="submit" disabled={btn_msg == 'SIGN UP' ? false : true} /><br />
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
