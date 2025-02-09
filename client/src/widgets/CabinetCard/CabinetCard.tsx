import React, { Dispatch, MouseEvent, SetStateAction } from 'react'
import { TRecipeInformation } from '../../shared/model'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove } from '@fortawesome/free-solid-svg-icons'
import ApiRecipe from '../../entities/Recipe/api/ApiRecipe'

type Props = {
  recipe: TRecipeInformation
  setFavouriteRecipe: Dispatch<SetStateAction<TRecipeInformation[]>>
}

export default function CabinetCard({recipe, setFavouriteRecipe}: Props): React.JSX.Element {

  function deleteFavouriteRecipeHandler(e: MouseEvent) {
    e.preventDefault()
    recipe.isFavourite = false
        ApiRecipe.deleteFavouriteRecipe(recipe.recipeId)
          .then(res => {
            console.log(res);
            
            setFavouriteRecipe((prev) => prev.filter(el => el.recipeId !== recipe.recipeId))
            // console.log(recipeInfo);
            
          })
          .catch(console.log)
  }

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={recipe?.image}
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
          </div>
          <div className="media-content">
            <button 
              onClick={deleteFavouriteRecipeHandler}
              className="icon" 
              style={{float: 'right', color: 'red'}}
            >
              <FontAwesomeIcon icon={faRemove} />
            </button>
            <Link to={`/recipeInformation/${recipe?.recipeId}`} className="title is-4">{recipe?.title}</Link>
            <div className="content p-4">
              {recipe.summary.replaceAll(/<[^>]*>/g, '')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}