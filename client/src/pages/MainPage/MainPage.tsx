import React, { useState } from 'react';
import RecipeForm from '../../widgets/RecipeForm/RecipeForm';
import RecipeCard from '../../widgets/RecipeCard/RecipeCard';

type TRecipeCard = {
  id: number;
  title: string;
  image: string;
  imageType: string;
};

export default function MainPage({ setMessage }): React.JSX.Element {
  const [recipes, setRecipes] = useState<TRecipeCard[]>([]);

  return (
    <div className='container'>
      <h1 className='title has-text-centered my-6'>HELLO THERE</h1>
      <RecipeForm setMessage={setMessage} setRecipes={setRecipes} />

      <h1 className='title has-text-centered my-6'>RECIPES</h1>

      <div className='columns is-multiline'>
        {recipes.length !== 0 &&
          recipes.map((recipe: TRecipeCard) => (
            <div key={recipe.id} className='column is-one-third'>
              <RecipeCard recipe={recipe} />
            </div>
          ))}
      </div>
    </div>
  );
}