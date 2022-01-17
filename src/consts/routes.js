const routes = [
  {
    title: "Login",
    path: "/login",
    component: "components/pages/Login",
    isPrivate: false
  },
  {
    title: "Profile",
    path: "/profile",
    component: "components/pages/Profile",
  },
  {
    title: "Workspaces",
    path: "/",
    component: "components/pages/workspaces/Workspaces",
  },
  {
    title: "WorkspaceDetails",
    path: "/w/:key",
    component: "components/pages/workspaces/WorkspaceDetails",
  },
  {
    title: "Board",
    path: "/b/:key",
    component: "components/pages/board/Board",
  },
]

export default routes