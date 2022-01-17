import {Link} from "../../contexts/router.context";
import {useData} from "../../contexts/data.context";

export default function Navbar(props) {

  const {state} = useData()
  console.log(state);

  return (
      <header {...props} className="p1 flex justify-between">
        <div className="bold">Trello Clone</div>

        <nav>
          <Link to={"/"}>Workspaces</Link>
        </nav>

        <div>
          <Link to={"/profile"}>Username</Link>
        </div>
      </header>
  )
}