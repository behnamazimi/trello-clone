import {useAuth} from "../../../contexts/auth.context";

export default function Workspaces() {
  const auth = useAuth()
  console.log(auth);
  return (
      <div>
        Workspaces
      </div>
  )
}