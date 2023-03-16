const canvasSize_px = 600;

//  画像配置用の連想配列
//  row1col1といった名前で保存する
let imageArr = {};
imageArr["row0col0"] = "/image/null2.png";
imageArr["row0col1"] = "/image/img1.png";
imageArr["row1col0"] = "/image/img2.png";
imageArr["row1col1"] = "/image/img3.png";

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

window.onload = () =>
{
    // canvas準備
    const board = document.querySelector("#combinedImage");
    const ctx = board.getContext("2d");

    showImages(ctx, 2, 2);

    // // 画像読み込み
    // const chara = new Image();
    // chara.src = "/image/img1.png";  // 画像のURLを指定
    // chara.onload = () => {
    //     ctx.drawImage(chara, 0, 0, 200, 200);
    // };

    // const chara2 = new Image();
    // chara2.src = "/image/null.png";  // 画像のURLを指定
    // chara2.onload = () => {
    //     ctx.drawImage(chara2, 200, 200, 200, 200);
    // };
};

