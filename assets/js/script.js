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