import React from 'react'
import './question.css'
import blob from "../images/blob2.png"
import blob_blue from "../images/blob_blue2.png"
import ButtonQuestion from '../components/UI/ButtonQuestion'
import RouteQuestions from '../API/Route'
import QuestionItems from '../components/QuestionItem'


export default function Question() {

    const [questions, setQuestions] = React.useState([])

    React.useEffect( () => { 
        async function fetchQuestions() {
            const questions = await RouteQuestions.getAll()
            setQuestions(questions)
        }
        fetchQuestions()
    }, [])

    return (
        <div className="allQ">
            <img src={blob} className="blob1" />
            <div className="textQ">
                {questions.map(item => <QuestionItems
                key={item.id}
                value={item}
                change={setQuestions}
                />)}
            </div>
            <ButtonQuestion>Check answers</ButtonQuestion>
            <img src={blob_blue} className="blob2" />
        </div>
    )
}