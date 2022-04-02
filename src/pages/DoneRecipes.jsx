import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Header } from '../components';
import shareIcon from '../images/shareIcon.svg';

const DoneRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipesDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setRecipes(getRecipesDone);
  }, []);

  return (

    <>
      <Header title="Done Recipes" />
      <div>
        <button // Botoes de Filtro
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      {
        recipes.map((recipe, index) => (
          <Card key={ Math.random() } style={ { width: '18rem' } }>
            <Card.Img
              data-testid={ `${index}-horizontal-image` }
              variant="top"
              src={ recipe.image }
              style={ { width: '100px' } }
            />
            <Card.Body>
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality || recipe.alcoholicOrNot} - ${recipe.category}`}
              </p>
              <Card.Title
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}

              </Card.Title>
              <Card.Text>
                {recipe.name}

              </Card.Text>
              <p
                data-testid={ `${index}-horizontal-done-date` }
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
              <Button // <-----Botao Share
                variant="primary"

              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="button share"
                />
              </Button>
            </Card.Body>
          </Card>
        ))
      }

    </>
  );
};

export default DoneRecipes;
