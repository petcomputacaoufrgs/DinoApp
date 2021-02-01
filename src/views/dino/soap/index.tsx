import React from 'react'
import SoapProps from './props'
import { ReactComponent as SoapSVG } from '../../../assets/dino/soap.svg'
import { ReactComponent as SoapBubblesSVG } from '../../../assets/dino/soap_bubbles.svg'
import './styles.css'

const Soap: React.FC<SoapProps> = ({
  type
}) => (
  <>      
  {
    type === 'default' ?
      <>
      <SoapBubblesSVG className='dino__default_soap_bubbles'/>
      <SoapSVG className='dino__default_soap'/>
      </>
    :
    <></>
  }
  </>
)

export default Soap