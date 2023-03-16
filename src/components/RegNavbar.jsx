import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

function RegNavbar() {
    const navigate = useNavigate()
    const { auth } = useAuth();
    function redirect (){
        navigate('/')
    }
  return (
    <div className='navbarEl'>
        <h1>{auth.user}</h1>
        <p onClick = {redirect} style={{cursor:"pointer"}}>
            Вернуться на главную страницу
        </p>
    </div>
  )
}

export default RegNavbar