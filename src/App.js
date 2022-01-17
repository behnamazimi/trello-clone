import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Board from "./components/pages/Board";
import Workspaces from "./components/pages/workspaces/Workspaces";
import WorkspaceDetails from "./components/pages/workspaces/WorkspaceDetails";
import RouterProvider, {Route} from "./contexts/router.context";

const routes = [
  {
    title: "Login",
    path: "/login",
    Component: Login
  },
  {
    title: "Profile",
    path: "/profile",
    Component: Profile
  },
  {
    title: "Workspaces",
    path: "/",
    Component: Workspaces
  },
]

function App() {
  return (
      <RouterProvider>
        <div className="App">
          Trello Clone

          {routes.map(route => (<Route key={route.key} {...route}/>))}
        </div>
      </RouterProvider>
  );
}

export default App;
