import { FaUserCog, FaUserTag } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { Menu } from 'lucide-react'
import { MdOutlinePayment } from 'react-icons/md'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} 
      label='Manage Users' 
      address='manage-users' 
      />
      
      <MenuItem
        icon={FaUserTag}
        label='Manage Clubs'
        address='manage-clubs'
      />
      <MenuItem
        icon={MdOutlinePayment}
        label='Payments'
        address='payments'
      />
    </>
  )
}

export default AdminMenu
