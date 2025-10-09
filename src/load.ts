import { FontRender, FontResolve, Option } from "./typing";

function calcCharacterWidth(lines: string[]) {
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

function formatCharacter(info: FontResolve, maxCharHeight: number) {
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

async function loadCharacters(fontFamily = "big") {
  if (!["alpha", "big", "crazy"].includes(fontFamily)) {
    throw Error(`Font Family ${fontFamily} is not supported. \n`);
  }
  let _fonts: FontResolve[];
  try {
    // @vite-ignore
    const { fonts, name } = await import(`../rawjs/${fontFamily}.js`);
    _fonts = fonts;
  } catch (e) {
    throw Error(`FONT NOT FOUND (Font Family ${fontFamily}). \n`);
  }

  if (!_fonts || !Array.isArray(_fonts)) {
    throw new Error("Invalid font module structure.");
  }

  const maxCharHeight = _fonts.reduce(
    (max, f) => Math.max(f.codes.filter((c) => c === 10).length + 1, max),
    0
  );

  return _fonts.map((f) => formatCharacter(f, maxCharHeight));
}

export const load = async (option: Option) => {
  const characters = await loadCharacters(option?.fontFamily);

  let fontMap: Record<string, FontRender> = {};
  characters
    .reduce((pre, next) => [...pre, ...next], [])
    .forEach((c) => {
      fontMap[c.def] = c;
    });
  return fontMap;
};
