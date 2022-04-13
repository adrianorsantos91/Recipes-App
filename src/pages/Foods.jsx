import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Header, Footer } from '../components';
import { fetchFoodsThunk,
  fetchFoodsCategoryThunk, fetchFoodsPerCategoryThunk } from '../redux/actions';
import { FIRST_TWELVE_RECIPES, FIRST_FIVE_CATEGORIES } from '../helpers';
import '../styles/Foods.css';

export default function Foods() {
  const dispatch = useDispatch();
  const history = useHistory();

  const recipes = useSelector(({ foodData }) => foodData);
  const categories = useSelector(({ categoryFoodData }) => categoryFoodData);
  const { wasNotFetched } = useSelector((state) => state);
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
    if (wasNotFetched) {
      dispatch(fetchFoodsThunk());
    }
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
    <div className="content-container">

      <Header title="Foods" hasSearch />
      <div className="grid-container">
        <button
          value=""
          onClick={ (value) => handleCategoryClick(value) }
          data-testid="All-category-filter"
          type="button"
          className="grid-item"
        >
          All
        </button>

        {categories.filter((_, index) => index < FIRST_FIVE_CATEGORIES)
          .map((category) => (

            <button
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              value={ category.strCategory }
              onClick={ (value) => handleCategoryClick(value) }
              type="button"
              className="grid-item"
            >
              {category.strCategory}
            </button>

          ))}
      </div>
      <div className="flex">
        {
          filteredList
        && filteredList.filter((_, index) => index < FIRST_TWELVE_RECIPES)
          .map((recipe, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ recipe.idMeal }
              className="image-container"
              onClick={ () => history.push(`./foods/${recipe.idMeal}`) }
              aria-hidden="true"
            >
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
                className="card-image"
              />
              <span
                className="card-text"
                data-testid={ `${index}-card-name` }
              >
                {recipe.strMeal}
              </span>

            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
