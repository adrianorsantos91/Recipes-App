import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import shareIcon from '../images/shareIcon.svg';
import { copyLinkRecipe } from '../helpers';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';
import '../styles/DoneRecipes.css';
import '../styles/FavoriteRecipes.css';

const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [filterFood, setFilterFood] = useState(false);
  const [filterDrink, setFilterDrink] = useState(false);

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setRecipes(getFavoriteRecipes);
  }, []);

  const handleFilter = ({ target: { id } }) => {
    if (id === 'foods') {
      setFilterFood(!filterFood);
    } else if (id === 'drinks') {
      setFilterDrink(!filterDrink);
    } else {
      setFilterFood(false);
      setFilterDrink(false);
    }
  };

  const favoriteRecipe = (currentRecipe) => {
    const newFavoriteRecipes = recipes.filter((recipe) => recipe.id !== currentRecipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setRecipes(newFavoriteRecipes);
  };

  return (
    <div className="background">
      <Header title="Favorite Recipes" />
      <div className="container-done-recipes">
        <button // Botoes de Filtro
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
          className="recipes"
        >
          All
        </button>
        <button
          type="button"
          id="foods"
          data-testid="filter-by-food-btn"
          onClick={ handleFilter }
          className="recipes"
        >
          Foods
        </button>
        <button
          type="button"
          id="drinks"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
          className="recipes"
        >
          Drinks
        </button>
      </div>
      {
        recipes.filter((recipe) => {
          if (filterFood) {
            return recipe.image.includes('themealdb');
          }

          if (filterDrink) {
            return recipe.image.includes('thecocktaildb');
          }

          return true;
        }).map((recipe, index) => (
          <div key={ Math.random() } className="card">

            <Link
              to={
                recipe.image.includes('thecocktaildb')
                  ? `/drinks/${recipe.id}`
                  : `/foods/${recipe.id}`
              }
            >
              <div>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  className="card-image-done-recipes"
                  variant="top"
                  src={ recipe.image }
                  alt="Receita"
                />
              </div>
            </Link>
            <div className="card-body">
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="recipe-subtitle"
              >
                {`${recipe.nationality || recipe.alcoholicOrNot} - ${recipe.category}`}
              </p>
              <Link
                to={
                  recipe.image.includes('thecocktaildb')
                    ? `/drinks/${recipe.id}`
                    : `/foods/${recipe.id}`
                }
              >
                <p
                  data-testid={ `${index}-horizontal-name` }
                  className="recipe-title"
                >
                  {recipe.name}

                </p>
              </Link>
              <button // <-----Botao Share
                type="button"
                onClick={ () => copyLinkRecipe(setIsCopied, recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="button share"
                />
              </button>
              <button
                type="button"
                onClick={ () => favoriteRecipe(recipe) }
                data-testid={ `${index}-button-remove-favorite` }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="black heart favorite icon"
                />

              </button>
              {isCopied && <span>Link copied!</span>}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default FavoriteRecipes;
