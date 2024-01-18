/*home.htmlのstartボタンのファイルです*/

function dragOverHandler(event) {
    // ドロップされたアイテムのデフォルトの挙動をキャンセル
    event.preventDefault(); 

    // ドラッグエリアの上にアイテムがあるかどうかを判定
    const isFileOver = event.dataTransfer.types.includes('Files');

    // ドラッグエリア上にアイテムがあれば、ドラッグエリアの境界線を実線に変更
    dropArea.style.border = isFileOver ? '2px solid #aaa' : '4px dashed #ccc';
  }
  
  function dropHandler(event) { // ドラッグエリア上でアイテムがドロップされた際の処理を行う関数
    // ドロップされたアイテムのデフォルトの挙動をキャンセル
    event.preventDefault();

    // ドロップ完了後、一定時間後に境界線のスタイルを元に戻す
    // 10ミリ秒(0.01秒)後に戻す
    setTimeout(function () {
        dropArea.style.border = '4px dashed #ccc';
    }, 10);
  
    // ドロップされたアイテムの情報を取得
    const files = event.dataTransfer.files;

    // ドロップされたファイルの処理を行うため、handleFiles関数の呼び出し
    handleFiles(files);
  }
  
  function handleFileSelect(event) { // ファイル選択ボタンでファイルを選択した際の処理を行う関数
    // 選択されたファイルの情報を取得
    const files = event.target.files;

    // 選択されたファイルの処理を行うため、handleFiles関数の呼び出し
    handleFiles(files);
  }
  
  function handleFiles(files) { // 選択されたファイルの処理を行う関数
    // プレビューを表示するための要素を取得
    const preview = document.getElementById('preview');

    for (const file of files) {
      if (file.type.startsWith('image/')) { // 選択されたファイルが画像ファイルかどうかを判定
        // ファイルを読み込むためのオブジェクトを作成
        const reader = new FileReader();
  
        // ファイルの読み込みが完了した時に呼ばれるコールバック関数を設定し、読み込んだデータをプレビューの'src'属性に設定
        reader.onload = function (e) {
          preview.src = e.target.result;
        };
  
        // ファイルをデータURLとして読み込み
        reader.readAsDataURL(file)
      } else { // 選択されたファイルが画像ファイルではない場合、アラートを表示
        alert('画像ファイルを選択してください。');
      }
    }
  }
  