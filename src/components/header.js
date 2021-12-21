import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

function Header() {
    console.log(CryptoJS.MD5("akib").toString())
    console.log(CryptoJS.MD5("anupam").toString())
    console.log("\n\n")
    console.log(CryptoJS.AES.encrypt("mir anupam hossain", "mir").toString())
    //U2FsdGVkX1/grPtPT7uNC2ITzBDtognecMgVY5Klcyxc1e0+naFIZLztt0o9T/aU
    console.log(CryptoJS.AES.decrypt("U2FsdGVkX1/grPtPT7uNC2ITzBDtognecMgVY5Klcyxc1e0+naFIZLztt0o9T/aU", "mir").toString(CryptoJS.enc.Utf8))
    return (
        <div style={{ background: "#dedede", padding: "0px 0px 10px 0px" }}><center>
            <h3 className="header">Software Security (Sensitive data)</h3>
            <Link to="/login">Login</Link>  <Link to="/sign_up">Register</Link>  <Link to="/dashboard">Dashboard</Link>
        </center></div >
    );
}

export default Header;