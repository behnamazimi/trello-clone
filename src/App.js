import RouterProvider, {Route} from "./contexts/router.context";
import routes from "./consts/routes";

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
