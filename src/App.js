import './App.css';
import Axios from 'axios';
import { useState } from "react"
import RecipeTile from './RecipeTile';

function App() {
  const [query, setquery] = useState("")
  const [recipes, setrecipes] = useState([])
  const [healthLabel, sethealthLabels]=useState("vegan")

  const YOUR_APP_ID = "f317a14d";
  const YOUR_APP_KEY = "5c46659dce4d149cf495034520cb997c";

  var url=`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=${healthLabel}`;


  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipes(result.data.hits)
    console.log(result.data);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }
  return (
    <div className="app">
      <h1>Food Recipe Tower</h1>
      <form className='app__searchForm' onSubmit={onSubmit}>
        <input type="text" className="app__input" placeholder='Enter ingridient' value={query} onChange={(e) => setquery(e.target.value)} />
        <input className="app__submit" type="submit" value="Search" />
        
        <select className='app_healthLabels'>
          <option onClick={() => sethealthLabels("vegan")}>Vegan</option>
          <option value="egg-free" onClick={() => sethealthLabels("egg-free")}>egg-free</option>
          <option value="peanut-free" onClick={() => sethealthLabels("peanut-free")}>peanut-free</option>
          <option value="tree-nut-free" onClick={() => sethealthLabels("tee-peanut-free")}>tree-nut-free</option>     
          <option value="soy-free" onClick={() => sethealthLabels("soy-free")}>soy-free</option>
        </select>
      </form>

      <div className='app__recipes'>
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} />
        })}
      </div>
    </div>
  );
}

export default App;
