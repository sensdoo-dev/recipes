import React, { MouseEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ApiRecipe from '../../entities/Recipe/api/ApiRecipe'
import { TApiResponseReject, TRecipeInformation } from '../../shared/model'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const mockRecipeInformation: TRecipeInformation = 
{
  recipeId: 4444,
  title: 'Chiken',
  image: 'https://img.spoonacular.com/recipes/635675-556x370.jpg',
  diets: [],
  dishTypes: [],
  instructions: 'Boozy Bbq Chicken could be just the <b>gluten free and dairy free</b>  recipe you been looking for. This recipe makes 6 servings with <b>725 calories</b> <b>32g of protein</b> , and <b>33g of fat</b>',
  readyInMinutes: 45,
  summary: 'Barbecue Chicken works really well with Zinfandel and Sparkling rosé. Fruity, low tannin zinfandel is great for any sticky, saucy barbecue chicken dish. If youre not feeling red wine, a sparkling rosé will work too. You could try ONEHOPE Zinfandel Wine. Reviewers quite like it with a 4.6 out of 5 star rating and a price of about 20 dollars per bottle.',
  isFavourite: false,
  extendedIngredients: [ {id: 1, name: 'white wine'}, {id: 2, name: 'broccoli'}, {id: 3, name: 'fresh garlic'}, {id: 4, name: 'whole chicken'}, {id: 5, name: 'salt'}, {id: 6, name: 'red onion'}, {id: 7, name: 'red bell pepper'}, {id: 8, name: 'pepper'},]
}

export default function RecipeInformation({setMessage}): React.JSX.Element {
  const nav = useNavigate()
  const { recipeId } = useParams<string>()
  const [recipeInfo, setRecipeInfo] = useState<TRecipeInformation>(mockRecipeInformation)

  async function addToFavouriteHandler(e: MouseEvent) {
    e.preventDefault()
    
    recipeInfo.isFavourite = !recipeInfo.isFavourite
    console.log(recipeInfo.isFavourite);
    ApiRecipe.addToFavourite(recipeInfo)
      .then(res => {
        setRecipeInfo((prev) => ({...prev, isFavourite: Boolean(res.data)}))
        // console.log(recipeInfo);
        
      })
      .catch(console.log)
  }

  useEffect(() => {
    if (recipeId) {
      // ApiRecipe.getRecipeInfomationById(recipeId).then(res => {
      //   const { data, statusCode, error } = res
  
      //   if (error) {
      //     setRecipeInfo(null)
      //   }
  
      //   if (statusCode < 400) {
      //     setRecipeInfo(data)
      //   }
  
      // }).catch((error: TApiResponseReject) => {
      //     setTimeout(() => {
      //       setMessage('')
      //     }, 3000)
      //     setMessage(error.message)
      //   })
    } 
      
  }, [])

  return (
    <>{recipeInfo && 
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
              <button onClick={addToFavouriteHandler} className="icon" style={recipeInfo.isFavourite ? {float: 'right', color: 'orange'} : {float: 'right'}}>
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
            <button onClick={() => nav('/')} className="button is-success is-light">Back to main page</button>
          </div>
        </div>
      </div>}
    </>
  )
}

