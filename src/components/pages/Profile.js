import {useAuth} from "../../contexts/auth.context";
import {useRouter} from "../../contexts/router.context";
import {useCallback} from "react";

export default function Profile() {
  const {user, logout} = useAuth()
  const {navigate} = useRouter()

  const handleLogout = useCallback(() => {
    logout(null)
    navigate("/login")
  }, [navigate, logout])

  return (
      <div className="Profile p2">
        <div className="flex flex-column">
          <h4 className="m0">{user?.fullName}</h4>
          <p className="m0">{user?.username}</p>
        </div>

        <div className="mt2">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
  )
}