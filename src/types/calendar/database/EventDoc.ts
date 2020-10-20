import BaseDoc from '../../database/BaseDoc'

export default interface EventDoc extends BaseDoc {
  external_id?: number
  name: string
  description: string
  color: string
  init_date: Date
  end_date: Date
  reminder_alarm_ms: number
  type: number
}
