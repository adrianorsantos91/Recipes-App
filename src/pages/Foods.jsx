import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Header, Footer } from '../components';
import './Foods.css';
import { action, FOOD_DATA } from '../redux/actions';

export default function Foods() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const URL_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const fetchName = async () => {
      const { meals } = await fetch(URL_NAME).then((response) => response.json());
      setData(meals);
      dispatch(action(FOOD_DATA, meals));
    };
    fetchName();
  }, []);

  return (
    <div>
      <Header title="Foods" hasSearch />
      {data.map((recipe) => <span key={ recipe.idMeal }>{recipe.strMeal}</span>)}
      <Footer />
    </div>
  );
}
