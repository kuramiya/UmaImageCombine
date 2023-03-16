const canvasSize_px = 600;
const maxRowCount = 4;
const maxColumnCount = 4;

let currentRowCount = 2;
let currentColumnCount = 2;

//  画像配置用の連想配列
//  row0col0といった名前で保存する
//  まずはnull画像で初期化しておく
let imageArr = {};
for (let rowIndex = 0; rowIndex < maxRowCount; rowIndex++)
{
    for (let columnIndex = 0; columnIndex < maxColumnCount; columnIndex++)
    {
        imageArr["row" + rowIndex + "col" + columnIndex] = "/image/null2.png";        
    }
}

//  配置画像を表示する処理
function showImages(ctx, rowCount, colCount)
{
    let rowSize_px = canvasSize_px / rowCount;
    let colSize_px = canvasSize_px / colCount;
    let baseSize_px = 0;
    if(rowSize_px > colSize_px)
    {
        baseSize_px = colSize_px;
    }
    else
    {
        baseSize_px = rowSize_px;
    }

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++)
    {
        for (let colIndex = 0; colIndex < colCount; colIndex++)
        {
            let tagName = "row" + rowIndex + "col" + colIndex;

            let image = new Image();
            image.src = imageArr[tagName];
            image.onload = () => {
                ctx.drawImage(image, rowIndex * baseSize_px , colIndex * baseSize_px, baseSize_px, baseSize_px);
            };
        }
    }
}

//  行コンボボックスが変更された時の処理
function rowCountChange(e)
{
    currentRowCount = parseInt(e.target.value)

    console.log("row count:" + currentRowCount);
}

function columnCountChange(e)
{
    currentColumnCount = parseInt(e.target.value)

    console.log("column count:" + currentColumnCount);
}

function canvasClick(e)
{
    let rect = e.target.getBoundingClientRect();
    let clickPosX = e.clientX - rect.left;
    let clickPosY = e.clientY - rect.top;

    console.log("x pos:" + clickPosX + " y pos:" + clickPosY);
}

window.onload = () =>
{
    // canvas準備
    const board = document.querySelector("#combinedImage");
    const ctx = board.getContext("2d");

    showImages(ctx, 2, 2);

};

//  イベント登録
document.querySelector("#rowCountSelect").addEventListener("change", rowCountChange, false); 
document.querySelector("#columnCountSelect").addEventListener("change", columnCountChange, false); 
document.querySelector("#combinedImage").addEventListener("click", canvasClick, false); 
