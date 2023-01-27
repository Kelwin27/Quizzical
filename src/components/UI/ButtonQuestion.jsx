import React from "react";
import classes from "./button.module.css"

export default function ButtonQuestion(props){
    return (
        <div>
            <button className={classes.myButton}>
                {props.children}
            </button>
        </div>
    )
    
}