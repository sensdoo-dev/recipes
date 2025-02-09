import React from 'react'
import { Link } from 'react-router-dom'
import { TProps } from '../../shared/model'

export default function RecipeCard({recipe}: TProps): React.JSX.Element {
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
            <Link to={`/recipeInformation/${recipe?.id}`} className="title is-4">{recipe?.title}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
