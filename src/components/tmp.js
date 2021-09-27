import React from 'react'
import { useState } from 'react'

export default function Tmp() {
    let a = '';
    localStorage.setItem("testJSON", "akib");
    localStorage.setItem("ck", "mir anupam hossain akib");
    localStorage.setItem("sss", "hoise");
    a = localStorage.getItem("testJSON");
    return (
        <div>
            {a}
        </div>
    )
}
