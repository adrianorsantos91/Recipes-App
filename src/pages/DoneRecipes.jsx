import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Header } from '../components';

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
            />
            <Card.Body>
              <p>
                {`Category: ${recipe.category}`}
              </p>
              <Card.Title>
                {recipe.name}

              </Card.Title>
              <Card.Text>
                {recipe.name}

              </Card.Text>
              <Button // <-----Botao Share
                variant="primary"
                data-testid={ `${index}-horizontal-share-btn` }
              >
                Share
              </Button>
              <Card.Link
                href="#"
                data-testid={ `${index}-${recipe.tags}-horizontal-tag` }
              >
                Card Link
              </Card.Link>
            </Card.Body>
          </Card>
        ))
      }

    </>
  );
};

export default DoneRecipes;
