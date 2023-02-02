import React from 'react'
import './question.css'
import blob from "../images/blob2.png"
import blob_blue from "../images/blob_blue2.png"
import ButtonQuestion from '../components/UI/ButtonQuestion'
import RouteQuestions from '../API/Route'
import QuestionItems from '../components/QuestionItem'


export default function Question() {

    const [questions, setQuestions] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [show, setShow] = React.useState(false)
    const [restart, setRestart] = React.useState(0)

    React.useEffect( () => { 
        async function fetchQuestions() {
            const questions = await RouteQuestions.getAll()
            setQuestions(questions)
        }
        fetchQuestions()
    }, [restart])

    function showAnswers() {
        setShow(pre => !pre)

        questions.forEach(q=>(q.answer === q.chosenAnswer) ? setTotal(pre => pre +1): setTotal(pre=> pre))
    }
    
    function selectAnswer(select, questId) {

        setQuestions(pre => pre.map(q => (q.id === questId) ? {...q, chosenAnswer: select} : q))//
    }

    function restartGame() {
        setShow(false)
        setQuestions([])
        setTotal(0)
        setRestart(r => r + 1)
    }

    return (
        <div className="allQ">
            <img src={blob} className="blob1" />
            <div className="textQ">
                {questions.map(item => <QuestionItems
                key={item.id}
                value={item}
                change={selectAnswer}
                id={item.id}
                show={show}
                />)}
            </div>
            <div className="answerShow">
                {(show) && <h3> Ваши правильные ответы: {total} из {questions.length} </h3>}
                <ButtonQuestion show = {show} showAnswers={showAnswers} restart={restartGame} />
            </div>
            <img src={blob_blue} className="blob2" />
        </div>
    )
}