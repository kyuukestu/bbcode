import { createPreset } from "@bbob/preset";
import { font } from "./tags/font";
import { nobr } from "./tags/nobr";
import { inlinespoiler } from "./tags/inlinespoiler";

const tags = {
  font,
  nobr,
  ...inlinespoiler
};

const availableTags = Object.keys(tags);

const preset = createPreset(tags);

export { availableTags, tags, preset };
export default preset;
