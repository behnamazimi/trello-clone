import Modal from "../../common/Modal";
import Input from "../../common/Input";
import {dataActions, useData} from "../../../contexts/data.context";
import Button from "../../common/Button";
import {useMemo, useState} from "react";
import Select from "../../common/Select";
import {useAuth} from "../../../contexts/auth.context";

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
        <div className="border-bottom pb1">
          <Input placeholder={"Title"} value={targetCard.title || ""}
                 onChange={(e) => handleCardChange("title", e.target.value)}
                 autoFocus/>

          <Input textArea placeholder={"Content"} value={targetCard.content || ""}
                 onChange={(e) => handleCardChange("content", e.target.value)}/>
        </div>

        <CardMembers card={targetCard}
                     onAdd={(newMember) => handleCardChange("members", [...targetCard.members, newMember])}
                     onRemove={(member) => handleCardChange("members", targetCard.members.filter(m => m !== member))}/>

        <CardLabels card={targetCard}
                    onAdd={(newLbl) => handleCardChange("labels", [...targetCard.labels, newLbl])}
                    onRemove={(lbl) => handleCardChange("labels", targetCard.labels.filter(m => m !== lbl))}/>

      </Modal>
  )
}


function CardMembers({card, onRemove, onAdd}) {
  const {user} = useAuth()
  const [newMember, setNewMember] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd?.(newMember)
    setNewMember("")
  }

  return (
      <div className="CardMembers border-bottom py1">
        {(card.members || []).map((member, key) =>
            <div className="member mb1" key={key}>
              {member}
              {member !== user.username &&
              <Button onClick={e => onRemove?.(member)} content={"x"}/>}
            </div>)}

        <form onSubmit={handleSubmit}>
          <Input placeholder={"Type and enter to add member"}
                 required
                 value={newMember} onChange={e => setNewMember(e.target.value)}/>
        </form>
      </div>
  )
}

function CardLabels({card, onRemove, onAdd}) {
  const {state, getLabelsByKeys} = useData()
  const [label, setLabel] = useState("")

  const cardLabels = useMemo(() => getLabelsByKeys(card.labels), [card])

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd?.(label)
    setLabel("")
  }

  return (
      <div className="CardLabels border-bottom py1">
        {cardLabels.map((label, key) =>
            <div className="label mb1" key={key}>
              {label.title}
              <Button onClick={e => onRemove?.(label.key)} content={"x"}/>
            </div>)}

        <form onSubmit={handleSubmit}>
          <Select label={"label"}
                  required
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  options={state.labels}/>
          <Button content="Add"/>
        </form>
      </div>
  )
}