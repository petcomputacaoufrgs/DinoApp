import React from 'react'
import HeartProps from './props'
import {ReactComponent as HeartSVG} from '../../../assets/dino/heart.svg'
import './styles.css'

const Heart: React.FC<HeartProps> = ({
  type
}) => (
  <>
    {
    type === 'default' ?
      <>
      <HeartSVG className='dino__default_heart__1'/>
      <HeartSVG className='dino__default_heart__2'/>
      </>
    :
    <></>
  }
  </>
)

export default Heart