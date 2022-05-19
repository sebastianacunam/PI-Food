import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import NewRecipe from './components/NewRecipe/NewRecipe';
import DetailRecipe from './components/DetailRecipe/DetailRecipe'





function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/recipe' component={NewRecipe}/>
          <Route path='/recipes/:id' component={DetailRecipe}/>

        </Switch>
      </div>
    </BrowserRouter>  
  );
}

export default App;
