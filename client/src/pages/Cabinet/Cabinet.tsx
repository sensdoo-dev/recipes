import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ApiRecipe from '../../entities/Recipe/api/ApiRecipe'
import { TRecipeInformation } from '../../shared/model'
import CabinetCard from '../../widgets/CabinetCard/CabinetCard'

export default function Cabinet(): React.JSX.Element {
  const [favouriteRecipes, setFavouriteRecipe] = useState<TRecipeInformation[]>([])

  const { userId } = useParams()

  useEffect(() => {
    if(userId) {
      ApiRecipe.getRecipeInfomationByUserId(userId)
        .then(result => {
          const {data, error, statusCode} = result

          if(error) {
            setFavouriteRecipe([])
          }

          if(statusCode < 400 && data) {
            setFavouriteRecipe(data)
          }
        })
        .catch(console.log)
    }
  }, [])

  return (
    <div className='container'>
      <h1 className='title'>Cabinet</h1>
      {favouriteRecipes.length === 0 && <div className='subtitle is-4'>Вы пока не добавляли рецепты в избранное</div>}

      {favouriteRecipes.length > 0 && 
        favouriteRecipes.map((recipe: TRecipeInformation) => 
          <div key={recipe.recipeId} className='column is-one-third'>
            <CabinetCard recipe={recipe} setFavouriteRecipe={setFavouriteRecipe} />
          </div>
        )
      }

    </div>
  )
}