import { Basket } from 'src/models/Basket.js'

export default function () {
  return {
    basket: new Basket(),
    onRegisterClassroom: null,
    registerClassroomInvoice: null
  }
}
