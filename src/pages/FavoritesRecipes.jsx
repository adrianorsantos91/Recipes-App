import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import shareIcon from '../images/shareIcon.svg';
import { copyLinkRecipe } from '../helpers';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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
    <>
      <Header title="Favorite Recipes" />
      <div>
        <button // Botoes de Filtro
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          id="foods"
          data-testid="filter-by-food-btn"
          onClick={ handleFilter }
        >
          Foods
        </button>
        <button
          type="button"
          id="drinks"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
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
          <Card key={ Math.random() } style={ { width: '18rem' } }>

            <Link
              to={
                recipe.image.includes('thecocktaildb')
                  ? `/drinks/${recipe.id}`
                  : `/foods/${recipe.id}`
              }
            >
              <Card.Img
                data-testid={ `${index}-horizontal-image` }
                variant="top"
                src={ recipe.image }
                style={ { width: '100px' } }
              />
            </Link>
            <Card.Body>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality || recipe.alcoholicOrNot} - ${recipe.category}`}
              </p>
              <Link
                to={
                  recipe.image.includes('thecocktaildb')
                    ? `/drinks/${recipe.id}`
                    : `/foods/${recipe.id}`
                }
              >
                <Card.Title
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}

                </Card.Title>
              </Link>
              <Card.Text>
                {recipe.name}

              </Card.Text>
              <Button // <-----Botao Share
                variant="primary"
                onClick={ () => copyLinkRecipe(setIsCopied, recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="button share"
                />
              </Button>
              <button
                type="button"
                onClick={ () => favoriteRecipe(recipe) }
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="black heart favorite icon"
                />

              </button>
              {isCopied && <span>Link copied!</span>}
            </Card.Body>
          </Card>
        ))
      }
    </>
  );
};

export default FavoriteRecipes;
