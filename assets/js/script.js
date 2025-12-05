async function loadPart(id, file, callback) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Cannot load ${file}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    if (callback && typeof callback === "function") {
      callback();
    }
  } catch (err) {
    console.error(err);
  }
}
loadPart("header", "/template/header.html");
loadPart("sidebar", "/template/sidebar.html", () => {
  (adsbygoogle = window.adsbygoogle || []).push({});
});
loadPart("footer", "/template/footer.html");

document.addEventListener('DOMContentLoaded', () => {
    const allGameLinks = document.querySelectorAll('.game-thum-link');

    allGameLinks.forEach(gameLink => {
        const largeThumbnail = gameLink.querySelector('.game-thum');
        const smallThumbnailContainers = gameLink.querySelectorAll('.game-thum-small'); 
        
        const defaultImageSrc = largeThumbnail ? largeThumbnail.dataset.defaultImage : null;

        if (smallThumbnailContainers.length > 0 && largeThumbnail && defaultImageSrc) {
            const setDefaultState = () => {
                largeThumbnail.style.backgroundImage = `url('${defaultImageSrc}')`;
                largeThumbnail.style.backgroundColor = '#fff';
            };

            // 初期表示: デフォルトの状態を設定
            setDefaultState();

            smallThumbnailContainers.forEach(container => {
                
                // マウスオーバー時
                container.addEventListener('mouseenter', (event) => {
                    const imgElement = event.currentTarget.querySelector('img'); 
                    if (imgElement) {
                        const newImageSrc = imgElement.src;
                        
                        // 画像を切り替える
                        largeThumbnail.style.backgroundImage = `url('${newImageSrc}')`;
                        largeThumbnail.style.backgroundColor = '#000';
                    }
                });

                // マウスアウト時: デフォルトの状態に戻す
                container.addEventListener('mouseleave', () => {
                    setDefaultState(); // デフォルト画像と背景色に戻す関数を呼び出す
                });
            });
        }
    });

    console.log("すべてのゲームサムネイルが初期化されました。");
});


//コード用ブロック
function copyCode(buttonElement) {
    // 1. ボタンから最も近いコードの内容（<pre><code>）を取得
    //    buttonElement -> code-header -> code-container -> pre -> code.code-content
    const codeContainer = buttonElement.closest('.code-container');
    const codeBlock = codeContainer.querySelector('.code-content');
    
    // 2. コードの内容（テキスト）を取得
    const codeText = codeBlock.innerText;

    // 3. テキストをクリップボードに書き込む
    navigator.clipboard.writeText(codeText)
        .then(() => {
            // 4. コピー成功時のボタンの見た目変更
            const originalText = buttonElement.textContent;
            buttonElement.textContent = 'コピー完了!';
            buttonElement.classList.add('copied');

            // 5. 3秒後に元の状態に戻す
            setTimeout(() => {
                buttonElement.textContent = originalText;
                buttonElement.classList.remove('copied');
            }, 3000);
        })
        .catch(err => {
            console.error('コピーに失敗しました: ', err);
            // 失敗時はアラートなどでユーザーに通知
            alert('コードのコピーに失敗しました。お手数ですが手動でコピーしてください。');
        });
}



//unity比率調整表示用
         function resizeCanvas() {
            console.log("test");
            const container = document.getElementById('unity-container');

            // 1. HTMLのカスタム属性から比率を読み込む
            const preferred_width = parseInt(container.dataset.aspectW, 10);
            const preferred_height = parseInt(container.dataset.aspectH, 10);
            console.log(preferred_width);
            console.log(preferred_height);
            if (isNaN(preferred_width) || isNaN(preferred_height) || preferred_width <= 0 || preferred_height <= 0) {
                 console.error('アスペクト比のデータが不正です。');
                 return;
            }

            // 比率を計算 (幅/高さ)
            const preferred_aspect_ratio = preferred_width / preferred_height;

            // 2. ウィンドウサイズを取得
            const PADDING_TOP = 20; // 情報バーの下 + 少しの余白
            const PADDING_BOTTOM = 20; // 下部の余白
            const PADDING_HORIZONTAL = 40; // 左右の合計余白

            const window_width = window.innerWidth;
            const window_height = window.innerHeight;

            let width = preferred_width;
            let height = preferred_height;
            
            // 3. Contain ロジックの実行
            
            // 現在のウィンドウの使用可能領域の縦横比 (幅/高さ)
            const window_aspect_ratio = window_width / window_height;

            if (window_aspect_ratio >= preferred_aspect_ratio) {
                // ウィンドウがゲームより横長か同じ比率の場合: 高さをウィンドウに合わせる
                
                // 高さを使って新しい幅を計算: new_width = preferred_aspect_ratio * new_height
                width = preferred_aspect_ratio * window_height; 
                height = window_height;
            } else {
                // ウィンドウがゲームより縦長の場合: 幅をウィンドウに合わせる
                
                // 幅を使って新しい高さを計算: new_height = new_width / preferred_aspect_ratio
                width = window_width;
                height = window_width / preferred_aspect_ratio;
            }
            
            // 4. サイズの適用
            container.style.width = `${Math.round(width)}px`;
            container.style.height = `${Math.round(height)}px`;

        }

        // 初期ロード時とウィンドウリサイズ時に実行
        window.addEventListener('load', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);
        
        // 念のため初期実行
        resizeCanvas();
