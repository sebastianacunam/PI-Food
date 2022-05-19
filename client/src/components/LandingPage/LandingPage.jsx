// import react from 'react'; 
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'


export default function LandingPage(){
    return (
        <div className={style.background}>
            <div className={style.container}>
                <h1 className={style.welcome}> B I E N V E N I D O S </h1>
                <Link to='/home'>
                    <button className={style.btn}>Ingresar</button>    
                </Link>
            </div>
        </div>
    )
}