import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  Explore,
  FoodDetail,
  DrinkDetail,
  Profile,
  ExploreNationalities,
  ExploreFoods,
  ExploreDrinks,
  ExploreIngredients,
  ExploreDrinksIngredients,
  DoneRecipes,
  FavoriteRecipes,
  FoodInProgress,
  DrinkInProgress,
} from './pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route path="/foods/:id/in-progress" component={ FoodInProgress } />
    <Route path="/foods/:id" component={ FoodDetail } />
    <Route path="/foods" component={ Foods } />
    <Route path="/drinks/:id/in-progress" component={ DrinkInProgress } />
    <Route path="/drinks/:id" component={ DrinkDetail } />
    <Route path="/drinks" component={ Drinks } />
    <Route path="/explore/foods/nationalities" component={ ExploreNationalities } />
    <Route path="/explore/foods/ingredients" component={ ExploreIngredients } />
    <Route path="/explore/drinks/ingredients" component={ ExploreDrinksIngredients } />
    <Route path="/explore/foods" component={ ExploreFoods } />
    <Route path="/explore/drinks" component={ ExploreDrinks } />
    <Route path="/explore" component={ Explore } />
    <Route path="/profile" component={ Profile } />
    <Route path="/done-recipes" component={ DoneRecipes } />
    <Route path="/favorite-recipes" component={ FavoriteRecipes } />
  </Switch>
);

export default Routes;
