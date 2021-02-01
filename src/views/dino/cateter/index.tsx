import React from 'react'
import CateterProps from './props'
import { ReactComponent as CatheterSVG } from '../../../assets/dino/cateter.svg'
import { ReactComponent as BandageSVG } from '../../../assets/dino/bandage.svg'
import './styles.css'

const Cateter: React.FC<CateterProps> = ({
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

export default Cateter