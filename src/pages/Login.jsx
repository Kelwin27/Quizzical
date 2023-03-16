import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../API/index.jsx'
import './css/login.css';
import RegNavbar from '../components/RegNavbar';


const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fData = new FormData()
        fData.append("username", user)
        fData.append("password", pwd)

        try {
            const response = await axios.post("/login", fData,
            {
            headers: { 'Content-Type': "multipart/form-data" },
            });

            const accessToken = response?.data?.access_token;
            const score = response?.data?.score;
            const games = response?.data?.games;
            const role = response?.data?.role;
            const id = response?.data.id;
            const image = response?.data?.image;
            localStorage.setItem('refreshToken', response?.data.refresh_token)
            setAuth({ user, pwd, accessToken, score, games, role, id, image });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 403) {
                setErrMsg('Invalid credentials');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div>
        <RegNavbar />
        <section className="formEl">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Зарегестрируйся!</h1>
            <form className="formIn" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    />
                <button>Начнем</button>
            </form>
            <p className='redirectLog'>
                Еще не зарегестрирован?<br />
                <span className='lineLogin'>
                    <Link to="/register">Зарегестрироваться</Link>
                </span>
            </p>
        </section>
        </div>
    )
}

export default Login