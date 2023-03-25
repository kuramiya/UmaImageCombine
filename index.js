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

//  横半分モード
let isWidthHalfMode = false;

//  クリックされたキャラ選択ボタンのID
let clickedCharacterSelectButtonId = "";

//  画像配置用の連想配列
//  row0column0といった名前で保存する
//  まずはnull画像で初期化しておく
let imagePosition_CharacterPathArray = {};
initImagePosition();

//  画像のパスと画像オブジェクトを登録しておく連想配列
//  すでに読み出されている画像を使用する
let characterPath_ImageArray = {};

//  キャンバスの横サイズの設定を返す
//  横半分モードを考慮したものを返す
function getCanvasSizeWidth()
{
    if(isWidthHalfMode)
    {
        return currentCanvasMaxSize_px / 2;
    }
    else
    {
        return currentCanvasMaxSize_px;
    }
}

//  キャンバスの縦サイズの設定を返す
function getCanvasSizeHeight()
{
    return currentCanvasMaxSize_px;
}

//  キャンバス設定を初期化する処理
function initImagePosition()
{
    let nullImagePath = document.querySelector("#nullImage").src;
    for (let rowIndex = 0; rowIndex < maxRowCount; rowIndex++)
    {
        for (let columnIndex = 0; columnIndex < maxColumnCount; columnIndex++)
        {
            imagePosition_CharacterPathArray["row" + rowIndex + "column" + columnIndex] = nullImagePath;
        }
    }
}

//  画像のパスと画像オブジェクトを登録する
function setImageArray()
{
    let characterButtonsRow = document.querySelector("#characterButtonsRow");
    let characterButtons = characterButtonsRow.querySelectorAll("button");
    for(let button of characterButtons)
    {
        let image = button.firstChild;
        characterPath_ImageArray[image.src] = image;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //  キャンバスの背景を白く塗っておく
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let cellWidth = canvas.width / currentColumnCount;
    let cellHeight = canvas.height / currentRowCount;

    for (let rowIndex = 0; rowIndex < currentRowCount; rowIndex++)
    {
        for (let colIndex = 0; colIndex < currentColumnCount; colIndex++)
        {
            let position = "row" + rowIndex + "column" + colIndex;
            let imagePath = imagePosition_CharacterPathArray[position];
            let image = characterPath_ImageArray[imagePath];
            if(isWidthHalfMode)
            {
                ctx.drawImage(image, 100, 0, 200, 400, colIndex * cellWidth , rowIndex * cellHeight, cellWidth, cellHeight);
            }
            else
            {
                ctx.drawImage(image, colIndex * cellWidth , rowIndex * cellHeight, cellWidth, cellHeight);
            }
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

function changeWidthHalfMode(e)
{
    if(e.target.checked)
    {
        isWidthHalfMode = true;
    }
    else
    {
        isWidthHalfMode = false;
    }
    updateCanvas();
}

//  選択状態をクリアする処理
function clearSelect(e)
{
    initImagePosition();
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

    let adjustedColumnCount = currentColumnCount;
    if(isWidthHalfMode)
    {
        adjustedColumnCount = currentColumnCount / 2;
    }

    //  画像の縦幅横幅を設定する
    if(currentRowCount == adjustedColumnCount)
    {
        canvas.width = currentCanvasMaxSize_px;
        canvas.height = currentCanvasMaxSize_px;   
    }
    else if(currentRowCount > adjustedColumnCount)
    {
        //  行のほうが大きい場合
        canvas.width = (currentCanvasMaxSize_px / currentRowCount) * adjustedColumnCount;
        canvas.height = currentCanvasMaxSize_px;
    }
    else
    {
        //  列のほうが大きい場合
        canvas.width = currentCanvasMaxSize_px;
        canvas.height = (currentCanvasMaxSize_px / adjustedColumnCount) * currentRowCount;
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

    imagePosition_CharacterPathArray[tagName] = imgElement.src;

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
document.querySelector("#widthHalfModeCheckBox").addEventListener("change", changeWidthHalfMode, false); 
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

//  画像登録
setImageArray();

window.onload = () =>
{
    updateCanvas();
};
