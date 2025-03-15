# art-show v1.1.3

## Installation

Using :

```bash
$ npm install art-show
```

## Examples

```javascript
import artShow from "art-show";
// 或者
const artShow = require("art-show");

// 由于使用 tsc 编译不同的格式，CommonJS模块默认导出是 exports default
artShow.default.createArts("nan");
artShow.default.createArts("nan", { fontFamily: "crazy" });

```

```
  _   _              _   _ 
 | \ | |     /\     | \ | |
 |  \| |    /  \    |  \| |
 | . ` |   / /\ \   | . ` |
 | |\  |  / ____ \  | |\  |
 |_| \_| /_/    \_\ |_| \_|


   _..._                  _..._
 .'     '.              .'     '.
.   .-.   .            .   .-.   .
|  '   '  |     __     |  '   '  |
|  |   |  |  .:--.'.   |  |   |  |
|  |   |  | / |   \ |  |  |   |  |
|  |   |  | `" __ | |  |  |   |  |
|  |   |  |  .'.''| |  |  |   |  |
|  |   |  | / /   | |_ |  |   |  |
|  |   |  | \ \._,\ '/ |  |   |  |
'--'   '--'  `--'  `"  '--'   '--'
```



### Others

```javascript
artShow.createArts("nanchen123", { spacing: 10, maxLineWidth: 30 });
```

```
  _   _                                _   _ 
 | \ | |              /\              | \ | |
 |  \| |             /  \             |  \| |
 | . ` |            / /\ \            | . ` |
 | |\  |           / ____ \           | |\  |
 |_| \_|          /_/    \_\          |_| \_|
   _____            _    _            ______
  / ____|          | |  | |          |  ____|
 | |               | |__| |          | |__
 | |               |  __  |          |  __|
 | |____           | |  | |          | |____
  \_____|          |_|  |_|          |______|
  _   _            __            ___             ____
 | \ | |          /_ |          |__ \           |___ \
 |  \| |           | |             ) |            __) |
 | . ` |           | |            / /            |__ <
 | |\  |           | |           / /_            ___) |
 |_| \_|           |_|          |____|          |____/
```


## Feature
* 此次新增alpha字体包，并基于typescript重构了项目，便于维护。
* 增加 ESM 和 CommonJS 支持

## Fonts
* alpha
* big
* crazy