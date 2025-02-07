import React, { FormEvent, useEffect, useState } from 'react'
import ApiRecipe from '../../entities/Recipe/api/ApiRecipe';



export default function RecipeForm({setMessage, setRecipes}): React.JSX.Element {
  const [formData, setFormData] = useState({query: ''})
  const [isDisabled, setDisabled] = useState(true)


  useEffect(() => {
      const { query } = formData;
  
      if (
        query.trim()
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [formData]);
  
    async function regHandler(e: FormEvent) {
      e.preventDefault()
      try {
        const {query} = formData      
        const { data } = await ApiRecipe.complexSearch({query})
        console.log(data);
        setRecipes(data.results)
        
      } catch (error) {
        console.log(error);      
        setTimeout(() => {
          setMessage('')
        }, 3000)
        setMessage(error.message)
      }
    }
  
    return (
      <>
        <form onSubmit={regHandler} noValidate>
          <div className="field">
            <div className="control">
              <input
                className="input"
                onChange={(e) =>
                  setFormData({ ...formData, query: e.target.value })
                }
                value={formData.query}
                type="text"
                placeholder="Введите желаемое блюдо"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                type="submit"
                className="button is-primary"
                disabled={isDisabled}
              >
                Найти
              </button>
            </div>
          </div>
        </form>

        
      </>
  )
}
