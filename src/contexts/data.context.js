import React, {useContext, useMemo, useReducer, useState} from "react";
import dummyData from "../consts/dummy-data";

const DataContext = React.createContext({})

export function useData() {
  return useContext(DataContext)
}

export default function DataProvider({children}) {

  const [state, dispatch] = useReducer(dataReducer, dummyData)

  const value = useMemo(() => ({
    state,
    dispatch
  }), [state, dispatch])

  return (
      <DataContext.Provider value={value}>
        {children}
      </DataContext.Provider>
  )
}

function dataReducer(state, action) {
  return state
}