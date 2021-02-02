import React from 'react'
import {ReactComponent as Dino} from '../../../assets/dino/dino.svg'
import BodyProps from './props'
import './styles.css'

const Body: React.FC<BodyProps> = ({
  color,
  animations
}) => {
  const getAnimations = (): string => {
    if (animations) return animations.join(' ')
    return ''
  }

  return (
    <Dino className={`dino__body ${color} ${getAnimations()}`}/>
  )
}

export default Body