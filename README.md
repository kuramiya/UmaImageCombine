# UmaImageCombine
ウマ娘の画像連結webアプリ

# 使用ライブラリとか

## bootstrap

レスポンシブデザインのため

https://getbootstrap.jp/

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
そもそもこういう動的なコンテンツ、Popper.jsを使う系統はモジュールとして使用できないらしい。  
別の実装を検討する必要あり……。

結局別途呼び出しボタンの項目を用意することにした。

## 画像について

ポジショニングマップのものを使用する

https://raw.githubusercontent.com/kuramiya/UmaPositioningMap/main/chara/%E3%82%B4%E3%83%BC%E3%83%AB%E3%83%89%E3%82%B7%E3%83%81%E3%83%BC.png

## 画像の読み出し、キャッシュ処理に伴う問題について

image.srcにパスを設定した段階で、読み出しが開始される  
image.onloadイベントはキャッシュが使用された場合、実行されない  

元々キャラ選択で画像を読み込ませているので、複数回読ませるのは無駄  
それを再利用するのが良い  

タグにあるimgタグを連想配列に登録しておく  
それをcanvasにdrawImageする
onloadは使用しない（どうせ見えてない画像は選択されないので）
