import {Link} from "react-router-dom"
import useAuth from '/src/hooks/useAuth.jsx';

export default function ButtonInput() {
    const { auth } = useAuth();
    if (auth.user){
        return(
            <Link to='./question' className='btn-InEl'>
                Начать игру
            </Link>
        )
    }
    return (
        <Link to='/auth/login' className='btn-InEl'>
            Вход в аккаунт
        </Link>

    )
}