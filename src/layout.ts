import { FontRender, Option } from "./typing";

// calc the prefix space
const prefixSpace = function (str: string) {
  const matched = /^\s+/gu.exec(str);

  return matched ? matched[0].length : 0;
};

// calc the tail space
const tailSpace = function (str: string) {
  const matched = /\s+$/gu.exec(str);

  return matched ? matched[0].length : 0;
};

// calc how many spaces need for indent for layout
// overwise the gap between two characters will be different
function calcIndent(lines: string[], charLines: string[]) {
  // maximum indent that won't break the layout
  let minIndent = Infinity;

  for (let i = 1; i < lines.length; i++) {
    const formerTailNum = tailSpace(lines[i]);
    const letterPrefixNum = prefixSpace(charLines[i]);

    minIndent = Math.min(minIndent, formerTailNum + letterPrefixNum);
  }

  return minIndent;
}

// append a new character and adjust the indent
function appendCharacter({ lines, charLines, spacing }: { lines: string[], charLines: string[], spacing: number }) {
  const indent = calcIndent(lines, charLines);

  return lines.map((l, i) => {
    const allowIndent = tailSpace(l);
    const charPrefixSpace = prefixSpace(charLines[i]);
    const spaceNeedRetain = allowIndent + charPrefixSpace - indent + spacing;

    return (
      l.replace(/\s+$/gu, "") +
      " ".repeat(spaceNeedRetain) +
      charLines[i].replace(/^\s+/gu, "")
    );
  });
}

export function layout(str: string, dict: Record<string, FontRender>, option: Option) {
  const { spacing = 1, maxLineWidth } = option;
  const chars = str.split("");
  const newChars = chars.map((c) => c.toLowerCase());

  const lines: string[][] = [];
  for (const c of newChars) {
    lines.push(dict[c]?.lines);
  }
  const prints = [[...lines[0]]];
  let lineWid = dict[newChars[0]]?.width;

  for (let i = 1; i < lines.length; i++) {
    const c = newChars[i];
    lineWid += dict[c]?.width;
    if (lineWid <= maxLineWidth) {
      prints[prints.length - 1] = appendCharacter({
        lines: prints[prints.length - 1],
        charLines: lines[i],
        spacing,
      });
    } else {
      prints.push(lines[i]);
      const c = newChars[i];
      lineWid = dict[c]?.width;
    }
  }
  return prints.reduce((prev, i) => [...prev, ...i], []);
}
