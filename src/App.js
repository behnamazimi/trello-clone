import RouterProvider, {Route} from "./contexts/router.context";
import routes from "./consts/routes";
import Navbar from "./components/common/Navbar";
import DataProvider from "./contexts/data.context";
import AuthProvider from "./contexts/auth.context";

function App() {
  return (
      <DataProvider>
        <RouterProvider>
          <AuthProvider>
            <div className="App">
              <Navbar/>

              {routes.map(route => (<Route key={route.key} {...route}/>))}
            </div>
          </AuthProvider>
        </RouterProvider>
      </DataProvider>
  );
}

export default App;
