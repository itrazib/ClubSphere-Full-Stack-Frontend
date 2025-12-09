import Loading from '../components/Loader/Loading'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loading />
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

export default PrivateRoute
