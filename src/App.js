import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Board from "./components/pages/Board";
import Workspaces from "./components/pages/workspaces/Workspaces";
import WorkspaceDetails from "./components/pages/workspaces/WorkspaceDetails";
import RouterProvider from "./contexts/router.context";

function App() {
  return (
      <RouterProvider>
        <div className="App">
          Trello Clone

          <Login/>
          <Profile/>
          <Workspaces/>
          <WorkspaceDetails/>
          <Board/>
        </div>
      </RouterProvider>
  );
}

export default App;
