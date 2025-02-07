import { useEffect, useState } from "react"
import { setAccessToken } from '../../shared/lib/axiosInstance'
import ApiUser from "../../entities/User/api/ApiUser"
import { useNavigate } from "react-router-dom"

export default function LoginForm( { setUser, setMessage }) {

  const [formData, setFormData] = useState({email: '', password: ''})
  const [isDisabled, setDisabled] = useState(true)

  const navigete = useNavigate()
  useEffect(() => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    
    const {email, password} = formData
    if (
      email.trim() &&
      password.trim() &&
      password.trim().length >=8 &&
      emailPattern.test(email)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData])


  async function loginHandler(e) {
    try {
      e.preventDefault()
      const {email, password} = formData
      const { data } = await ApiUser.login({ email, password })
      console.log('LOGINFORM', data);
      setAccessToken(data.accessToken)
      setUser(data.user)
      navigete('/')
    } catch (error) {
      console.log(error.message);
      setTimeout(() => {
        setMessage('')
      }, 3000)
      setMessage(error.message)
    }
  }

  return (
    <form onSubmit={loginHandler}> 
      <div className="field">
        <div className="control">
          <input 
          className="input"  
          onChange={(e)=>setFormData({...formData, email: e.target.value})} 
          name="email" 
          value={formData.email} 
          type="email" 
          placeholder="Введите email" />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input 
          className="input" 
          onChange={(e)=>setFormData({...formData, password: e.target.value})} 
          name="password" 
          value={formData.password} 
          type="password" 
          placeholder="Введите пароль" />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button 
          type='submit' 
          className="button is-primary" 
          style={{color: "rgb(56, 40, 40)"}}
          disabled={isDisabled}
        >Войти</button>
        </div>
      </div>
    </form>
  )
}