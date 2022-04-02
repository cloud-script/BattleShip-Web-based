
export async function sleep(msec: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

export function randString(length: number): String {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
