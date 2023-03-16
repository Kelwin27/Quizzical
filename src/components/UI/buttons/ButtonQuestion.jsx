import classes from "./button.module.css"

export default function ButtonQuestion({ show, restart, showAnswers }){
    return (
            <div>
                {(!show) 
                ?
                <button className={classes.myButton}
                        onClick = {showAnswers}
                        style={{cursor:"pointer"}}
                >
                    Проверить ответы
                </button>
                : 
                <button className={classes.myButton}
                    onClick = {restart}
                    style={{cursor:"pointer"}}
                    >
                    Сыграть еще раз
                </button>
                }
            </div>
    )
    
}