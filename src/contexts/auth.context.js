import React, {useCallback, useContext, useLayoutEffect, useMemo, useState} from "react";
import {useData} from "./data.context";
import isJsonString from "../utils/isJsonString";
import {useRouter} from "./router.context";

const localAuthKey = "user"

const AuthContext = React.createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({children}) {

  const [user, setUser] = useState()
  const {state} = useData()
  const {location, navigate} = useRouter()

  // check if logged in already
  useLayoutEffect(() => {
    if (!!user) return

    const localAuth = localStorage.getItem(localAuthKey)
    if (isJsonString(localAuth)) {
      setUser(JSON.parse(localAuth))
      navigate(location.pathname)
    }
  }, [])

  const updateAuth = useCallback((user) => {
    localStorage.setItem(localAuthKey, JSON.stringify(user))
    setUser(user)
  }, [setUser])

  const checkAuth = useCallback(({username, password}) => {
    return new Promise((resolve, reject) => {
      const user = state.users.find(u => u.username === username && u.password === password)
      if (user) {
        updateAuth(user)
        resolve(user)
      } else {
        reject()
      }
    })
  }, [state, updateAuth])

  const logout = useCallback(() => updateAuth(null), [updateAuth])

  const value = useMemo(() => ({
    user,
    authorized: !!user,
    checkAuth,
    logout,
  }), [checkAuth, user, logout])

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  )
}