import React from 'react'

const QuestionItem = (props) => {

    function answerEl (props){
        return (
            <p className="question-item">{props.value}</p>
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
