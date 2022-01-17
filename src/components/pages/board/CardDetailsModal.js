import Modal from "../../common/Modal";
import Input from "../../common/Input";
import {dataActions, useData} from "../../../contexts/data.context";

export default function CardDetailsModal() {

  const {state, dispatch} = useData()

  const handleCardChange = (key, value) => {
    dispatch({
      type: dataActions.updateCard,
      payload: {...state.activeCard, [key]: value}
    })
  }

  const handleClose = () => {
    dispatch({
      type: dataActions.setActiveCard,
      payload: null
    })
  }

  const targetCard = state.activeCard
  if (!targetCard) return null

  return (
      <Modal open={true} className="CardDetailsModal p2" title={"Card Details"}
             onClose={handleClose}>
        <Input placeholder={"Title"} value={targetCard.title || ""}
               onChange={(e) => handleCardChange("title", e.target.value)}
               autoFocus/>

        <Input textArea placeholder={"Content"} value={targetCard.content || ""}
               onChange={(e) => handleCardChange("content", e.target.value)}/>

      </Modal>
  )
}
