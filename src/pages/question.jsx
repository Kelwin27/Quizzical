import React from 'react'
import './question.css'
import blob from "../images/blob2.png"
import blob_blue from "../images/blob_blue2.png"
import FilterQuestions from '../components/FilterQuestions'
import QuestionItem from '../components/QuestionItem'


export default function Question() {
    
    const questions = FilterQuestions()

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