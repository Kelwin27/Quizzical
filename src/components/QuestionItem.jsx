import React from 'react'

const QuestionItems = ({value, change, id, show}) => {

    function AnswerEl ({answers, select, answer, questId, chosenAnswer}){

        return (
            <p className={`question-item ${answers.value === chosenAnswer && !show ? 'selected' : ''}
            ${show && answers.value === answer ? 'correct' : ''}
            ${show && answers.value === chosenAnswer && answers.value !== answer ? 'incorrect' : ''}
            `}
                onClick={() => select(answers.value, questId)}
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
                    select = {change}
                    answer = {value.answer}
                    questId = {id}
                    chosenAnswer = {value.chosenAnswer}
                    />)}
        </div>
    </div>
  )
}

export default QuestionItems
