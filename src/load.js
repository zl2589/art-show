function calcCharacterWidth(lines) {
  let minLeft = Infinity;
  let maxRight = -Infinity;

  // find the not space char in every line
  lines.forEach((l) => {
    let left = l.length;

    for (let i = 0; i < l.length; i++) {
      if (l[i] !== " ") {
        left = i;
        break;
      }
    }

    let right = 0;

    for (let i = l.length - 1; i >= 0; i--) {
      if (l[i] !== " ") {
        right = i;
        break;
      }
    }

    minLeft = Math.min(left, minLeft);
    maxRight = Math.max(right, maxRight);
  });

  return maxRight - minLeft + 1;
}

function formatCharacter(info, maxCharHeight) {
  const { codes, defs } = info;
  const content = codes.reduce((text, c) => text + String.fromCharCode(c), "");
  const lines = content.split("\n");

  // fill empty lines in case of short characters
  if (lines.length < maxCharHeight) {
    lines.push(...new Array(maxCharHeight - lines.length).fill(""));
  }

  const maxLen = lines.reduce((max, l) => Math.max(max, l.length), 0);

  // fill space in case of maxWidth
  for (let i = 0; i < lines.length; i++) {
    lines[i] += " ".repeat(maxLen - lines[i].length);
  }

  const maxWidth = calcCharacterWidth(lines);
  const infoFont = defs.map((def) => ({
    lines: [...lines],
    width: maxWidth,
    height: maxCharHeight,
    def,
  }));
  return infoFont;
}

function loadCharacters(fontFamily = "big") {
  let fontModule;
  try {
    fontModule = require(`../raw/${fontFamily}/${fontFamily}.js`);
  } catch (e) {
    throw Error(`FONT NOT FOUND (Font Family Default). \n`);
  }

  const fonts = fontModule.fonts;

  const maxCharHeight = fonts.reduce(
    (max, f) => Math.max(f.codes.filter((c) => c === 10).length + 1, max),
    0
  );

  return fonts.map((f) => formatCharacter(f, maxCharHeight));
}

const load = (option) => {
  const characters = loadCharacters(option?.fontFamily);

  let fontMap = {};
  characters
    .reduce((pre, next) => [...pre, ...next], [])
    .forEach((c) => {
      fontMap[c.def] = c;
    });
  return fontMap;
};

exports.load = load;
