import { useState, useEffect } from 'react'
import './css/question.css'
import ButtonQuestion from '../components/UI/buttons/ButtonQuestion'
import { nanoid } from 'nanoid'
import QuestionItems from '../components/QuestionItem'
import Spinner from '../components/UI/spinner/Spinner'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useIntercept'
import Shuffle from '../components/Shuffle'
import ButtonExit from '../components/UI/buttons/ButtonExit'

export default function Question() {

    const $axios = useAxiosPrivate()
    const [ questions, setQuestions ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [ show, setShow ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ restart, setRestart ] = useState(0)
    const { auth, setAuth } = useAuth()
    const [ game, setGame ] = useState(auth.games)

    useEffect( () => { 
        async function fetchQuestions() {
            try{
            const questions = await $axios.get("/questions/")
            const newQuestions = []
            const preQuestions = questions.data
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
                    id: preQuestions[i].id,
                    text: preQuestions[i].question,
                    answers: Shuffle(answers),
                    chosenAnswer: ''
                })}
            setQuestions(newQuestions)
            setIsLoading(!isLoading)
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchQuestions()
    }, [ restart ])
    useEffect(()=>{
        fetchScore()
    },[game])
    function selectAnswer(select, questId) {
        setQuestions(pre => pre.map(q => (q.id === questId) ? {...q, chosenAnswer: select} : q))
    }   
    function showAnswers() {
        setShow(pre => !pre)
        questions.forEach(q=>(q.answer === q.chosenAnswer) ? setTotal(pre => pre +1): setTotal(pre=> pre))
        setGame(pre=> pre+1)
    }
    async function fetchScore() {
        setAuth(pre=>{return{...pre,score:pre.score +total, games:game}})
        try{
            const scoreRefresh = await $axios.patch(`users/${auth.id}`, {        
                score: auth.score + total,
                games: auth.games + 1
            })
        } catch(err) {
            console.log(err.message)
        }}

    function restartGame() {
        setShow(false)
        setQuestions([])
        setIsLoading(!isLoading)
        setRestart(r => r + 1)
        setTotal(0)
    }
    if (isLoading) {
        return <Spinner message="...Is loading..."/>
    }
    return (
        <div className='questScreenEl'>
            <Navbar />
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
                    <ButtonQuestion show={show} showAnswers={showAnswers} restart={restartGame}/>
                    <ButtonExit />
                </div>
            </div>
        </div>
    )
}