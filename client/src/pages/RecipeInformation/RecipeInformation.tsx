import React, { MouseEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ApiRecipe from '../../entities/Recipe/api/ApiRecipe'
import { TApiResponseReject, TRecipeInformation } from '../../shared/model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

export default function RecipeInformation({setMessage}): React.JSX.Element {
  const { recipeId } = useParams<string>()
  const [recipeInfo, setRecipeInfo] = useState<TRecipeInformation | null>(null)
  const [isFavourite, setFavourite] = useState<boolean>(false)

  

  useEffect(() => {
    if (recipeId) {
      ApiRecipe.getRecipeInfomationById(recipeId).then(res => {
        const { data, statusCode, error } = res
  
        if (error) {
          setRecipeInfo(null)
        }
  
        if (statusCode < 400) {
          console.log(data);
          
          setRecipeInfo(data)
        }
  
      }).catch((error: TApiResponseReject) => {
          setTimeout(() => {
            setMessage('')
          }, 3000)
          setMessage(error.message)
        })
    } 
      
  }, [])

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src={recipeInfo?.image}
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <button className="icon" style={isFavourite ? {float: 'right', color: 'orange'} : {float: 'right'}}>
              <FontAwesomeIcon icon={faBookmark} />
            </button>
            <p className="title is-4">{recipeInfo?.title}</p>
            
            <p className="subtitle is-6">coocking time: {recipeInfo?.readyInMinutes} minutes</p>
          </div>
        </div>

        <div className='block'>
          <h3 className='subtitle'>Ingredients:</h3>
          {recipeInfo?.extendedIngredients.map((ingr, idx) => <span className='has-text-grey-light' key={idx}>{ingr.name}, </span>)}
        </div>

        <div className="content p-4">
          {recipeInfo?.summary.replaceAll(/<[^>]*>/g, '')}
          <br />
          
        </div>
        <section className="hero is-info">
          <div className="hero-body">
            <p className="title mb-3">Instructions</p>
            <div className="subtitle has-text-grey-dark">
              {recipeInfo?.instructions.replaceAll(/<[^>]*>/g, '\n')}
            </div>
          </div>
        </section>
        <div className='is-flex is-justify-content-space-between mt-3'>
          <time dateTime="2016-1-1">11:09 PM - 9 Feb 2025</time>
          <button className="button is-success is-light">Back to main page</button>
        </div>
      </div>
    </div>
  )
}

