import {useRouter} from "../../contexts/router.context";

export default function Board() {
  const {location, navigate} = useRouter()

  console.log(location.params);
  return (
      <div>
        Profile

        <button onClick={() => navigate("/profile")}>To Profile</button>
      </div>
  )
}