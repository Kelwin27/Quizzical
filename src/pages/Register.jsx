import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "../API/index";
import './css/register.css';
import RegNavbar from "../components/RegNavbar";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [ user, setUser ] = useState('');
    const [ validName, setValidName ] = useState(false);
    const [ userFocus, setUserFocus ] = useState(false);

    const [ pwd, setPwd ] = useState('');
    const [ validPwd, setValidPwd ] = useState(false);
    const [ pwdFocus, setPwdFocus ] = useState(false);

    const [ userImage, setUserImage ] = useState(null)
    const [ fileSize, setFileSize ] = useState(0)
    const [ fileType, setFileType ] = useState('')
    const [ validFile, setValidFile ] = useState(true)
    const [ imageFocus, setImageFocus ] = useState(false)

    const [ matchPwd, setMatchPwd ] = useState('');
    const [ validMatch, setValidMatch ] = useState(false);
    const [ matchFocus, setMatchFocus ] = useState(false);

    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    useEffect(() => {
        if (userImage){
            setValidFile(false)}
        if (fileSize <= 2*1024*1024 && (fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'image/jpg')){
            setValidFile(true)}
    }, [userImage])
    
        const inputFile = (e) => {
            setUserImage(e.target.files[0])
            setFileSize(e.target.files[0].size)
            setFileType(e.target.files[0].type)
        }
        const handleSubmit = async (e) => {
            e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        const fData = new FormData()
        fData.append("username", user)
        fData.append("password", pwd)
        if (userImage){
            fData.append("image", userImage)
        }
        try {
            const response = await axios.post("/users",fData,
                {
                    headers: { 'Content-Type': "multipart/form-data" }
                }
            );
            setSuccess(true);
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    return (
        <>
            <RegNavbar />
            {success ? (
                <div className="regScreen">
                    <section className="sectionRegEl">
                        <h1>Все получилось!</h1>
                        <p>
                        <Link to="/auth/login">Нажми чтобы продолжить</Link>
                        </p>
                    </section>
                </div>
            ) : (
                <div className="regScreen">
                    <section className="sectionRegEl">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Регистрация нового пользователя</h1>
                        <form className="formRegEl" onSubmit={handleSubmit}>
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
                                required
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

                            <label htmlFor="password">
                                Пароль:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
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

                            <label htmlFor="confirm_pwd">
                                Подтверждение пароля:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                />
                            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Должен совпадать с предыдущим паролем.
                            </p>
                            <label htmlFor="confirmfile">
                                Выберите изображение для аккаунта:
                                <FontAwesomeIcon icon={faCheck} className={validFile && userImage ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validFile ? "hide" : "invalid"} />
                            </label>
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
                            <button disabled={!validName || !validPwd || !validMatch || !validFile ? true : false}>Завершить регистрацию</button>
                        </form>
                        <p className="redirectReg" >
                            Уже зарегестрирован?<br />
                            <span className="lineReg">
                                <Link to="/auth/login">Введи учетные данные</Link>
                            </span>
                        </p>
                    </section>
                </div>
            )}
        </>
    )
}

export default Register