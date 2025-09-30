# art-show

## Installation

Using :

```bash
$ npm install art-show
```

## Examples

```javascript
import { createArts } from "art-show";

createArts("nan");
createArts("nan", { fontFamily: "crazy" });
```
或者
```javascript
const { createArts } = require("art-show");

createArts("nan");
createArts("nan", { fontFamily: "crazy" });

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
createArts("nanchen123", { spacing: 10, maxLineWidth: 30 });
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
* 增加 ESM 和 CommonJS 支持。

## Fonts
* alpha
* big
* crazy