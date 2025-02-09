import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ApiRecipe from '../../entities/Recipe/api/ApiRecipe'

export default function RecipeInformation(): React.JSX.Element {
  const { recipeId } = useParams()

  useEffect(() => {
    ApiRecipe.getRecipeInfomationById(recipeId).then(res => {
      console.log(res);                  
    })
  }, [])

  return (
    <h1>RecipeInformation</h1>
  )
}

