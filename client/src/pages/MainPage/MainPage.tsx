import React, { useState } from 'react'
import RecipeForm from '../../widgets/RecipeForm/RecipeForm'
import RecipeCard from '../../widgets/RecipeCard/RecipeCard'

type TRecipeCard = {
  id: number
  title: string
  image: string
  imageType: string
}

export default function MainPage({setMessage}): React.JSX.Element {
  
  const [recipes, setRecipes] = useState<TRecipeCard[]>([])

  return (
   <div className='container'>
     
     <h1 className='title' style={{margin: '70px'}}>HELLO THERE</h1>
     <RecipeForm setMessage={setMessage} setRecipes={setRecipes} />

     <h1 className='title' style={{margin: '70px'}}>RECIPES</h1>

        {recipes.length !== 0 && 
          recipes.map((recipe: TRecipeCard) => 
            <RecipeCard key={recipe.id} recipe={recipe} />
          )
        }
     
   </div>
 )
}

