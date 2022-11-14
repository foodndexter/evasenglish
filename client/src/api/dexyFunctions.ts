export const getrgba = (rgb: string) => {
  let color = rgb.replace(")", ",.1)")
  return (color = color.replace("(", "a("))
}
