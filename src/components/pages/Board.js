import {useRouter} from "../../contexts/router.context";
import Button from "../common/Button";
import {dataActions, useData} from "../../contexts/data.context";
import {useCallback, useMemo, useState} from "react";
import {useAuth} from "../../contexts/auth.context";
import Modal from "../common/Modal";
import Input from "../common/Input";

export default function Board() {
  const {navigate, location} = useRouter()
  const {state, dispatch, getBoardByKey} = useData()
  const [newColumnModal, setNewColumnModal] = useState()

  const targetBoard = useMemo(() => getBoardByKey(location.params?.key), [state, getBoardByKey, location.params])


  const handleColumnRemove = useCallback((boardKey, columnKey) => {
    dispatch({
      type: dataActions.removeColumn,
      payload: {boardKey, columnKey}
    })
  }, [dispatch])

  const handleColumnAdd = useCallback((payload) => {
    dispatch({
      type: dataActions.addColumn,
      payload
    })
  }, [dispatch])

  return (
      <div className="Board p2">
        <div className={"flex justify-between items-center"}>
          <h2>{targetBoard?.title || "-"} Details</h2>
          <Button onClick={() => setNewColumnModal(true)}>Add Column</Button>
        </div>

        <div className="ColumnsWrapper">
          {(targetBoard?.columns && !!targetBoard?.columns.length) &&
          targetBoard?.columns.map(col => <Column key={col.key} column={col}
                                                  boardKey={targetBoard.key}
                                                  onRemove={handleColumnRemove}/>)}

          {(!targetBoard?.columns || !targetBoard?.columns.length) &&
          <p>No Columns. Add new one</p>}

        </div>

        <NewColumnModal open={newColumnModal}
                        onClose={() => setNewColumnModal(false)}
                        onConfirm={handleColumnAdd}
                        boardKey={targetBoard?.key}/>
      </div>
  )
}

function Column({column, boardKey, onRemove}) {

  return (
      <div className="Column">
        <div className="flex justify-between mb1">
          <h3 className="mt0">{column.title}</h3>
          <Button className="py0 px2" onClick={() => onRemove?.(boardKey, column.key)}>x</Button>
        </div>

        <div className="Cards">
          {column.cards.map(c => <h4 key={c.key}>Card</h4>)}
        </div>
      </div>
  )
}

function NewColumnModal({open, onClose, onConfirm, boardKey}) {
  const {user} = useAuth()

  const [column, setColumn] = useState({
    title: "",
    order: 1
  })

  const handleFormChange = useCallback(e => {
    setColumn(s => ({...s, [e.target.name]: e.target.value}))
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    onConfirm?.({...column, username: user.username, boardKey})
    onClose?.()
  }, [onConfirm, column, user, boardKey])

  return (
      <Modal open={open} onClose={onClose} title={`New Column`}>
        <form onSubmit={handleSubmit} onChange={handleFormChange}>
          <div>
            <Input label={"Title"} name={"title"} required autoFocus/>
            <Input label={"Order"} name={"order"} required type="number"/>
          </div>
          <div className="flex justify-end t2">
            <Button onClick={onClose}
                    content={"Cancel"}
                    className={"mr1"}
                    type="button"/>
            <Button content={"Confirm"}/>
          </div>
        </form>
      </Modal>
  )
}