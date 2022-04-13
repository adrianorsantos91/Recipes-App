import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES, FIRST_FIVE_CATEGORIES } from '../helpers';
import '../styles/Foods.css';
import '../App.css';
import { fetchDrinkThunk, fetchDrinksCategoryThunk,
  fetchDrinksPerCategoryThunk,
} from '../redux/actions';
import '../styles/Drinks.css';

export default function Drinks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allDrinks = useSelector(({ drinkData }) => drinkData);
  const { wasNotFetched } = useSelector((state) => state);
  const categories = useSelector(({ categoryDrinkData }) => categoryDrinkData);
  const drinksUsingCategory = useSelector(({ drinksPerCategory }) => drinksPerCategory);

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
      dispatch(fetchDrinkThunk());
    }
    dispatch(fetchDrinksCategoryThunk());
    dispatch(fetchDrinksPerCategoryThunk(filter));
  }, [filter]);

  useEffect(() => {
    if (!filter.length) {
      setFilteredList(allDrinks);
    } else {
      setFilteredList(drinksUsingCategory);
    }
  }, [allDrinks]);

  return (
    <div className="content-container">
      <Header title="Drinks" hasSearch />
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
              data-testid={ `${category.strCategory}-category-filter` }
              value={ category.strCategory }
              onClick={ (value) => handleCategoryClick(value) }
              type="button"
              key={ category.strCategory }
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
          .map((drink, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ drink.idDrink }
              className="image-container"
              onClick={ () => history.push(`./drinks/${drink.idDrink}`) }
              aria-hidden="true"
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                className="card-image"
              />
              <span
                className="card-text"
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}
              </span>

            </div>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
