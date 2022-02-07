import {
  TEST2_SET_DATA
} from "../actions/test2Actions"

export function test2UpdateData (newData) {
  return {
    type: TEST2_SET_DATA,
    data: newData
  }
}