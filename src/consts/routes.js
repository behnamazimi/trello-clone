import Login from "../components/pages/Login";
import Profile from "../components/pages/Profile";
import Board from "../components/pages/Board";
import Workspaces from "../components/pages/workspaces/Workspaces";
import WorkspaceDetails from "../components/pages/workspaces/WorkspaceDetails";

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
  {
    title: "WorkspaceDetails",
    path: "/w/:key",
    Component: WorkspaceDetails
  },
  {
    title: "Board",
    path: "/b/:key",
    Component: Board
  },
]

export default routes