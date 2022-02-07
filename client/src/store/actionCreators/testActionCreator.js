import {
  TEST_SET_DATA,
  TEST_SET_FORM
} from "../actions/testActions"

export function testUpdateData () {
  return {
    type: TEST_SET_DATA
  }
}

export function testUpdateForm (name, value) {
  return {
    type: TEST_SET_FORM,
    data: {name, value}
  }
}