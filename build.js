const fs = require('fs');
const path = require('path');

// @ts-ignore
const BUILD_RAW_DIR = path.resolve(__dirname, ".", "raw");
const WRITE_DIR = path.resolve(__dirname, ".", "rawjs");

// 解析字义
function parseDefinition(line) {
  let token = "";
  let defs = [];
  for (let char of line) {
    if (char === " " && token) {
      defs.push(token);
      token = "";
    }
    if (char !== " ") {
      token += char;
    }
  }
  if (token) {
    defs.push(token);
  }
  return defs;
}

// 字体对象
function parse(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
  } catch (err) {
    console.error("No Read access");
    return;
  }
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    // const matched = /^(?<def>.+?)\n(?<char>[^]*)/u.exec(data);
    const matched = /^(?<def>[^\n\r]+)[\r\n]{1,2}(?<char>[\s\S]+)/.exec(
      data
    );

    if (!matched || !matched?.groups?.def || !matched.groups.char) {
      throw Error("Can't parse the content. Its may be in wrong format.");
    }

    const rawDef = matched.groups.def;
    const content = matched.groups.char;
    const defs = parseDefinition(rawDef);

    return {
      defs,
      content,
    };
  } catch (err) {
    console.log("文件读取失败");
    return;
  }
}

// 处理字型
const arrayToString = (arr) =>
  "[" +
  arr?.map((d) => (typeof d === 'string' ? `'${d}'` : d)).join(",") +
  "]";

function handleFile(fontDir, cb) {
  const files = fs.readdirSync(fontDir);
  const filePaths = files.map((name) => path.resolve(fontDir, name));
  let n = files.length;
  const ret = [];
  while (n--) {
    const filePath = filePaths.shift();

    if (!filePath) {
      break;
    }
    ret.push(cb(filePath));
  }
  return ret;
}

function buildCharacterModules(fontDir, fontName, writeDir) {
  let parsedFonts = [];
  const wFilePath = path.resolve(writeDir, `${fontName}.js`);

  try {
    if (fs.existsSync(wFilePath)) {
      fs.unlinkSync(wFilePath);
    }
  } catch (err) {
    console.log("删除文件失败");
  }

  handleFile(fontDir, (filePath) => {
    const info = parse(filePath);
    if (!!info) {
      const { defs, content } = info;
      const codes = [];
      for (const c of content) {
        codes.push(c.charCodeAt(0));
      }

      parsedFonts.push({
        defs,
        codes,
        content,
      });
    }
  });

  const text = parsedFonts?.reduce((t, f, idx) => {
    return (
      t +
      ("\n/**\n" +
        f.content +
        "\n*/\n" +
        `fonts[${idx}] = {\n` +
        `  defs:${arrayToString(f?.defs)},\n` +
        `  codes:${arrayToString(f?.codes)}\n` +
        "};\n")
    );
  }, "");

  const moduleText =
    "const fonts = [];\n" +
    text +
    "module.exports.fonts = fonts;\n" +
    `module.exports.name = '${fontName}';\n`;
  try {
    fs.writeFileSync(wFilePath, moduleText, { flag: "w+", encoding: "utf-8" });
  } catch (err) {
    console.log("写入文件失败");
  }
}

// 构建字体模块
const rawDirs = fs.readdirSync(BUILD_RAW_DIR);
rawDirs.forEach((dir) => {
  const fontDir = path.resolve(BUILD_RAW_DIR, dir);
  buildCharacterModules(fontDir, dir, WRITE_DIR);
});
