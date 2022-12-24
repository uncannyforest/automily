const GET_ERRORS = 'GET_ERRORS'

export const getErrors = (errData) => ({
  type: GET_ERRORS,
  payload: errData,
})

const initialState = {}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload
    default:
      return state
  }
}
