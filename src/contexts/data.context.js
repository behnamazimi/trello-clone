import React, {useContext, useMemo, useReducer} from "react";
import dummyData from "../consts/dummy-data";
import generateKeyByTitle from "../utils/generateKeyByTitle";

export const dataActions = {
  addWorkspace: "addWorkspace",
  removeWorkspace: "removeWorkspace",
}

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
  const now = new Date().getTime();

  switch (action.type) {
    case dataActions.removeWorkspace:
      state = {
        ...state,
        workspaces: state.workspaces.filter(w => w.key !== action.payload)
      }
      break;
    case dataActions.addWorkspace: {
      const newItem = {
        key: generateKeyByTitle(action.payload.title),
        ...action.payload,
        createdAt: now
      }
      state = {
        ...state,
        workspaces: [...state.workspaces, newItem]
      }
      break;
    }
  }
  return state
}