import { useState } from 'react'
import { $axios } from '../API'
import useAuth from '../hooks/useAuth'

function EditQuestion({name, id, show, updateQuestList, setUpdateQuestList}) {
    const { auth } = useAuth()
    const [ newQuestion, setNewQuestion ] = useState()
    const [ corAnswer, setCorAnswer ] = useState()
    const [ incorAnswer1, setIncorAnswer1 ] = useState('')
    const [ incorAnswer2, setIncorAnswer2 ] = useState('')
    const [ incorAnswer3, setIncorAnswer3 ] = useState('')
    const [ difficult, setDifficult ] = useState()
    const [ category, setCategory ] = useState()
    const [ categoryIn, setCategoryIn ] = useState(['Общее','История','Биология','География'])
    const userQuestSubmit = async (e) => {
        e.preventDefault();
        const incorrect = [incorAnswer1, incorAnswer2, incorAnswer3];
    
        try{
            const response = await $axios.put(`/questions/${id}`, {
            "question" : newQuestion,
            "correct_answer" : corAnswer,
            "incorrect_answers" : incorrect,
            "difficulty": category,
            "category": difficult,
            "owner_id": auth.id
            })
            setNewQuestion('')
            setCorAnswer('')
            setIncorAnswer1('')
            setIncorAnswer2('')
            setIncorAnswer3('')
            setCategory('')
            setDifficult('')
            setUpdateQuestList(!updateQuestList)
        }
        catch{
            if (!err?.response) {
            setErrMsg('No Server Response');
            }
        }
        finally{
            $('input[name="radio"]').prop('checked', false);
        }
    }
    return (
    <form className={show ? 'questionRedaxForm' : 'hide'} onSubmit={userQuestSubmit}>
        <h4>Изменить вопрос: {name}</h4>
        <label>Вопрос: </label>
        <input type= "text"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
            autoComplete="off"
            />
        <label>Правильный ответ: </label>
        <input type="text"
            onChange={(e)=>setCorAnswer(e.target.value)}
            value={corAnswer}
            autoComplete="off"
            />
        <label>Варианты неправильных ответов: </label>
        <div className='incorrectInput'>
        <input type="text"
            onChange={(e)=>setIncorAnswer1(e.target.value)}
            value={incorAnswer1}
            autoComplete="off"
            />
        <input type="text"
            onChange={(e)=>setIncorAnswer2(e.target.value)}
            value={incorAnswer2}
            autoComplete="off"
            />
        <input type="text"
            onChange={(e)=>setIncorAnswer3(e.target.value)}
            value={incorAnswer3}
            autoComplete="off"
            />
        </div>
        <div className='categoryEl'>
        <label for="category">Выберите категорию:</label>
        <select id="category" name="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">--Выберите категорию--</option>
            {categoryIn.map(pre=> <option value={pre}>{pre}</option> )}
        </select>
        </div>
        <div>
        <p>Выберите сложность вопроса:</p>
        <fieldset>
            <input type="radio" 
            id="contactChoice1"
            name="contact"
            onChange={(e)=>setDifficult(e.target.value)} 
            value="easy"
            checked={"easy"===difficult}
            />
            <label for="contactChoice1">Легкий</label>

            <input type="radio" 
            id="contactChoice2"
            name="contact"
            onChange={(e)=>setDifficult(e.target.value)}  
            value="midle"
            checked={"midle"===difficult}
            />
            <label for="contactChoice2">Средний</label>

            <input type="radio" 
            id="contactChoice3"
            name="contact"
            onChange={(e)=>setDifficult(e.target.value)}  
            value="hard"
            checked={"hard"===difficult}
            />
            <label for="contactChoice3">Тяжелый</label>
        </fieldset>
        </div>
        <button className='userButtonEl'>Изменить</button>
    </form>
    )
}

export default EditQuestion