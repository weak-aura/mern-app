export const translateX = {
  initial: (i: number) => ({
    x: (i * (70 + 14.5)),
  }),
  animate: (i: number) => ({
    x: (i * (70 + 14.5)),
    transition: {duration: 0.3}
  })
}

export const translateY = {
  initial: (i: number) => ({
    y: i * 40,
  }),
  animate: (i: number) => ({
    y: i * 40,
    transition: {duration: 0.3}
  })
}

export const mountAnim = {"initial": "initial", "animate": "animate"};