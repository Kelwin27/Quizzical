import React from "react";
import {Link} from "react-router-dom"

export default function ButtonInput() {

    return (
        <Link to='./question' className='btn-InEl'>
            Start quiz
        </Link>
    )
}