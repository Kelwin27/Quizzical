import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

function Navbar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem('refreshToken');
  const refresh = useRefreshToken()
  function redirect (){
      navigate('/user')
  }
  if (!auth.user && refreshToken){ refresh() }
  if (auth.user){
  return (
    <div className='navbarEl'>
      <img id='avatar' onClick={redirect} style={{cursor:"pointer"}} src={`http://${auth.image}`} onError={(e)=>{e.target.src='/src/pages/images/ava.png'}} alt={`Salfe image for user ${auth.user} profile`}/>
      <h1 onClick={redirect} style={{cursor:"pointer"}}>{auth.user}</h1>
      <h3>Правильных ответов: {auth.score}, Сыграно игр: {auth.games}</h3>
      <Logout />
    </div>
  )
}
return(
  <div className='navbarEl'>
    <Link className='navLink' to="/auth/login">Вы не авторизированы</Link>
  </div>
)
}
export default Navbar