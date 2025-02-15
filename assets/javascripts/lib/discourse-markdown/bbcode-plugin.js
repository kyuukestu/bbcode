/**
 * Processes inputted BBCode string using custom configured 3rd party library (see /bbcode-src)
 * @param {string} raw content to preprocess into HTML
 * @returns processed HTML string to pass into markdown-it
 */
function preprocessor(raw, opts) {
  // eslint-disable-next-line no-undef
  if (!bbcodeParser) {
    // parser doesn't exist. Something horrible has happened and somehow the parser wasn't imported/initialized
    // give up and send it straight back.
    // eslint-disable-next-line no-console
    console.warn(
      "Attempted to get the bbcode parser: does not exist. Defaulting to standard markdown-it.",
      "\ncalled on: \n",
      raw
    );
    return raw;
  }
  const parser = globalThis.bbcodeParser.RpNBBCode;

  const processed = parser(raw, opts);
  return processed.html;
}

export function setup(helper) {
  if (!helper.markdownIt) {
    return;
  }

  helper.registerOptions((opts, siteSettings) => {
    opts.features["bbcode-parser"] = siteSettings.bbcode_enabled;
    if (opts.engine || !siteSettings.bbcode_enabled) {
      return;
    }

    //Add check site settings for options to send to RpNBBCode
    let preprocessor_options = {
      preserveWhitespace:
        siteSettings.preserve_whitespace &&
        !siteSettings.discourse_normalize_whitespace,
    };

    Object.defineProperty(opts, "engine", {
      configurable: true,
      set(engine) {
        const md = engine.render;
        engine.set({ breaks: false }); // disable breaks. Let BBob handle line breaks.
        engine.render = function (raw) {
          const preprocessed = preprocessor(raw, preprocessor_options);
          const processed = md.apply(this, [preprocessed]);
          return processed;
        };
        Object.defineProperty(opts, "engine", {
          configurable: true,
          enumerable: true,
          writable: true,
          value: engine,
        });
      },
    });
  });

  helper.registerPlugin((md) => {
    // disable paragraph rendering
    md.renderer.rules.paragraph_open = function () {
      return "";
    };
    md.renderer.rules.paragraph_close = function () {
      return "";
    };
  });

  helper.allowList([
    "div.bb-background",
    "div.bb-border",
    "div.bb-center",
    "div.bb-check",
    "div.bb-email",
    "div.bb-email-address",
    "div.bb-email-button",
    "div.bb-email-content",
    "div.bb-email-footer",
    "div.bb-email-header",
    "div.bb-email-subject",
    "div.bb-justify",
    "div.bb-left",
    "div.bb-newspaper",
    "div.bb-note",
    "div.bb-note-content",
    "div.bb-note-footer",
    "div.bb-note-tape",
    "div.bb-ooc",
    "div.bb-right",
    "div.bb-side",
    "div.bb-spoiler-content",
    "div[style=*]",
    "details.bb-spoiler",
    "h1.bb-header",
    "h2.bb-header-2",
    "h3.bb-header-3",
    "h4.bb-header-4",
    "h5.bb-header-5",
    "h6.bb-header-6",
    "span.bb-divide",
    "span.bb-inline-spoiler",
    "span.bb-highlight",
    "span.bb-pindent",
    "span[style=*]",
    "summary",
  ]);
}
