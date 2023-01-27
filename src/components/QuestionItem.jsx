import React from 'react'

const QuestionItems = ({value, change}) => {

    function AnswerEl ({answers}){
        
        const styles = {
            backgroundColor: answers.isHold ? "red" : "#DBDEF0"
        }
        
        return (
            <p className="question-item"
                onClick={() => {console.log(answers.id)}}
                style={styles}
            >{answers.value}</p>
        )
    }

  return (
    <div >
        <h1>{value.text}</h1>
        <div className="answ-el">
            {value.answers.map(pre => <AnswerEl
            key={pre.id}
            answers = {pre}
            />)}
        </div>
    </div>
  )
}

export default QuestionItems
