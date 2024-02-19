const toNode = (tag, attrs, content) => ({
  tag,
  attrs,
  content,
});

/**
 * Preprocess attributes of a node to either combine all values into a single default value
 * or return a keyed attribute list
 * @param {any} attrs object of bbcode node attrs
 * @param {string[]} predefinedKeys array of predefined keys to be captured
 * @returns processed attributes
 */
const preprocessAttr = (attrs) => {
  const keys = Object.keys(attrs).join(" ");
  const vals = Object.values(attrs).join(" ");
  if (keys === vals) {
    return {
      _default: vals,
    };
  } else {
    return attrs;
  }
};

/**
 * Given a string, find the first position of a regex match
 * @param {string} string to test against
 * @param {RegExp} regex to test with
 * @param {number} startpos starting position. Defaults to 0
 * @returns index of the first match of the regex in the string
 */
const regexIndexOf = (string, regex, startpos) => {
  const indexOf = string.substring(startpos || 0).search(regex);
  return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
};

const MD_NEWLINE_INJECT = "<!-- bbcode injected newlines -->\n\n";
const MD_NEWLINE_PRE_INJECT = "\n\n<!-- bbcode pre injected newlines -->";

const URL_REGEX =
  /(http|ftp|https|upload):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
const MD_URL_REGEX =
  /\!?\[.*\]\((http|ftp|https|upload):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])\)/;
const URL_REGEX_SINGLE_LINE = new RegExp(
  `^${URL_REGEX.source}|${MD_URL_REGEX.source}$`
);
const ESCAPABLES_REGEX =
  /((\n|^)(?<fence>```+|~~~+)(?<fenceInfo>.*\n))|(?<bbcode>\[(?<bbcodeTag>i?code|plain)(=.*)?\]|(.*?(?<backtick>(?<tickStart>`{1,2})(.*)(?<tickEnd>\k<tickStart>)).*?))/m;

export {
  toNode,
  preprocessAttr,
  regexIndexOf,
  MD_NEWLINE_INJECT,
  MD_NEWLINE_PRE_INJECT,
  URL_REGEX,
  MD_URL_REGEX,
  URL_REGEX_SINGLE_LINE,
  ESCAPABLES_REGEX,
};
