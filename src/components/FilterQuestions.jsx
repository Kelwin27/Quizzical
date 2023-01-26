import React from 'react'
import {nanoid} from 'nanoid'
import RouteQuestions from '../API/Route'

const FilterQuestions = () => {

    const preQuestions = RouteQuestions()
    const newQuestions = []

    for (let i = 0; i < preQuestions.length; i++) {

    const answ = [...preQuestions[i].incorrect_answers, preQuestions[i].correct_answer]
    const answers = []

    for (let i = 0; i < answ.length; i++){
        
        answers.push({
            value: answ[i],
            id: nanoid(),
            isHold: false
        })
    }
        newQuestions.push({
            answer: preQuestions[i].correct_answer,
            id: nanoid(),
            text: preQuestions[i].question,
            answers: answers
        })}
        return newQuestions
    }

export default FilterQuestions
