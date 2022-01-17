import RouterProvider, {Route} from "./contexts/router.context";
import routes from "./consts/routes";
import Navbar from "./components/common/Navbar";

function App() {
  return (
      <RouterProvider>
        <div className="App">
          <Navbar/>

          {routes.map(route => (<Route key={route.key} {...route}/>))}
        </div>
      </RouterProvider>
  );
}

export default App;
