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
  removeColumn: "removeColumn",
  addColumn: "addColumn",
  addCard: "addCard",
  updateCard: "updateCard",
  setActiveCard: "setActiveCard",
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

  const getCardsOfColumn = useCallback((boardKey, columnKey) => {
    return state.cards.filter(c => c.board === boardKey && c.column === columnKey)
  }, [state])

  const getBoardByKey = useCallback(boardKey => {
    const targetBoard = state.boards.find(b => b.key === boardKey)
    if (!targetBoard) {
      return null
    }
    targetBoard.columns = (targetBoard.columns || [])
        .sort((a, b) => a.order - b.order)
        .map(c => {
          c.cards = getCardsOfColumn(boardKey, c.key)
          return c
        })
    return targetBoard
  }, [state, getBoards, getCardsOfColumn])

  const value = useMemo(() => ({
    state,
    dispatch,
    getWorkspaceByKey,
    getBoardByKey,
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
    case dataActions.removeColumn:
      state = {
        ...state,
        boards: state.boards.map(b => {
          if (b.key === action.payload.boardKey)
            b.columns = (b.columns || []).filter(c => c.key !== action.payload.columnKey)
          return b
        })
      }
      break;
    case dataActions.addColumn: {
      const newItem = {
        key: generateKeyByTitle(action.payload.title),
        ...action.payload,
        createdAt: now
      }
      state = {
        ...state,
        boards: state.boards.map(b => {
          if (b.key === action.payload.boardKey) {
            b.columns.push(newItem)
          }
          return b
        })
      }
      break;
    }
    case dataActions.addCard: {
      const newItem = {
        key: generateKeyByTitle(action.payload.title),
        ...action.payload,
        createdAt: now
      }
      state = {...state, cards: [...state.cards, newItem]}
      break;
    }
    case dataActions.updateCard: {
      state = {
        ...state,
        cards: state.cards.map(card => {
          if (card.key === action.payload.key) {
            card = {...action.payload, updatedAt: now,}
          }
          return card
        }),
        activeCard: action.payload
      }
      break;
    }
    case dataActions.setActiveCard: {
      state = {
        ...state,
        activeCard: state.cards.find(c => c.key === action.payload)
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