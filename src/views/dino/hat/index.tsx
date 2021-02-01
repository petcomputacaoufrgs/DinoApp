import React from 'react'
import HatProps from './props'
import { ReactComponent as CapSVG } from '../../../assets/dino/cap.svg'
import { ReactComponent as TallHatSVG } from '../../../assets/dino/tall_hat.svg'
import './styles.css'

const Hat: React.FC<HatProps> = ({
  type
}) => {
  return (
    <>
    {
      type === 'tall_hat' ?
        <TallHatSVG className='dino__tall_hat'/>
      :
      type === 'cap' ?
        <CapSVG className='dino__cap' />
      :
      <></>
    }
    </>
  )
}

export default Hat