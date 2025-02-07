import React from 'react'
import RegistForm from '../../widgets/RegistrForm/RegistrForm'


export default function RegPage({ setUser, setMessage }): React.JSX.Element {
  return (
    <>
      <div style={{width: '400px'}}>
      <h1
            className="title"
          >
            Создать учетную запись
          </h1>
        <RegistForm setUser={setUser} setMessage={setMessage} />
      </div>
    </>
  )
}

