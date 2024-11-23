import { Basket } from 'src/models/Basket'

export function updateBasket (state, newInfo) {
  state.basket = newInfo
}

export function clearBasket (state) {
  state.basket = new Basket()
}

export function updateOnRegisterClassroom (state, newInfo) {
  state.onRegisterClassroom = newInfo
}

export function updateRegisterClassroomInvoice (state, newInfo) {
  state.registerClassroomInvoice = newInfo
}
