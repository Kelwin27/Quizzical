import React from "react";
import axios from "axios";
import {nanoid} from 'nanoid'
import Shuffle from "../components/Shuffle.jsx"

export default class RouteQuestions {
    static async getAll (){

        const response = await axios.get("https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple")

        const preQuestions = response.data.results
        const newQuestions = []
    
        for (let i = 0; i < preQuestions.length; i++) {
    
        const answ = [...preQuestions[i].incorrect_answers, preQuestions[i].correct_answer]
        const answers = []
    
        for (let i = 0; i < answ.length; i++){
            
            answers.push({
                value: answ[i],
                id: nanoid(),
            })
        }
            newQuestions.push({
                answer: preQuestions[i].correct_answer,
                id: nanoid(),
                text: preQuestions[i].question,
                answers: Shuffle(answers),
                chosenAnswer: ''
            })}
            return newQuestions
        }
    }
