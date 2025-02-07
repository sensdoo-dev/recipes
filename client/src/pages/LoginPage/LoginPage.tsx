import React from 'react'
import LoginForm from '../../widgets/LoginForm/LoginForm'

export default function LoginPage({ setUser, setMessage }): React.JSX.Element {
  return (
    <>
          <div style={{width: '400px'}}>
          <h1
                className="title"
              >
                Войти
              </h1>
            <LoginForm setUser={setUser} setMessage={setMessage} />
          </div>
        </>
  )
}
