import React, { useState } from 'react';

function App(): React.JSX.Element {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('')
  

  function handlerRefresh(): void {
    apiUser.refreshTokens()
      .then(({data}) => {
        setAccessToken(data.accessToken)
        setCurrentUser(data.user)
    }).catch(error => {
      setTimeout(() => {
        setMessage('')
      }, 3000)
      setMessage('Вы не авторизованы, войдите в систему!')
    })  
  }

  useEffect(() => {
      handlerRefresh()  
  }, [])

  return (
    <h1>HELLO</h1>
  );
}

export default App;
