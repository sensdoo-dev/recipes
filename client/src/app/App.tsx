import React, { useEffect, useState } from 'react';
import ApiUser from '../entities/User/api/ApiUser';
import { setAccessToken } from '../shared/lib/axiosInstance';
import type { TUser } from '../entities/User/model';
import type { TApiResponseReject } from '../shared/model';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../pages/Layout';
import NotFound from '../pages/NotFound/NotFound';
import MainPage from '../pages/MainPage/MainPage';
import RegistrPage from '../pages/RegistrPage/RegistrPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RecipeInformation from '../pages/RecipeInformation/RecipeInformation';
import Cabinet from '../pages/Cabinet/Cabinet';



function App(): React.JSX.Element {
  const [user, setUser] = useState<TUser | null>(null);
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    
    ApiUser.refreshTokens()
    .then((response) => {
      const {data, error, statusCode } = response
      
      if(error) {
        setUser(null)
      }

      if(statusCode < 400) {
        setAccessToken(data.accessToken)
        setUser(data.user)
      }
  }).catch((error: TApiResponseReject) => {
    setTimeout(() => {
      setMessage('')
    }, 3000)
    setMessage(error.message)
  })  
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} setUser={setUser}/>,
      errorElement: <NotFound />,
      children: [
        {
  
          path: '/',
          element: <MainPage  setMessage={setMessage}/>
  
        },
        {
          path: "/auth/reg",
          element: <RegistrPage setUser={setUser} setMessage={setMessage} />,
        },
        {
          path: "/auth/login",
          element: <LoginPage setUser={setUser} setMessage={setMessage} />,
        },
        {
          path: "/recipeInformation/:recipeId",
          element: <RecipeInformation setMessage={setMessage} />,
        },
        {
          path: "/cabinet/:userId",
          element: <Cabinet />,
        },
      ]}
  ]);

  return (
    <>
    {message && 
      <article className="message is-danger">
        <div className="message-header" style={{textAlign: "center"}}>
          <p>{message}</p>
        </div>
      </article>
    }
    <RouterProvider router={router}/>
  </>
  );
}

export default App;
