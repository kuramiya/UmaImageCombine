# UmaImageCombine
ウマ娘の画像連結webアプリ

# 使用ライブラリとか

## bootstrap

レスポンシブデザインのため

https://getbootstrap.jp/

### ポップアップ画面の処理

Modalを利用してみる

https://getbootstrap.jp/docs/5.0/components/modal/

どのようにして、canvasのクリックでモーダルを呼び出すか？  
Javascriptで呼び出す方法が記載されていた  
しかし、importがうまくいかない  
npmでパッケージを入れないと駄目っぽい
nodejsをインストールする  

https://nodejs.org/ja

nodejsのコマンドプロンプトで当該のフォルダに行き、npmを実行  
プロキシを通す必要があった

https://qiita.com/tenten0213/items/7ca15ce8b54acc3b5719

それでも駄目。  
そもそもこういう類はモジュールとして使用できないらしい。
別の実装を検討する必要あり……。


## merge-images (不採用)

画像連結用  
使い方がわからない……使用を諦める  
代わりにcanvasを使用する

https://www.npmjs.com/package/merge-images

# 設計（雑）

- 行、列を設定可能にする
  - 最大4x4
- 画像を押すことで、ポップアップ画面を表示し、選択する画像を選べるようにする
- 画像を検索可能にする（できれば）
