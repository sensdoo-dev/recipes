import { useEffect, useState } from "react"
import { setAccessToken } from '../../shared/lib/axiosInstance'
import ApiUser from "../../entities/User/api/ApiUser"
import { useNavigate } from "react-router-dom"

export default function RegForm( { setUser, setMessage }) {

  const [formData, setFormData] = useState({firstName: '', lastName: '',email: '', password: '', confPass: ''})
  const [isDisabled, setDisabled] = useState(true)

  const navigete = useNavigate()
  useEffect(() => {
    const { firstName, lastName, email, password, confPass } = formData;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

    if (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      password.trim() &&
      password.trim().length >=8 &&
      confPass.trim() &&
      password === confPass&&
      emailPattern.test(email)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);

  async function regHandler(e) {
    e.preventDefault()
    try {
      const {firstName, lastName, email, password} = formData      
      const { data } = await ApiUser.reg({ firstName, lastName, email, password })
      
      setAccessToken(data?.accessToken || '')
      setUser(data?.user || {})
      navigete('/')
    } catch (error) {
      setAccessToken('')
      setUser({})
      console.log(error);      
      setTimeout(() => {
        setMessage('')
      }, 3000)
      setMessage('Ошибка создания учетной записи')
    }
  }

  return (
    <form onSubmit={regHandler} noValidate>
      <div className="field">
        <div className="control">
          <input
            className="input"
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            value={formData.firstName}
            type="text"
            placeholder="Введите имя"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            value={formData.lastName}
            type="text"
            placeholder="Введите фамилию"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            type="email"
            placeholder="Введите email, пример: example@mail.com"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
            type="password"
            placeholder="Введите пароль, пример: Password1!"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            onChange={(e) =>
              setFormData({ ...formData, confPass: e.target.value })
            }
            value={formData.confPass}
            type="password"
            placeholder="Подтвердите пароль"
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
            Зарегистрироваться
          </button>
        </div>
      </div>
    </form>
  );
}