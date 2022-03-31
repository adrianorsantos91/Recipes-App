const saveFavoriteRecipe = (currentRecipe, recipeType, isFavorite, setIsFavorite) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favoriteRecipes.length) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, {
      id: currentRecipe.id,
      type: recipeType === 'foods' ? 'food' : 'drink',
      nationality: recipeType === 'foods' ? currentRecipe.nationality : '',
      category: currentRecipe.category,
      alcoholicOrNot: recipeType === 'drinks' ? currentRecipe.alcoholicOrNot : '',
      name: currentRecipe.title,
      image: currentRecipe.image,
      // doneDate: Date.now(),
      // tags: [],
    }]));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id: currentRecipe.id,
      type: recipeType === 'foods' ? 'food' : 'drink',
      nationality: recipeType === 'foods' ? currentRecipe.nationality : '',
      category: currentRecipe.category,
      alcoholicOrNot: recipeType === 'drinks' ? currentRecipe.alcoholicOrNot : '',
      name: currentRecipe.title,
      image: currentRecipe.image,
      // doneDate: Date.now(),
      // tags: [],
    }]));
  }
  setIsFavorite(!isFavorite);
};

export default saveFavoriteRecipe;
