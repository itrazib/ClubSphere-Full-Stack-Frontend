
import useRole from '../../../hooks/useRole'
import Loading from '../../Loader/Loading'
import AdminStatistics from '../Statistics/AdminStatistics'
import ManagerOverview from '../Statistics/ManagerOverview'

import MemberStatistics from '../Statistics/MemberStatistics'
const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <Loading />
  return (
    <div>
      {role === 'member' && <MemberStatistics />}
      {role === 'clubManager' && <ManagerOverview />}
      {role === 'admin' && <AdminStatistics />}
    </div>
  )
}

export default Statistics
