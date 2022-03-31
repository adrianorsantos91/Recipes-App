import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Card, Button } from 'react-bootstrap';
import { Footer, Header } from '../components';
import { FIRST_TWELVE_RECIPES, FIRST_FIVE_CATEGORIES } from '../helpers';
import '../styles/Foods.css';
import '../App.css';
import { fetchDrinkThunk, fetchDrinksCategoryThunk,
  fetchDrinksPerCategoryThunk,
} from '../redux/actions';

export default function Drinks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allDrinks = useSelector(({ drinkData }) => drinkData);
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
    dispatch(fetchDrinkThunk());
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
    <div>
      <Header title="Drinks" hasSearch />
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
          .map((drink, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ drink.idDrink }
              className="container"
              onClick={ () => history.push(`./drinks/${drink.idDrink}`) }
              aria-hidden="true"
            >
              <Card style={ { width: '18rem' } }>
                <Card.Img
                  data-testid={ `${index}-card-img` }
                  variant="top"
                  src={ drink.strDrinkThumb }
                />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-card-name` }
                  >
                    {drink.strDrink}

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
