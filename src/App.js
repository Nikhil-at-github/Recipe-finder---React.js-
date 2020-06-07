import React, { useEffect, useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import Recipe from './components/Recipe';
import style from './recipe.module.css';

function App() {
  const APP_ID = '9ba92223';
  const API_KEY = '6f7b788f4754eddb01499017313c184e';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipes();
  }, [query]);


  const getRecipes = async () => {
    console.log("query--->", query)
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    setLoading(false);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const openIngredients = (title, ingredients) => {
    setTitle(title);
    setIngredients(ingredients);
    setModalIsOpen(true);
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className={style.modals}
      >
        <h2>{title}</h2>
        <ol>
          {ingredients && ingredients.map(ingredient => (<li>{ingredient.text}</li>)
          )}
        </ol>
        <div>
          <button className={style.modalButton} onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
      <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="serach-input" type="text" value={search} onChange={updateSearch} />
          <button className="search-button" type="submit"> Search</button>
        </form>
        { loading ? 
        <img src="./Loading.gif" alt="LOADING....." style={{display:"block", maxHeight:"80vh" ,width: "50%", marginLeft:"auto",marginRight:"auto" }}/> : 
        <div className="recipes">
          {
            recipes.map(recipe => (
              <Recipe
                key={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                title={recipe.recipe.label}
                source={recipe.recipe.source}
                ingredients={recipe.recipe.ingredients}
                openIngredients={openIngredients}
              />
            ))}
        </div>
      }
      </div>
    </React.Fragment>
  );
};

export default App;

/* react modal */
Modal.setAppElement("#root");

