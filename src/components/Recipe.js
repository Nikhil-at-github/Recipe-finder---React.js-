import React from 'react';
import style from '../recipe.module.css';


const Recipe = ({calories,image,title,source,ingredients, openIngredients}) =>
 {
    return (
        <div className={style.recipe}> 
            <h1>{title}</h1>
            <p>calories: {calories}</p>
            <img className={style.image} src={image} alt="image" onClick={() => {openIngredients(title,ingredients )}}/>
            <p>source: {source}</p>
           <h3 style={{cursor:"pointer"}} onClick={() => {openIngredients(title,ingredients )}}>Check Recipe</h3> 
        </div>
    );
};
export default Recipe;