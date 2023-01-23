import React from 'react'
import './Input.css'
import blob from "../images/blob1.png"
import blob_blue from "../images/blob_blue2.png"

export default function Input() {
    return (
        <div className="all">
            <img src={blob} className="blob1" />
            <div className="text">
                <h1>Quizzical</h1>
                <p>Some description if needed</p>
                <button>Start quiz</button>
            </div>
            <img src={blob_blue} className="blob2" />
        </div>
    )
}