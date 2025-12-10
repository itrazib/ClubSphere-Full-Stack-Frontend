import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdEventNote, MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
import { Menu } from 'lucide-react'
const SellerMenu = () => {
  return (
    <>
    
    <MenuItem
        icon={MdEventNote}
        label='My Clubs'
        address='my-clubs'
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Club Members'
        address='club-members'
      />
      <MenuItem
       icon={MdEventNote}
       label='Event Management'
       address='event-management'
      />
      <MenuItem icon={MdHomeWork} 
      label='Event Registrations'
       address='event-registrations' 
       />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
    </>
  )
}

export default SellerMenu
