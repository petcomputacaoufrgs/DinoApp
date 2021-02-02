export type BodyAnimation = 'rotate_arms'
export type BodyColor = 'green' | 'yellow' | 'orange' | 'aqua' | 'pink' | 'purple' | 'red' | 'blue'

export default interface BodyProps {
  color: BodyColor
  animations?: BodyAnimation[]
}