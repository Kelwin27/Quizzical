import React from 'react'
import './question.css'
import blob from "../images/blob2.png"
import blob_blue from "../images/blob_blue2.png"
import RouteQuestions from '../API/Route'
import {nanoid} from 'nanoid'
import QuestionItem from '../components/QuestionItem'


export default function Question() {
    
    const preQuestions = RouteQuestions()
    const questions = []

    for (let i = 0; i < preQuestions.length; i++) {
      
        const answ = [...preQuestions[i].incorrect_answers, preQuestions[i].correct_answer]
        const answers = []

        for (let i = 0; i < answ.length; i++){
            
            answers.push({
                value: answ[i],
                id: nanoid(),
                isHeld: false
            })
        }
        questions.push({
            answer: preQuestions[i].correct_answer,
            id: nanoid(),
            text: preQuestions[i].question,
            answers: answers
        })
    }

    return (
        <div className="allQ">
            <img src={blob} className="blob1" />
            <div className="textQ">
                {questions.map(item => <div key={item.id}>{QuestionItem(item)}</div>)}
            </div>
            <div>
                <button>Check answers</button>
            </div>
            <img src={blob_blue} className="blob2" />
        </div>
    )
}