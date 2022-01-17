import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";

const RouterContext = React.createContext({})

export function useRouter() {
  return useContext(RouterContext)
}

export default function RouterProvider({children}) {

  const [currentPage, setCurrentPage] = useState("")

  useEffect(() => {
    const handler = () => {
      const path = window.location.pathname.toLowerCase()

      setCurrentPage(path)
    }
    window.addEventListener("popstate", handler)
    return () => {
      window.removeEventListener("popstate", handler)
    }
  }, [setCurrentPage])

  const navigate = useCallback((toPath) => {
    setCurrentPage(toPath)
    window.history.pushState(null, null, toPath)
  }, [setCurrentPage])

  const value = useMemo(() => ({
    currentPage,
    navigate
  }), [currentPage, navigate])

  return (
      <RouterContext.Provider value={value}>
        {children}
      </RouterContext.Provider>
  )
}

