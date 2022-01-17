import {useRouter} from "../../contexts/router.context";

export default function Profile(){
  const {currentPath, navigate} = useRouter()

  console.log(currentPath);
  return (
      <div>
        Profile

        <button onClick={() => navigate("/login")}>To Login</button>
      </div>
  )
}