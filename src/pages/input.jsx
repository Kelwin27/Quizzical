import React from 'react'
import './Input.css'
import ButtonInput from "../components/UI/buttons/ButtonInput"
import blob from "../images/blob1.png"
import blob_blue from "../images/blob_blue1.png"

export default function Input() {
    return (
        <div className="all">
            <img src={blob} className="blob1" />
            <div className="text">
                <h1>Игрушка</h1>

                <p>Чтобы продолжить, зарегестрируйся</p>
                <ButtonInput />

            </div>
            <img src={blob_blue} className="blob2" />
        </div>
    )
}