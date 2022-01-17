import React, {Component, useCallback, useContext, useEffect, useMemo, useState} from "react";
import routes from "../consts/routes";

const RouterContext = React.createContext({})

export function useRouter() {
  return useContext(RouterContext)
}

export default function RouterProvider({children}) {

  const [location, setLocation] = useState({
    pathname: getCurrentPathname(),
    path: "/",
    params: null
  })

  const assignCurrentPathname = useCallback(() => {
    let cp = getCurrentPathname()
    // todo: get params
    setLocation({pathname: cp, path: cp, params: null})
  }, [])

  useEffect(() => {
    window.addEventListener("popstate", assignCurrentPathname)
    return () => {
      window.removeEventListener("popstate", assignCurrentPathname)
    }
  }, [assignCurrentPathname])

  const navigate = useCallback((toPath) => {
    setLocation({pathname: toPath, path: toPath})
    const targetRoute = getMatchedRoute(toPath)
    let title = "Trello Clone"
    if(!!targetRoute){
      title = targetRoute.title + " | " + title
    }

    document.title = title

    window.history.pushState(null, null, toPath)
  }, [setLocation])

  const value = useMemo(() => ({
    location,
    navigate
  }), [location, navigate])

  return (
      <RouterContext.Provider value={value}>
        {children}
      </RouterContext.Provider>
  )
}

export function Route({path, Component, ...rest}) {
  const {location} = useRouter()
  if (location?.pathname !== path) {
    return null
  }
  return <Component/>
}

function getCurrentPathname() {
  return window.location.pathname.toLowerCase()
}

function getMatchedRoute(pathname) {
  for (let r of routes) {
    if(r.path === pathname)
      return r
  }

  return null
}