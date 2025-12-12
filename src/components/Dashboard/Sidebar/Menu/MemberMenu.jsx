import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import MenuItem from './MenuItem'
import { useState } from 'react'
import BecomeSellerModal from '../../Modal/BecomeSellerModal'
// import BecomeSellerModal from '../../../Modal/BecomeSellerModal'
const MemberMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MenuItem icon={BsFingerprint} 
      label='My Clubs' 
      address='member-clubs' 
      />
    </>
  )
}

export default MemberMenu
