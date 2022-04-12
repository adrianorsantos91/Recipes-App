import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { copyLinkRecipe } from '../helpers';
import shareIcon from '../images/shareIcon.svg';
import '../App.css';
import '../styles/DoneRecipes.css';

const DoneRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [filterFood, setFilterFood] = useState(false);
  const [filterDrink, setFilterDrink] = useState(false);

  useEffect(() => {
    const getRecipesDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipes(getRecipesDone);
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

  return (

    <div className="background">
      <Header title="Done Recipes" />
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
              <img
                data-testid={ `${index}-horizontal-image` }
                className="card-image"
                variant="top"
                src={ recipe.image }
                alt="Receita"
              />
            </Link>
            <div className="card-body">
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="category"
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
              <p>
                {recipe.name}

              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
                className="recipe-date"
              >
                {`Recipe Done: ${recipe.doneDate}`}

              </p>
              <ul>
                {
                  recipe.tags.map((tag) => (
                    <li
                      key={ Math.random() }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}

                    </li>
                  ))
                }
              </ul>
              <button // <-----Botao Share
                type="button"
                onClick={ () => copyLinkRecipe(setIsCopied, recipe) }
                className="share-button"
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="button share"
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

export default DoneRecipes;
