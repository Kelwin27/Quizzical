import React from 'react'

const QuestionItems = ({value, change}) => {

    function AnswerEl ({answers, select, answer}){

        const [p, setP] = React.useState({backgroundColor:false,checked:false})
        const styles = {
            backgroundColor: p.backgroundColor ? "#D6DBF5" : "#F5F7FB"
        }

        const selectIt = () => {
            select(answers.value, answer)
            setP({
                backgroundColor: !p.backgroundColor, 
                checked: !p.checked
            })
        }
              
        return (
            <p className="question-item"
                onClick={() => {selectIt()}}
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
            select = {change}
            answer = {value.answer}
            />)}
        </div>
    </div>
  )
}

export default QuestionItems
