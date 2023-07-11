art-show v1.0.0
===========================

## Installation

Using npm:

```js
$ npm i --save art-show
```



## Examples

```javascript
import {
    NumberToLower,
  	NumberToUpper,
  	rmb,
} from 'art-show';

// 数字转中文小写
NumberToLower(5564561); // 五百五十六万四千五百六十一
// 数字转中文大写
NumberToUpper(5564561); // 伍佰伍拾陆万肆仟伍佰陆拾壹元
// 数字转人民币格式化
rmb._(100) //无符号无小数
rmb.s(100) //有符号无小数
rmb.p(100) //无符号有小数
rmb.sp(100) //有符号有小数
```



