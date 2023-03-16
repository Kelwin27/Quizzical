import classes from "./button.module.css"
import { useNavigate } from 'react-router-dom'

function ButtonExit() {

    const navigate = useNavigate()
    function clearData() {
        navigate('/')
    }
    return (
        <button className={classes.myButton} onClick={clearData} style={{cursor:"pointer"}}> Покинуть игру </button>
    )}

export default ButtonExit
