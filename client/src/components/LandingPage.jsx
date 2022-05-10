// import react from 'react'; 
import { Link } from 'react-router-dom';



export default function LandingPage(){
    return (
        <div>
            <div>
                <h1> B I E N V E N I D O S </h1>
                <Link to='/home'>
                    <button>Ingresar</button>    
                </Link>
            </div>
        </div>
    )
}