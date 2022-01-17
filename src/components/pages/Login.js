import {Link} from "../../contexts/router.context";
import Input from "../common/Input";
import {useState} from "react";
import Button from "../common/Button";

export default function Login() {

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleInputChange = (e) => {
    setCredentials(s => ({...s, [e.target.name]: e.target.value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

  }

  return (
      <div>
        <h1 className="center">Login</h1>
        <form onSubmit={handleSubmit} className={"flex flex-column items-center"}>
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