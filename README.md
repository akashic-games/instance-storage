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

## 仕様

## 制限

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
