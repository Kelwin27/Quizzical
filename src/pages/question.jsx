import React from 'react'
import './question.css'
import ButtonQuestion from '../components/UI/buttons/ButtonQuestion'
import RouteQuestions from '../API/Route'
import QuestionItems from '../components/QuestionItem'
import Spinner from '../components/UI/spinner/Spinner'


export default function Question() {

    const [questions, setQuestions] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [show, setShow] = React.useState(false)
    const [restart, setRestart] = React.useState(0)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect( () => { 
        async function fetchQuestions() {
            const questions = await RouteQuestions.getAll()
            setQuestions(questions)
            setIsLoading(!isLoading)
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
        setIsLoading(!isLoading)
        setTotal(0)
        setRestart(r => r + 1)
    }
    if (isLoading) {
        return <Spinner message="...Is loading..."/>
    }
    return (
        <div className="allQ">
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
        </div>
    )
}