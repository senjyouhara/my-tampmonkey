### 油猴开发通用模板

油猴脚本在packages里进行编写

### 基本说明
* 进入packages，使用npm初始化。各类参数可自由指定。可以使用demo作为模板
* 如果需要，可以在脚本目录下进一步安装npm依赖。
* 新建入口文件，在其中编写脚本代码。
  * 如果你想要使用TypeScript，则新建`src/index.tsx`。
  * 如果你想要使用普通JS，则新建`src/index.tsx`。
* 编写过程中，在你所在的packages子目录运行`npm run dev`，即可启动服务。
* 打包编译，在你所在的packages子目录运行`npm run build`。
* 如果对packages全部进行打包 请在根目录运行`npm run build`
* 编译后的文件不仅在你的目录下生成也会在root目录下的build文件夹里生成

### 使用样式
编译工具内置了Less Module支持。因此，你可以直接编写less文件，并且不需要担心样式冲突的问题。但注意在meta.yml中申请GM_addStyle权限。

首先新建一个CSS，例如`src/index.less`，写入以下内容：
```less
.myButton {
  color: red;
}
```

在你的脚本中，可以这样使用：
```js
import s from './index.less';

const button = document.createElement('button');
button.className = s.myButton;
```

### 使用方式

`npm i`

`npm run bootstrap`
