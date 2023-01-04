const coords = (rabbit, input) => {
  if (input.x === undefined && input.y === undefined)
    return { x: rabbit.x, y: rabbit.y }
  if (input.abs) {
    input = { x: rabbit.x, y: rabbit.y, ...input }
    return { x: input.x, y: input.y }
  } else {
    input = { x: 0, y: 0, ...input }
    return { x: rabbit.x + input.x, y: rabbit.y + input.y }
  }
}

const rabbitCoords = (rabbit, input) => {
  const tempCoords = coords(rabbit, input)
  if (!input.stationary) {
    rabbit.x = tempCoords.x
    rabbit.y = tempCoords.y
  }
  return tempCoords
}

export { coords, rabbitCoords }
