import Button from "../../common/Button";
import {dataActions, useData} from "../../../contexts/data.context";
import {useRouter} from "../../../contexts/router.context";
import {useCallback} from "react";

export default function Workspaces() {
  const {state, dispatch} = useData()
  const {navigate} = useRouter()

  const handleWorkspaceClick = useCallback((key) => {
    navigate(`/w/${key}`)
  }, [navigate])

  const handleWorkspaceRemove = useCallback((key) => {
    dispatch({
      type: dataActions.removeWorkspace,
      payload: key
    })
  }, [dispatch])

  return (
      <div className="Workspaces p2">
        <div className="flex justify-between items-center">
          <h2>Workspaces</h2>
          <Button>Add New</Button>
        </div>

        <div>
          {(state.workspaces && !!state.workspaces.length) &&
          state.workspaces.map(w => (<WorkspaceItem key={w.key} item={w}
                                                    onRemove={handleWorkspaceRemove.bind(this, w.key)}
                                                    onClick={handleWorkspaceClick.bind(this, w.key)}/>))}

          {(!state.workspaces || !state.workspaces.length) &&
          <p>No Workspaces. Add new one</p>}
        </div>
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