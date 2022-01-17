import Button from "../../common/Button";
import {dataActions, useData} from "../../../contexts/data.context";
import {useRouter} from "../../../contexts/router.context";
import {useCallback, useMemo, useState} from "react";
import Modal from "../../common/Modal";
import Input from "../../common/Input";
import {useAuth} from "../../../contexts/auth.context";

export default function WorkspaceDetails() {
  const {state, dispatch, getWorkspaceByKey} = useData()
  const {navigate, location} = useRouter()

  const targetBoard = useMemo(() => getWorkspaceByKey(location.params?.key), [state, getWorkspaceByKey, location.params])

  const [addModalOpen, setAddModalOpen] = useState(false)

  const handleBoardClick = useCallback((key) => {
    navigate(`/b/${key}`)
  }, [navigate])

  const handleBoardRemove = useCallback((key) => {
    dispatch({
      type: dataActions.removeBoard,
      payload: key
    })
  }, [dispatch])

  const handleBoardCreation = (payload) => {
    dispatch({
      type: dataActions.addBoard,
      payload,
    })
  }

  return (
      <div className="WorkspaceDetails p2">
        <div className="flex justify-between items-center">
          <h2>Boards of {targetBoard.title}</h2>
          <Button onClick={() => setAddModalOpen(true)} content="Add New"/>
        </div>

        <div>
          {(targetBoard.boards && !!targetBoard.boards.length) &&
          targetBoard.boards.map(w => (<BoardItem key={w.key} item={w}
                                                  onRemove={handleBoardRemove.bind(this, w.key)}
                                                  onClick={handleBoardClick.bind(this, w.key)}/>))}

          {(!targetBoard.boards || !targetBoard.boards.length) &&
          <p>No Boards. Add new one</p>}
        </div>

        <NewBoardModal open={addModalOpen}
                       onClose={() => setAddModalOpen(false)}
                       onConfirm={handleBoardCreation}
                       workspace={targetBoard}/>
      </div>
  )
}

function BoardItem({item, onRemove, onClick}) {
  return (
      <div className="BoardItem flex mt1 items-center p1">
        <div className="flex-column" style={{flex: 1, cursor: "pointer"}}
             onClick={onClick}>
          <h3 className="m0">
            <span style={{
              backgroundColor: item.background,
              display: "inline-block",
              width: 15,
              height: 15,
              marginRight: 5
            }}/>
            {item.title}</h3>
          <p className="m0">bg: {item.background}</p>
        </div>
        <Button content="remove" onClick={onRemove}/>
      </div>
  )
}

function NewBoardModal({open, onClose, onConfirm, workspace}) {
  const {user} = useAuth()

  const [board, setBoard] = useState({
    title: "",
    background: "#fff"
  })

  const handleFormChange = useCallback(e => {
    setBoard(s => ({...s, [e.target.name]: e.target.value, workspace: workspace?.key}))
  }, [workspace])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    onConfirm?.({...board, username: user.username})
    onClose?.()
  }, [onConfirm, board, user])

  return (
      <Modal open={open} onClose={onClose} title={`New Board to ${workspace?.title}`}>
        <form onSubmit={handleSubmit} onChange={handleFormChange}>
          <div>
            <Input label="Title" name={"title"} required autoFocus/>
            <Input type={"color"} label="Background" name={"background"} required/>
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