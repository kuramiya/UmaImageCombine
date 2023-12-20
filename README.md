# UmaImageCombine

ウマ娘の画像連結webアプリ

# 更新情報

## 2023/12/20

ロイスアンドロイス追加

## 2023/11/20

サムソンビッグ追加

## 2023/11/16

ヴィブロス、ヴィルシーナ追加

## 2023/10/05

ドゥラメンテ追加

## 2023/09/26

画像を400pxのまま連結する機能を追加した（rawサイズモード）

## 2023/09/17

ノースフライト追加

## 2023/08/23

2.5周年ハフバの発表でサウンズオブアース、新シナリオ（凱旋門賞）関連キャラを追加

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
- 画像を検索可能にする（できれば）　未実装
- ランダム機能　実装済み
- 横幅半分サイズ連結　実装済み

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

## 横幅半分サイズでの連結画像の生成

２キャラで正方形になるので便利らしい  
元々のキャラ画像は400x400なので、100,200,100で分割した真ん中を表示させると良い？  
横半分モードのチェックボックスを追加する  
なぜか言葉を間違えて縦半分モードと表現していたので、横半分モードに修正した  
スリムモードという名前にした

## ランダムモード

全16箇所にランダムにキャラを配置する  
重複を許可する  
ランダムボタンを配置する  
