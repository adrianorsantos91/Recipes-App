import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Button } from 'react-bootstrap';
import { Header, Footer } from '../components';
import { fetchFoodsThunk,
  fetchFoodsCategoryThunk, fetchFoodsPerCategoryThunk } from '../redux/actions';
import { FIRST_TWELVE_RECIPES, FIRST_FIVE_CATEGORIES } from '../helpers';
import '../App.css';
import './Foods.css';

export default function Foods() {
  const dispatch = useDispatch();
  const history = useHistory();

  const recipes = useSelector(({ foodData }) => foodData);
  const categories = useSelector(({ categoryFoodData }) => categoryFoodData);
  const foodsUsingCategory = useSelector(({ foodsPerCategory }) => foodsPerCategory);

  const [filter, setFilter] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  function handleCategoryClick({ target }) {
    if (filter === target.value) {
      setFilter('');
    } else {
      setFilter(target.value);
    }
  }

  useEffect(() => {
    dispatch(fetchFoodsThunk());
    dispatch(fetchFoodsCategoryThunk());
    dispatch(fetchFoodsPerCategoryThunk(filter));
  }, [filter]);

  useEffect(() => {
    if (!filter.length) {
      setFilteredList(recipes);
    } else {
      setFilteredList(foodsUsingCategory);
    }
  }, [recipes]);

  return (
    <div>
      <Header title="Foods" hasSearch />
      <div className="flex">
        <Button
          variant="outline-dark"
          value=""
          onClick={ (value) => handleCategoryClick(value) }
          data-testid="All-category-filter"
        >
          All
        </Button>
      </div>
      {categories.filter((_, index) => index < FIRST_FIVE_CATEGORIES)
        .map((category) => (
          <div className="flex" key={ category.strCategory }>
            <Button
              data-testid={ `${category.strCategory}-category-filter` }
              variant="outline-dark"
              value={ category.strCategory }
              onClick={ (value) => handleCategoryClick(value) }
            >
              {category.strCategory}

            </Button>
          </div>
        ))}
      {
        filteredList.filter((_, index) => index < FIRST_TWELVE_RECIPES)
          .map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ recipe.idMeal }
              className="container"
              onClick={ () => history.push(`./foods/${recipe.idMeal}`) }
              aria-hidden="true"
            >
              <Card style={ { width: '18rem' } }>
                <Card.Img
                  data-testid={ `${index}-card-img` }
                  variant="top"
                  src={ recipe.strMealThumb }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strMeal}

                  </Card.Title>
                  <Button
                    variant="primary"
                  >
                    See more

                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
      }
      <Footer />
    </div>
  );
}
