import Button from "../../common/Button";
import {dataActions, useData} from "../../../contexts/data.context";
import {useRouter} from "../../../contexts/router.context";
import {useCallback, useState} from "react";
import Modal from "../../common/Modal";
import Input from "../../common/Input";
import {useAuth} from "../../../contexts/auth.context";

export default function Workspaces() {
  const {state, dispatch} = useData()
  const {navigate} = useRouter()

  const [addModalOpen, setAddModalOpen] = useState(false)

  const handleWorkspaceClick = useCallback((key) => {
    navigate(`/w/${key}`)
  }, [navigate])

  const handleWorkspaceRemove = useCallback((key) => {
    dispatch({
      type: dataActions.removeWorkspace,
      payload: key
    })
  }, [dispatch])

  const handleWorkspaceCreation = (payload) => {
    console.log(payload);
    dispatch({
      type: dataActions.addWorkspace,
      payload,
    })
  }

  return (
      <div className="Workspaces p2">
        <div className="flex justify-between items-center">
          <h2>Workspaces</h2>
          <Button onClick={() => setAddModalOpen(true)} content="Add New"/>
        </div>

        <div>
          {(state.workspaces && !!state.workspaces.length) &&
          state.workspaces.map(w => (<WorkspaceItem key={w.key} item={w}
                                                    onRemove={handleWorkspaceRemove.bind(this, w.key)}
                                                    onClick={handleWorkspaceClick.bind(this, w.key)}/>))}

          {(!state.workspaces || !state.workspaces.length) &&
          <p>No Workspaces. Add new one</p>}
        </div>

        <NewWorkspaceModal open={addModalOpen}
                           onClose={() => setAddModalOpen(false)}
                           onConfirm={handleWorkspaceCreation}/>
      </div>
  )
}

function WorkspaceItem({item, onRemove, onClick}) {
  return (
      <div className="WorkspaceItem flex mt1 items-center p1">
        <div className="flex-column" style={{flex: 1, cursor: "pointer"}}
             onClick={onClick}>
          <h3 className="m0">{item.title}</h3>
          <p className="m0">{item.description}</p>
        </div>
        <Button content="remove" onClick={onRemove}/>
      </div>
  )
}

function NewWorkspaceModal({open, onClose, onConfirm}) {
  const {user} = useAuth()

  const [workspace, setWorkspace] = useState({
    title: "",
    description: ""
  })

  const handleFormChange = useCallback(e => {
    setWorkspace(s => ({...s, [e.target.name]: e.target.value}))
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    onConfirm?.({...workspace, username: user.username})
    onClose?.()
  }, [onConfirm, workspace, user])

  return (
      <Modal open={open} onClose={onClose} title={"New Workspace"}>
        <form onSubmit={handleSubmit} onChange={handleFormChange}>
          <div>
            <Input label="Title" name={"title"} required autoFocus/>
            <Input textArea label="Description" name={"description"} required/>
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