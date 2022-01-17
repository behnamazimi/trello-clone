import {useRouter} from "../../contexts/router.context";

export default function Login() {
  const router = useRouter()

  console.log(router);
  return (
      <div>
        Login

        <button onClick={() => router.navigate("/profile")}>To Profile</button>
      </div>
  )
}