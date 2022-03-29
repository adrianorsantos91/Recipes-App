import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Footer } from '../components';
import './Foods.css';
import { action, FOOD_DATA } from '../redux/actions';

export default function Foods() {
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const recipes = useSelector(({ foodData }) => foodData);
  // console.log(data);

  useEffect(() => {
    const URL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const fetchName = async () => {
      const { meals } = await fetch(URL_NAME).then((response) => response.json());
      // setData(meals);
      dispatch(action(FOOD_DATA, meals));
    };
    fetchName();
  }, []);

  return (
    <div>
      <Header title="Foods" hasSearch />
      {
        recipes.filter((_, index) => index < FIRST_TWELVE_RECIPE).map((recipe, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ recipe.idMeal }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt=""
              width="100px"
            />
            <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
