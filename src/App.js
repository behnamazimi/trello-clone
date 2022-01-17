import RouterProvider, {Route} from "./contexts/router.context";
import routes from "./consts/routes";
import Navbar from "./components/common/Navbar";
import DataProvider from "./contexts/data.context";

function App() {
  return (
      <DataProvider>
        <RouterProvider>
          <div className="App">
            <Navbar/>

            {routes.map(route => (<Route key={route.key} {...route}/>))}
          </div>
        </RouterProvider>
      </DataProvider>
  );
}

export default App;
