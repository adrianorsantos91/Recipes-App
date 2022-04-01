export const drinkRecipeInProgress = (id, name, inProgress, setInProgress) => {
  const INITIAL_STATE = {
    cocktails: { },
    meals: { },
  };

  const recipesInProgress = (
    JSON.parse(localStorage.getItem('inProgressRecipes'))
  ) || INITIAL_STATE;

  if (
    (recipesInProgress.cocktails[id]) && recipesInProgress.cocktails[id].includes(name)
  ) {
    const removeRecipe = {
      ...recipesInProgress,
      cocktails: {
        ...recipesInProgress.cocktails,
        [id]: recipesInProgress.cocktails[id]
          .filter((ingredient) => ingredient !== name),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(removeRecipe));
    setInProgress(inProgress.filter((ingredient) => ingredient !== name));
    return;
  }

  const updateLocalStorage = {
    ...recipesInProgress,
    cocktails: {
      ...recipesInProgress.cocktails,
      [id]: recipesInProgress
        .cocktails[id] ? [...recipesInProgress.cocktails[id], name] : [name],
    },
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify(updateLocalStorage));
  setInProgress([...inProgress, name]);
};

export const foodRecipeInProgress = (id, name, inProgress, setInProgress) => {
  const INITIAL_STATE = {
    cocktails: { },
    meals: { },
  };

  const recipesInProgress = (
    JSON.parse(localStorage.getItem('inProgressRecipes'))
  ) || INITIAL_STATE;

  if (
    (recipesInProgress.meals[id]) && recipesInProgress.meals[id].includes(name)
  ) {
    const removeRecipe = {
      ...recipesInProgress,
      meals: {
        ...recipesInProgress.meals,
        [id]: recipesInProgress.meals[id]
          .filter((ingredient) => ingredient !== name),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(removeRecipe));
    setInProgress(inProgress.filter((ingredient) => ingredient !== name));
    return;
  }

  const updateLocalStorage = {
    ...recipesInProgress,
    meals: {
      ...recipesInProgress.meals,
      [id]: recipesInProgress
        .meals[id] ? [...recipesInProgress.meals[id], name] : [name],
    },
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify(updateLocalStorage));
  setInProgress([...inProgress, name]);
};

export const recipesInProgress = {
  foods: (id, name, inProgress, setInProgress) => (
    foodRecipeInProgress(id, name, inProgress, setInProgress)
  ),
  drinks: (id, name, inProgress, setInProgress) => (
    drinkRecipeInProgress(id, name, inProgress, setInProgress)
  ),
};
