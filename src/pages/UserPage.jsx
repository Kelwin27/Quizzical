import { useEffect, useState, useRef } from 'react';
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/user.css'
import RegNavbar from '../components/RegNavbar';
import Spinner from '../components/UI/spinner/Spinner';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useIntercept';
import EddQuestion from '../components/EddQuestion';
import EditQuestion from '../components/EditQuestion';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function UserPage() {
  const $axios = useAxiosPrivate()
  const { auth, setAuth } = useAuth()

  const [ questionNames, setQuestionNames ] = useState([])
  const [ oneQuestion, setOneQuestion ] = useState('')
  const [ limit, setLimit ] = useState(5)
  const [ page, setPage ] = useState(0)
  const [ totalPages, setTotalPages ] = useState(0)
  const [ pageNumbers, setPageNumbers ] = useState([])

  const userRef = useRef();
  const errRef = useRef();

  const [ user, setUser ] = useState('');
  const [ validName, setValidName ] = useState(false);
  const [ userFocus, setUserFocus ] = useState(false);

  const [ oldPwd, setOldPwd ] = useState('');
  const [ newPwd, setNewPwd ] = useState('');
  const [ validPwd, setValidPwd ] = useState(false);
  const [ pwdFocus, setPwdFocus ] = useState(false);

  const [ userImage, setUserImage ] = useState(null)
  const [ fileSize, setFileSize ] = useState(0)
  const [ fileType, setFileType ] = useState('')
  const [ validFile, setValidFile ] = useState(true)
  const [ imageFocus, setImageFocus ] = useState(false)

  const [ deleteQuest, setDeleteQuest ] = useState(false)
  const [ showAddQuestion, setShowAddQuestion ] = useState(false)

  const [ questionId, setQuestionId ] = useState()
  const [ showEditQuestion, setShowEditQuestion ] = useState(false)

  const [ errMsg, setErrMsg ] = useState('');

  useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
  setValidName(USER_REGEX.test(user));
}, [user])

useEffect(() => {
  setValidPwd(PWD_REGEX.test(newPwd));
}, [newPwd])

useEffect(() => {
  if (userImage){
      setValidFile(false)}
  if (fileSize <= 2*1024*1024 && (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg')){
      setValidFile(true)}
}, [userImage])

  useEffect (() => {
    async function getQuestions(){
      try{
        const response = await $axios.get(`/questions/${auth.id}`,{
          params:{
            limit:limit,
            skip: page * limit
            }
          })
        setQuestionNames(response?.data?.questions)
        setTotalPages(response?.data?.title)
      }
      catch (err) {
        if (err.response?.status === 404){
          setQuestionNames([])
        }
      }
    }
    getQuestions()
  }, [auth, deleteQuest, page])
  useEffect(()=>{
    function calculationPages(){
      const pagesList = Math.ceil(totalPages/limit)
      let page = []
      for (let i = 0; i < pagesList; i++) {
         page.push(i+1)
      }
      setPageNumbers(page)
    }
    calculationPages()
  },[totalPages,limit])
  const inputFile = (e) => {
    setUserImage(e.target.files[0])
    setFileSize(e.target.files[0].size)
    setFileType(e.target.files[0].type)
  }
  const userUpdateSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const v1 = USER_REGEX.test(user);
      if (!v1) {
        setErrMsg("Invalid Entry");
        return;
      }
    }
    if (newPwd) {
      const v2 = PWD_REGEX.test(newPwd);
      if (!v2) {
        setErrMsg("Invalid Entry");
        return;
      }
    }
    const fData = new FormData()
    if(user) fData.append("username", user)
    if (oldPwd && newPwd) {
    fData.append("prew_password", oldPwd)
    fData.append("new_password", newPwd)
  }
    if (userImage) fData.append("image", userImage)
    if (fData){
    try {
        const response = await $axios.put(`/users/${auth.id}`,fData,
            {
                headers: { 'Content-Type': "multipart/form-data" }
            }
        );
        setUser('');
        setOldPwd('');
        setNewPwd('');
        setUserImage(null);
        setAuth(prev => {return{...prev, "user": response?.data?.username, "image": response?.data?.image}})
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 404) {
            setErrMsg('User with this username not found');
        } else if (err.response?.status === 403) {
            setErrMsg('Invalide old password');
        } else if (err.response?.status === 400) {
            setErrMsg('Requaired fuilds for old and new password');
        } else if (err.response?.status === 409) {
            setErrMsg('User with this username alrady exist');
        } else {
            setErrMsg('Registration Failed')
        }
        errRef.current.focus();
    }}
  }
  const DeleteQuestion = async(id) => {
    try{
      response = await $axios.delete(`/questions/${id}`)
      setQuestionNames( prev => prev.filfer(prev.id !==id))

    } catch{
      if (!err?.response) {
        setErrMsg('No Server Response');
      }
    }
    finally{
      setDeleteQuest(!deleteQuest)
    }
  }
  function EditQuestionId(props) {
    !showEditQuestion && setShowEditQuestion(!showEditQuestion)
    showEditQuestion && props.id === questionId && setShowEditQuestion(!showEditQuestion)
    setQuestionId(props.id)
    setOneQuestion(props.question)
  }
  return (
    <div>
      {!auth ? <Spinner message="...Is loading..."/> :
      <div>
        <RegNavbar />
        <section className='userPageMain'>
          <div className='userProfileEl'>
            <img src={`http://${auth.image}`} onError={(e)=>{e.target.src='/src/pages/images/ava.png'}} className="profileImage" />
            <p>{auth.score}/{auth.games}</p>
            <section>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <form className='userRedaxForm' onSubmit={userUpdateSubmit}>
                <p>Редактировать профиль</p>
                <label htmlFor="username">
                    Имя пользователя:
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    От 4 до 24 символов.<br />
                    Должен начинаться с буквы.<br />
                    Может содержать английские буквы, цифры, тире и нижнее подчеркивание.
                </p>
                <label>Предыдущий пароль :</label>
                <input
                  type="password"
                  onChange={(e) => setOldPwd(e.target.value)}
                />
                <label htmlFor="password">
                    Новый Пароль:
                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPwd || !newPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setNewPwd(e.target.value)}
                    value={newPwd}
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    От 8 до 24 символов.<br />
                    Должен содержать строчные и заглавные английские буквы, цифры и спец символы.<br />
                    Включает следующие символы: <span aria-label="exclamation mark">!</span> <span aria-label="exclamation mark">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                <input type="file"
                    id="confirmfile"
                    className="fileEl"
                    onChange={inputFile}
                    onFocus={() => setImageFocus(true)}
                    onBlur={() => setImageFocus(false)}
                />
                <p id="confirmfile" className={imageFocus && !fileSize ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Размер файла должен быть не более 2 МБ.
                </p>
                <div className="regImageBox">
                    {userImage && validFile && <img className="prevImage" src={URL.createObjectURL(userImage)} style={{ maxHeight: "150px",  maxWidth: "150px" }} />}
                </div>
                <button className='userButtonEl'>Завершить изменения</button>
              </form>
            </section>
          </div>
          <div className='userQuestEl'>
              <table className='userQuestionList'>
                {questionNames.length > 0 && <tr><th>Номер</th><th>Вопрос</th><th>Правильный ответ</th><th>Неправильные ответы</th><th>Сложность</th><th>Категория</th></tr>}
                { questionNames.length > 0 
                ? questionNames.map((prev, index) => (
                <tr key = {index}>
                  <td>{index+(page * limit)+1}</td>
                  <td>{prev.question}</td>
                  <td>{prev.correct_answer}</td>
                  <td>{prev.incorrect_answers.map((pre, i) => `${pre}${(i===prev.incorrect_answers.length-1) ? "" : ","} `)}</td>
                  <td>{prev.difficulty}</td>
                  <td>{prev.category}</td>
                  <button 
                    className="editUserQuestion" 
                    onClick={(e)=>EditQuestionId(prev)}
                  >Change</button>
                  <button
                    className="deleteUserQuestion" 
                    onClick = {(e)=>DeleteQuestion(prev.id)}
                  >Delete</button>
                </tr>))
                : <p>No questions</p>
                }
              </table>
            <div>
              {questionNames.length>0 && pageNumbers.map((pre, index) => <button key= {index} className={page === index ? 'pageBtnClicked' : 'pageBtn'} onClick={(e) => setPage(pre-1)}>{pre}</button>)}
            </div>  
            <p onClick={e=>setShowAddQuestion(!showAddQuestion)} className='addQuestionEl'>Добавить вопрос</p>
              <EddQuestion show={showAddQuestion} updateQuestList={deleteQuest} setUpdateQuestList={setDeleteQuest}/>
              <EditQuestion name={oneQuestion} id={questionId} show={showEditQuestion} updateQuestList={deleteQuest} setUpdateQuestList={setDeleteQuest}/>
          </div>
        </section>
      </div>}     
    </div>
  )
}

export default UserPage