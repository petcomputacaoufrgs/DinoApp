import React from 'react'
import { ReactComponent as BACKGROUNDSVG } from '../../assets/dino/background.svg'
import { ReactComponent as DINOSVG } from '../../assets/dino/dino.svg'
import Cateter from './cateter'
import Hat from './hat'
import Heart from './heart'
import Soap from './soap/index'
import './styles.css'

const Dino: React.FC = () => {
  return (
    <div className='environment'>
      <BACKGROUNDSVG className='background' />
      <div className='dino'>
        <DINOSVG className='dino__body'/>
        <Hat type='cap' />
        <Cateter position='right_arm' />
        <Soap type='none' />
        <Heart type='default' />
      </div>
    </div>
  )
}

export default Dino