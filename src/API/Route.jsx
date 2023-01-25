import React from "react";
import axios from "axios";

export default function RouteQuestions() {
    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple")
        .then(response => setQuestions(response.data.results))

}, [])
    return questions
}