import { createPreset } from "@bbob/preset";
import { alignment } from "./tags/alignment";
import { bg } from "./tags/background";
import { blockquote } from "./tags/blockquote";
import { border } from "./tags/border";
import { check } from "./tags/check";
import { code, icode, savenl } from "./tags/code";
import { color } from "./tags/color";
import { divide } from "./tags/divide";
import { font } from "./tags/font";
import { h, h1, h2, h3, h4, h5, h6, sh } from "./tags/header";
import { heightrestrict } from "./tags/heightrestrict";
import { highlight } from "./tags/highlight";
import { imagefloat } from "./tags/imagefloat";
import { justify } from "./tags/justify";
import { mail } from "./tags/mail";
import { newspaper } from "./tags/newspaper";
import { br, nobr } from "./tags/lineBreak";
import { note } from "./tags/note";
import { ooc } from "./tags/ooc";
import { pindent } from "./tags/pindent";
import { plain } from "./tags/plain";
import { scroll } from "./tags/scroll";
import { side } from "./tags/side";
import { size } from "./tags/size";
import { sub } from "./tags/subscript";
import { sup } from "./tags/superscript";
import { inlinespoiler, spoiler } from "./tags/spoiler";

const tags = {
  ...alignment,
  bg,
  blockquote,
  border,
  br,
  check,
  code,
  color,
  divide,
  font,
  h,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  heightrestrict,
  highlight,
  icode,
  imagefloat,
  inlinespoiler,
  justify,
  mail,
  newspaper,
  nobr,
  note,
  ooc,
  pindent,
  plain,
  savenl,
  sh,
  scroll,
  side,
  size,
  spoiler,
  sub,
  sup,
};

const availableTags = Object.keys(tags);
const preventParsing = ["plain", "code", "icode"];

const preset = createPreset(tags);

export { availableTags, tags, preset, preventParsing };
export default preset;
