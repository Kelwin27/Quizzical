import React from 'react';
import { Link } from "react-router-dom"
import classes from "./css/error.module.css"

const Error = () => {
    return (
        <div className={classes.errorEl}>
            <h1>
                Вы перешли на несуществующую страницу!
            </h1>
            <Link className={classes.link} to="/">Вернуться на сайт</Link>
        </div>
    );
};

export default Error;