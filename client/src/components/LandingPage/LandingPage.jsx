// import react from 'react'; 
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'


export default function LandingPage(){
    return (
        <div className={style.background}>
            <div className={style.container}>
                <h1 className={style.welcome}> W E L C O M E </h1>
                <Link to='/home'>
                    <button className={style.btn}>let's go!</button>    
                </Link>
            </div>
        </div>
    )
}