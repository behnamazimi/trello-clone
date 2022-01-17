import {Link, useRouter} from "../../contexts/router.context";
import Input from "../common/Input";
import {useState} from "react";
import Button from "../common/Button";
import {useAuth} from "../../contexts/auth.context";

export default function Login() {

  const auth = useAuth()
  const {navigate} = useRouter()

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleInputChange = (e) => {
    setCredentials(s => ({...s, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    auth.checkAuth(credentials)
        .then(() => navigate("/"))
        .catch(() => alert("Invalid Credentials"))
  }

  return (
      <div>
        <h1 className="center">Login</h1>
        <form onSubmit={handleSubmit} className={"flex flex-column items-center"}>
          <p>username: behnam, password: 123</p>
          <Input name={"username"} label={"Username"}
                 value={credentials.username}
                 required
                 onChange={handleInputChange}/>
          <Input name={"password"} label={"Password"}
                 value={credentials.password}
                 required type={"password"}
                 onChange={handleInputChange}/>

          <div>
            <Button content={"Sign In"}/>
          </div>
          <Link to="/signup">Sign Up</Link>
        </form>
      </div>
  )
}