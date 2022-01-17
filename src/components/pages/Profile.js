import {useRouter} from "../../contexts/router.context";

export default function Profile(){
  const {currentPath, navigate} = useRouter()

  console.log(currentPath);
  return (
      <div>
        Profile

        <button onClick={() => navigate("/b/board-one")}>To Board Details</button>
      </div>
  )
}