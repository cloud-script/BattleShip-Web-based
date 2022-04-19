// Constants && types
import { ShipsList } from "../enumerators/game.constant";
import type { Ship } from "../enumerators/game.enums";

export function randomInt(max: number, min = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randString(length: number): String {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function createImageEle(file_name: String): HTMLImageElement {
  let img_element = document.createElement("img");
  img_element.src = `./assets/${file_name}.svg`;
  img_element.style.userSelect = "none";
  return img_element;
}

export function lengthToShipName(length: number): Ship {
  return ShipsList.find((_, index) => 5 - index === length);
}
