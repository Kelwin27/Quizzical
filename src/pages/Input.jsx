import React from 'react'
import './css/Input.css'
import ButtonInput from "../components/UI/buttons/ButtonInput"
import Navbar from "../components/Navbar"

export default function Input() {
    return (
        <div className="all">
            <Navbar className="navbarEl" />
            <div className="text">
                <h1>Игрушка</h1>
                <p>Чтобы продолжить, зарегестрируйся</p>
                <ButtonInput />
            </div>
        </div>
    )
}