import {useRouter} from "../../contexts/router.context";
import Button from "../common/Button";
import {dataActions, useData} from "../../contexts/data.context";
import {useCallback, useMemo, useState} from "react";

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