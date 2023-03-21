//  最大行数
const maxRowCount = 4;

//  最大列数
const maxColumnCount = 4;

//  現在のキャンバスサイズ
let currentCanvasMaxSize_px = 450;

//  現在の行数
let currentRowCount = 2;

//  現在の列数
let currentColumnCount = 2;

//  クリックされたキャラ選択ボタンのID
let clickedCharacterSelectButtonId = "";

//  画像配置用の連想配列
//  row0column0といった名前で保存する
//  まずはnull画像で初期化しておく
let imageArray = {};
initCanvas();

//  キャンバス設定を初期化する処理
function initCanvas()
{
    for (let rowIndex = 0; rowIndex < maxRowCount; rowIndex++)
    {
        for (let columnIndex = 0; columnIndex < maxColumnCount; columnIndex++)
        {
            imageArray["row" + rowIndex + "column" + columnIndex] = "./image/空白.png";
        }
    }
}

//  キャラ選択モーダルボタンを表示をすべてクリアする処理
function clearCharacterSelectButtons()
{
    let characterSelectButtonsRow = document.querySelector("#characterSelectButtonsRow");
    let characterSelectButtons = characterSelectButtonsRow.querySelectorAll("button");
    for(let button of characterSelectButtons)
    {
        button.textContent = "空白"
    }
}

//  配置画像を表示する処理
function showImages()
{
    let canvas = document.querySelector("#outputCanvas");
    let ctx = canvas.getContext("2d");

    //  キャンバスをクリアする
    ctx.clearRect(0, 0, currentCanvasMaxSize_px, currentCanvasMaxSize_px);

    //  キャンバスの背景を白く塗っておく
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, currentCanvasMaxSize_px, currentCanvasMaxSize_px);

    let rowSize_px = currentCanvasMaxSize_px / currentRowCount;
    let colSize_px = currentCanvasMaxSize_px / currentColumnCount;
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
            let tagName = "row" + rowIndex + "column" + colIndex;

            let image = new Image();
            image.crossOrigin = "anonymous";
            image.src = imageArray[tagName];
            image.onload = () => {
                ctx.drawImage(image, colIndex * baseSize_px , rowIndex * baseSize_px, baseSize_px, baseSize_px);
            };
        }
    }
}

//  画像サイズ（最大サイズ）コンボボックスが変更された時の処理
function changeCanvasMaxSize(e)
{
    currentCanvasMaxSize_px = parseInt(e.target.value);

    updateCanvas();
}

//  行数コンボボックスが変更された時の処理
function changeRowCount(e)
{
    currentRowCount = parseInt(e.target.value);

    updateButtons();
    updateCanvas();
}

//  列数コンボボックスが変更された時の処理
function changeColumnCount(e)
{
    currentColumnCount = parseInt(e.target.value);

    updateButtons();
    updateCanvas();
}

//  選択状態をクリアする処理
function clearSelect(e)
{
    initCanvas();
    clearCharacterSelectButtons();

    updateCanvas();
}

//  キャンバス内がクリックされた時の処理（画像選択処理の開始）
//  クリック処理は使用してないため、このメソッドは呼びされていない
function canvasClick(e)
{
    let rect = e.target.getBoundingClientRect();
    let clickPosX = e.clientX - rect.left;
    let clickPosY = e.clientY - rect.top;

    console.log("x pos:" + clickPosX + " y pos:" + clickPosY);
}

//  画像のサイズを更新する処理
function updateCanvasSize()
{
    let canvas = document.querySelector("#outputCanvas");

    //  画像の縦幅横幅を設定する
    if(currentRowCount == currentColumnCount)
    {
        canvas.width = currentCanvasMaxSize_px;
        canvas.height = currentCanvasMaxSize_px;    
    }
    else if(currentRowCount > currentColumnCount)
    {
        //  行のほうが大きい場合
        canvas.width = (currentCanvasMaxSize_px / currentRowCount) * currentColumnCount;
        canvas.height = currentCanvasMaxSize_px;
    }
    else
    {
        //  列のほうが大きい場合
        canvas.width = currentCanvasMaxSize_px;
        canvas.height = (currentCanvasMaxSize_px / currentColumnCount) * currentRowCount;
    }
}

//  画像を更新する処理
function updateCanvas()
{
    updateCanvasSize();
    showImages();
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

//  キャラ選択モーダル呼び出し時の処理
//  キャラを配置する場所を設定する
function setCharacterPosition(e)
{
    clickedCharacterSelectButtonId = e.relatedTarget.id;
}

//  キャラが選択された時の処理
function selectCharacter(e)
{
    let imgElement;
    if(e.target.tagName == "IMG")
    {
        imgElement = e.target;
    }
    else
    {
        imgElement = e.target.firstChild;
    }

    let tagName = clickedCharacterSelectButtonId.replace("button", "");

    imageArray[tagName] = imgElement.src;

    let paths = imgElement.src.split("/");

    let characterName = paths[paths.length - 1].replace(".png", "");

    if(characterName.substr(0, 1) == "%")
    {
        characterName = decodeURI(characterName);
    }

    document.querySelector("#" + clickedCharacterSelectButtonId).textContent = characterName;
}

//  キャンバス画像をダウンロードする
function downloadImage(e)
{
    let canvas = document.querySelector("#outputCanvas");
    let a = document.createElement("a");
    a.href = canvas.toDataURL("image/png", 1);
    a.download = "uma.png";
    a.click();
}

//  イベント登録
document.querySelector("#canvasSizeSelect").addEventListener("change", changeCanvasMaxSize, false); 
document.querySelector("#rowCountSelect").addEventListener("change", changeRowCount, false); 
document.querySelector("#columnCountSelect").addEventListener("change", changeColumnCount, false); 
document.querySelector("#downloadButton").addEventListener("click", downloadImage, false); 
document.querySelector("#clearSelectButton").addEventListener("click", clearSelect, false); 
// document.querySelector("#outputCanvas").addEventListener("click", canvasClick, false);
document.querySelector("#exampleModal").addEventListener("shown.bs.modal", setCharacterPosition, false);
document.querySelector("#exampleModal").addEventListener("hidden.bs.modal", updateCanvas, false);

let characterButtonsRow = document.querySelector("#characterButtonsRow");
let characterButtons = characterButtonsRow.querySelectorAll("button");
for(let button of characterButtons)
{
    button.addEventListener("click", selectCharacter, false);
}

window.onload = () =>
{
    updateCanvas();
};

