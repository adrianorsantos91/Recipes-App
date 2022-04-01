import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Header } from '../components';

const DoneRecipes = () => (
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

    <Card style={ { width: '18rem' } }>
      <Card.Img
        // data-testid={ `${index}-horizontal-image` }
        variant="top"
        // src={ recipe.strMealThumb }
      />
      <Card.Body>
        <p>
          Categoria
        </p>
        <Card.Title>
          {/* {recipe.strMeal} */}

        </Card.Title>
        <Card.Text>
          {/* {recipe.strMeal} */}

        </Card.Text>
        <Button // <-----Botao Share
          variant="primary"
          // data-testid={ `${index}-horizontal-share-btn` }
        >
          Share
        </Button>
        <Card.Link
          href="#"
          // data-testid={ `${index}-${tagName}-horizontal-tag` }
        >
          Card Link
        </Card.Link>
      </Card.Body>
    </Card>
  </>
);

export default DoneRecipes;
