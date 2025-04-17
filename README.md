<p align="center">
<img src="https://raw.githubusercontent.com/akashic-games/instance-storage/main/img/akashic.png"/>
</p>

# instance-storage

ニコニコ生放送 (ニコ生ゲーム) においてローカルストレージを利用するための Akashic Engine 向けライブラリです。

利用には Akashic Engine v3 以降が必要です。

## インストール

`akashic install` コマンドでインストールしてください。

```sh
akashic install @akashic-extension/instance-storage
```

インストール後にテキストエディタで game.json を開いて、次のような `environment.external.instanceStorageLimited` プロパティがなければ作成してください。
値は `"0"` としてください。(v2.1.2 以降の `akashic-cli` では、 `akashic install` 時に自動的に作成されます。)

```js
{
  ...,
  "environment": {
    "external": {
      "instanceStorageLimited": "0"
    }
  }
}
```

## 利用方法

スクリプトアセット内で、 `require()` により関数 `create()` を取得します。

```js
const { create: createInstanceStorage } = require("@akashic-extension/instance-storage");
```

TypeScript の場合は `import` を利用してください。

```ts
import { create as createInstanceStorage } from "@akashic-extension/instance-storage";
```

`create()` を実行すると instanceStorage のインスタンスを生成します。

```js
const { create: createInstanceStorage } = require("@akashic-extension/instance-storage");

...

const instanceStorage = createInstanceStorage();

instanceStorage.read("key1", (error, value) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`value: ${value}`);
});
```

`promisify()` により、 instanceStorage の各メソッドを `Promise` で実行するインスタンスを生成できます。

```js
const { create: createInstanceStorage, promisify } = require("@akashic-extension/instance-storage");

const instanceStorage = promisify(createInstanceStorage());

(async () => {
  const value = await instanceStorage.read("key1");
  console.log(`value: ${value}`);
})();
```

## 仕様

詳細な仕様は [APIリファレンス](https://akashic-games.github.io/instance-storage/api/index.html) を参照してください。

## 開発

### ビルド方法

TypeScript で書かれています。ビルドには Node.js が必要です。以下のコマンドでビルドしてください。

```sh
npm install
npm run build
```

## ライセンス

本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](https://github.com/akashic-games/instance-storage/blob/main/LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
