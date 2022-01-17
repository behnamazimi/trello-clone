import React, {useCallback, useContext, useMemo, useReducer} from "react";
import dummyData from "../consts/dummy-data";
import generateKeyByTitle from "../utils/generateKeyByTitle";
import isJsonString from "../utils/isJsonString";

const localDataKey = "data"

export const dataActions = {
  addWorkspace: "addWorkspace",
  removeWorkspace: "removeWorkspace",
  addBoard: "addBoard",
  removeBoard: "removeBoard",
}

const DataContext = React.createContext({})

export function useData() {
  return useContext(DataContext)
}

export default function DataProvider({children}) {

  const [state, dispatch] = useReducer(dataReducer, dummyData, dataLoader)

  const getBoards = useCallback(workspaceKey => {
    return state.boards.filter(b => b.workspace === workspaceKey)
  }, [state])

  const getWorkspaceByKey = useCallback(workspaceKey => {
    const targetWorkspace = state.workspaces.find(b => b.key === workspaceKey)
    if (!targetWorkspace) {
      return null
    }
    targetWorkspace.boards = getBoards(workspaceKey)
    return targetWorkspace
  }, [state, getBoards])

  const value = useMemo(() => ({
    state,
    dispatch,
    getWorkspaceByKey,
  }), [state, dispatch, getWorkspaceByKey])

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
    case dataActions.removeBoard:
      state = {
        ...state,
        boards: state.boards.filter(w => w.key !== action.payload)
      }
      break;
    case dataActions.addBoard: {
      const newItem = {
        key: generateKeyByTitle(action.payload.title),
        ...action.payload,
        createdAt: now
      }
      state = {
        ...state,
        boards: [...state.boards, newItem]
      }
      break;
    }
  }

  localStorage.setItem(localDataKey, JSON.stringify(state))
  return state
}

function dataLoader(state) {
  const localDataStr = localStorage.getItem(localDataKey)
  if (!localDataStr || !isJsonString(localDataStr)) {
    return state
  }

  return JSON.parse(localDataStr)
}