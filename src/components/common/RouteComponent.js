import React, {useMemo, Suspense, lazy} from "react"
import {Link} from "../../contexts/router.context";
import {useAuth} from "../../contexts/auth.context";

function ProtectedPage() {
  return (
      <div>
        <p>Protected page. Login needed.</p>
        <Link to="/login">Login</Link>
      </div>
  )
}

export default function RouteComponent({isPrivate = true, component}) {
  const {authorized} = useAuth()
  const Component = useMemo(() => {
    if ((isPrivate && authorized) || !isPrivate) {
      return lazy(() => import("./../../" + component))
    } else {
      return ProtectedPage
    }
  }, [component, authorized, isPrivate])

  return (
      <Suspense fallback={<span>Loading...</span>}>
        <Component/>
      </Suspense>
  )
}
