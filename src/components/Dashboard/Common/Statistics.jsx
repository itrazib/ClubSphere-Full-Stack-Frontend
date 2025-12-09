
import useRole from '../../../hooks/useRole'
import Loading from '../../Loader/Loading'
import AdminStatistics from '../Statistics/AdminStatistics'
import ClubManagerStatistics from '../Statistics/ClubManagerStatistics'
import MemberStatistics from '../Statistics/MemberStatistics'
const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <Loading />
  return (
    <div>
      {role === 'member' && <MemberStatistics />}
      {role === 'clubManager' && <ClubManagerStatistics />}
      {role === 'admin' && <AdminStatistics />}
    </div>
  )
}

export default Statistics
