import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdAppRegistration, MdEventNote, MdHomeWork, MdManageAccounts, MdOutlineManageHistory } from 'react-icons/md'
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
       icon={MdManageAccounts}
       label='Event Management'
       address='event-management'
      />
      <MenuItem icon={MdAppRegistration} 
      label='Event Registrations'
       address='event-registrations' 
       />
      
    </>
  )
}

export default SellerMenu
