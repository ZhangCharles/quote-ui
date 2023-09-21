import { generate } from "./Generate";
import { paresToEntity } from "./Parse";

async function getImg(json:any) {
  const entities = await paresToEntity(json)
  return (await generate(json, entities)).img
}

export { getImg }