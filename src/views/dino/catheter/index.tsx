import React from 'react'
import CatheterProps from './props'
import { ReactComponent as CatheterSVG } from '../../../assets/dino/cateter.svg'
import { ReactComponent as BandageSVG } from '../../../assets/dino/bandage.svg'
import './styles.css'

const Catheter: React.FC<CatheterProps> = ({
  position
}) => (
  <>
      {
      position === 'left_arm' ?
        <>
          <CatheterSVG className='dino__catheter_l'/>
          <BandageSVG className='dino__bandage_l'/>
        </>
      :
      position === 'right_arm' ?
        <>
          <CatheterSVG className='dino__catheter_r'/>
          <BandageSVG className='dino__bandage_r'/>
        </>
      :
      <></>
    }
  </>
)

export default Catheter