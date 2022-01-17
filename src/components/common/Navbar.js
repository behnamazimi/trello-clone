import {Link} from "../../contexts/router.context";
import {useAuth} from "../../contexts/auth.context";

export default function Navbar(props) {

  const {authorized, user} = useAuth()

  return (
      <header {...props} className="p1 flex justify-between">
        <div className="bold">Trello Clone</div>

        <nav>
          <Link to={"/"}>Workspaces</Link>
        </nav>

        <div>
          {authorized
              ? <Link to={"/profile"}>{user.fullName}</Link>
              : <Link to={"/login"}>Login</Link>}
        </div>
      </header>
  )
}