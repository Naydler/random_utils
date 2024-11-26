export function generateRandomNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error("El valor mínimo no puede ser mayor que el máximo.");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
