import React from 'react'

const QuestionItem = (props) => {

    function addAnswer(props){
        return console.log(props.id)
    }

    function answerEl (props){
        
        const styles = {
            backgroundColor: props.isHold ? "red" : "#DBDEF0"
        }
        
        return (
            <p className="question-item"
                onClick={()=>addAnswer(props)}
                style={styles}
            >{props.value}</p>
        )
    }

  return (
    <div >
        <h1>{props.text}</h1>
        <div className="answ-el">
            {props.answers.map(pre => <div key={pre.id}>{answerEl(pre)}</div>)}
        </div>
    </div>
  )
}

export default QuestionItem
