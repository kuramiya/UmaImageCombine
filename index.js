import * as bootstrap from "./bootstrap-5.0.2-dist/js/bootstrap.bundle.js";

//  最大行数
const maxRowCount = 4;

//  最大列数
const maxColumnCount = 4;

//  現在のキャンバスサイズ
let currentCanvasSize = 600;

//  現在の行数
let currentRowCount = 2;

//  現在の列数
let currentColumnCount = 2;

//  画像配置用の連想配列
//  row0col0といった名前で保存する
//  まずはnull画像で初期化しておく
let imageArray = {};
for (let rowIndex = 0; rowIndex < maxRowCount; rowIndex++)
{
    for (let columnIndex = 0; columnIndex < maxColumnCount; columnIndex++)
    {
        imageArray["row" + rowIndex + "col" + columnIndex] = "/image/null.png";        
    }
}

//  配置画像を表示する処理
function showImages(ctx)
{
    //  キャンバスをクリアする
    ctx.clearRect(0, 0, currentCanvasSize, currentCanvasSize);

    let rowSize_px = currentCanvasSize / currentRowCount;
    let colSize_px = currentCanvasSize / currentColumnCount;
    let baseSize_px = 0;
    if(rowSize_px > colSize_px)
    {
        baseSize_px = colSize_px;
    }
    else
    {
        baseSize_px = rowSize_px;
    }

    for (let rowIndex = 0; rowIndex < currentRowCount; rowIndex++)
    {
        for (let colIndex = 0; colIndex < currentColumnCount; colIndex++)
        {
            let tagName = "row" + rowIndex + "col" + colIndex;

            let image = new Image();
            image.src = imageArray[tagName];
            image.onload = () => {
                ctx.drawImage(image, colIndex * baseSize_px , rowIndex * baseSize_px, baseSize_px, baseSize_px);
            };
        }
    }
}

//  画像サイズコンボボックスが変更された時の処理
function canvasSizeChange(e)
{
    currentCanvasSize = parseInt(e.target.value);

    let canvas = document.querySelector("#outputCanvas");

    canvas.width = currentCanvasSize;
    canvas.height = currentCanvasSize;

    updateCanvas();
}

//  行数コンボボックスが変更された時の処理
function rowCountChange(e)
{
    currentRowCount = parseInt(e.target.value);

    updateButtons();
    updateCanvas();
}

//  列数コンボボックスが変更された時の処理
function columnCountChange(e)
{
    currentColumnCount = parseInt(e.target.value);

    updateButtons();
    updateCanvas();
}

//  キャンバス内がクリックされた時の処理（画像選択処理の開始）
function canvasClick(e)
{
    let rect = e.target.getBoundingClientRect();
    let clickPosX = e.clientX - rect.left;
    let clickPosY = e.clientY - rect.top;

    console.log("x pos:" + clickPosX + " y pos:" + clickPosY);

    //  これはダメ、モジュールとしてロードできない
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    
    myModal.show();
}

//  画像を再描画する処理
function updateCanvas()
{
    const board = document.querySelector("#outputCanvas");
    const ctx = board.getContext("2d");

    showImages(ctx);
}

//  画像選択ボタンを更新する処理
function updateButtons()
{
    for (let rowIndex = 0; rowIndex < maxRowCount; rowIndex++)
    {
        for (let colIndex = 0; colIndex < maxColumnCount; colIndex++)
        {
            let id = "#row" + rowIndex + "column" + colIndex + "button";

            let button = document.querySelector(id);

            if(rowIndex < currentRowCount && colIndex < currentColumnCount)
            {
                button.className = "col p-3 btn btn-outline-primary visible";
            }
            else
            {
                button.className = "col p-3 btn btn-outline-primary invisible";
            }
        }
    }
}

//  イベント登録
document.querySelector("#canvasSizeSelect").addEventListener("change", canvasSizeChange, false); 
document.querySelector("#rowCountSelect").addEventListener("change", rowCountChange, false); 
document.querySelector("#columnCountSelect").addEventListener("change", columnCountChange, false); 
document.querySelector("#outputCanvas").addEventListener("click", canvasClick, false);

window.onload = () =>
{
    updateCanvas();
};

