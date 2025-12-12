import { BsCalendar2Event, BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../Modal/BecomeSellerModal'
import { MdAccountBox, MdPayment } from 'react-icons/md'
// import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
const MemberMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuItem icon={MdAccountBox} 
      label='My Clubs' 
      address='member-clubs' 
      />
      <MenuItem icon={BsCalendar2Event} 
      label='My Events' 
      address='member-events' 
      />
      <MenuItem icon={MdPayment} 
      label='Payments' 
      address='member-payments' 
      />
    </>
  )
}

export default MemberMenu
