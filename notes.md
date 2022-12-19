# 1. Сборка на WebPack. Первый урок

1. Установить webpack и webpack-cli
`npm i webpack webpack-cli`

2. Написать config файл для webpack. Файл `webpack.config.js`
Содержимое файла:
```js
const path = require('path');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js',
    }
};
```

3. В файле package.json определить команды для запуска webpack.
```json
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
```

4. Написать модульный JS, c импортами, чтобы протестировать работу сборки.

Файл main.js
```js
import num from "./test";
console.log(`Тестирование импорта. Импортировали число - ${num}`);
```

Файл test.js
```js
console.log("Imported module");
export default 110;
```

-------------------------------------------------------------------------------


