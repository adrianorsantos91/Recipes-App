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
  /* ExploreNationalities, */
  ExploreFoods,
  ExploreDrinks,
  ExploreIngredients,
  ExploreDrinksIngredients,
  DoneRecipes,
  FavoriteRecipes,
  RecipeInProgress,
} from './pages';
import ExploreFoodsNationalities from './pages/ExploreFoodsNationalities';
import NotFound from './pages/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route
      path={ ['/foods/:id/in-progress', '/drinks/:id/in-progress'] }
      component={ RecipeInProgress }
    />
    <Route path="/foods/:id" component={ FoodDetail } />
    <Route path="/foods" component={ Foods } />
    <Route path="/drinks/:id" component={ DrinkDetail } />
    <Route path="/drinks" component={ Drinks } />
    <Route path="/explore/foods/nationalities" component={ ExploreFoodsNationalities } />
    <Route path="/explore/drinks/nationalities" component={ NotFound } />
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
