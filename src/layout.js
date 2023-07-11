// calc the prefix space
const prefixSpace = function (str) {
  const matched = /^\s+/gu.exec(str);

  return matched ? matched[0].length : 0;
};

// calc the tail space
const tailSpace = function (str) {
  const matched = /\s+$/gu.exec(str);

  return matched ? matched[0].length : 0;
};

// calc how many spaces need for indent for layout
// overwise the gap between two characters will be different
function calcIndent(lines, charLines) {
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
function appendCharacter({ lines, charLines, spacing }) {
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

function layout(str, dict, option) {
  const { spacing, maxLineWidth } = option;
  const chars = str.split("");
  const newChars = chars.map((c) => c.toLowerCase());

  const lines = [];
  for (const c of newChars) {
    lines.push(dict[c]?.lines);
  }
  const prints = [[...lines[0]]];

  for (let i = 1; i < lines.length; i++) {
    if (prints[prints.length - 1][0].length <= maxLineWidth) {
      prints[prints.length - 1] = appendCharacter({
        lines: prints[prints.length - 1],
        charLines: lines[i],
        spacing,
      });
    } else {
      prints.push(lines[i]);
    }
  }
  return prints.reduce((prev, i) => [...prev, ...i], []);
}

exports.layout = layout;
