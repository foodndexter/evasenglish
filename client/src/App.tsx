import { Suspense, lazy, useState, useEffect } from "react"
import { fetchSetting } from "./api"
import { Init, Layout } from "./components"
import { authService } from "./firebase"
import { useAppDispatch } from "./redux/hooks"

const AppRouter = lazy(() => import("./AppRouter"))

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        user.email && fetchSetting(user.email)
      }
    })
    // setTimeout(() => {
    //   setIsLoading(true)
    // }, 3000)
  }, [])

  const fallback = () => <Init state={isLoading} />
  return (
    <Suspense fallback={fallback()}>
      <Init state={isLoading} />
      <Layout>
        <AppRouter />
      </Layout>
    </Suspense>
  )
}

export default App
