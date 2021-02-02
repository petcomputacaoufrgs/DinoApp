import React, { useState } from 'react'
import { ReactComponent as BACKGROUNDSVG } from '../../assets/dino/background.svg'
import Button from '../../components/button'
import Body from './body'
import { BodyAnimation, BodyColor } from './body/props'
import Catheter from './catheter'
import { CatheterPosition } from './catheter/props'
import Hat from './hat'
import { HatType } from './hat/props'
import Heart from './heart'
import Soap from './soap/index'
import { HeartType } from './heart/props'
import { SoapType } from './soap/props'
import './styles.css'

const COLORS: BodyColor[] = ['green', 'yellow', 'pink', 'blue']
const HAT_TYPES: HatType[] = ['none', 'tall_hat', 'cap']
const CATHETER_POSITIONS: CatheterPosition[] = ['none', 'right_arm', 'left_arm']
const HEART_TYPES: HeartType[] = ['none', 'default']
const SOAP_TYPES: SoapType[] = ['none', 'default']

const Dino: React.FC = () => {
  const [colorIndex, setColorIndex] = useState(0)
  const [hatIndex, setHatIndex] = useState(0)
  const [catheterPositionIndex, setCatheterPositionIndex] = useState(0)
  const [soapIndex, setSoapIndex] = useState(0)
  const [heartIndex, setHeartIndex] = useState(0)
  const [bodyAnimations, setBodyAnimations] = useState<BodyAnimation[]>([])

  const handleChangeHat = () => {
    if (hatIndex >= HAT_TYPES.length - 1) {
      setHatIndex(0)
    } else {
      setHatIndex(hatIndex + 1)
    }
  }

  const handleChangeColor = () => {
    if (colorIndex >= COLORS.length - 1) {
      setColorIndex(0)
    } else {
      setColorIndex(colorIndex + 1)
    }
  }

  const handleChangeCatheter = () => {
    if (catheterPositionIndex >= CATHETER_POSITIONS.length - 1) {
      setCatheterPositionIndex(0)
    } else {
      setCatheterPositionIndex(catheterPositionIndex + 1)
    }
  }

  const handleChangeHeart = () => {
    if (heartIndex >= HEART_TYPES.length - 1) {
      setHeartIndex(0)
    } else {
      setHeartIndex(heartIndex + 1)
    }
  }

  const handleChangeSoap = () => {
    if (soapIndex >= SOAP_TYPES.length - 1) {
      setSoapIndex(0)
    } else {
      setSoapIndex(soapIndex + 1)
    }
  }

  const handleChangeArmAnimation = () => {
    changeBodyAnimation('rotate_arms')
  }

  const changeBodyAnimation = (name: BodyAnimation) => {
    const index = bodyAnimations.findIndex(a => a === name)
    if (index >= 0) {
      bodyAnimations.splice(index, 1)
    } else {
      bodyAnimations.push(name)
    }
    setBodyAnimations([...bodyAnimations])
  }

  return (
    <div className='environment'>
      <div className='dino__buttons'>
        <Button onClick={handleChangeHat}>Change Hat</Button>
        <Button onClick={handleChangeColor}>Change Color</Button>
        <Button onClick={handleChangeCatheter}>Change Catheter</Button>
        <Button onClick={handleChangeHeart}>Change Heart</Button>
        <Button onClick={handleChangeSoap}>Change Soap</Button>
        <Button onClick={handleChangeArmAnimation}>Change Arm Animation</Button>
      </div>
      <BACKGROUNDSVG className='background' />
      <div className='dino'>
        <Body animations={bodyAnimations} color={COLORS[colorIndex]} />
        <Hat type={HAT_TYPES[hatIndex]} />
        <Catheter position={CATHETER_POSITIONS[catheterPositionIndex]} />
        <Soap type={SOAP_TYPES[soapIndex]} />
        <Heart type={HEART_TYPES[heartIndex]} />
      </div>
    </div>
  )
}

export default Dino

function useSate(): [any, any] {
  throw new Error('Function not implemented.')
}
