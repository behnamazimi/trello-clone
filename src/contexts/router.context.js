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
    const [route, params] = getMatchedRouteWithParams(cp)
    setLocation({pathname: cp, path: route.path, params: params})
  }, [])

  useEffect(() => {
    window.addEventListener("popstate", assignCurrentPathname)
    return () => {
      window.removeEventListener("popstate", assignCurrentPathname)
    }
  }, [assignCurrentPathname])

  const navigate = useCallback((toPath) => {
    const [route, params] = getMatchedRouteWithParams(toPath)

    let title = "Trello Clone"
    if (!!route) {
      title = route.title + " | " + title
    }
    document.title = title
    setLocation({pathname: toPath, path: route.path, params})

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
  const [isMatched] = checkMatchedAndGetParams(path, location.pathname)
  if (!isMatched) {
    return null
  }
  return <Component {...rest}/>
}

function getCurrentPathname() {
  return window.location.pathname.toLowerCase()
}

function getMatchedRouteWithParams(pathname) {
  for (let r of routes) {
    const [isMatched, params] = checkMatchedAndGetParams(r.path, pathname)
    if (isMatched)
      return [r, params]
  }

  return [null, null]
}

function checkMatchedAndGetParams(pattern, pathname) {
  // /test/:key/page
  // /test/234/page

  let patternSections = pattern.split("/")
  let pathnameSections = pathname.split("/")

  const paramRegEx = new RegExp(":[a-zA-Z0-9_-]+") // :param123

  let isMatched = true
  let params = patternSections.reduce((acc, pi, index) => {
    if (paramRegEx.test(pi)) {
      acc[pi.substr(1)] = pathnameSections[index]
    } else if (pi !== pathnameSections[index]) {
      isMatched = false
    }
    return acc
  }, {})

  return [isMatched, params]
}