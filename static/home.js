/*home.htmlのstartボタンのファイルです*/

// 水野　不要になった関数の削除、新たな関数の追加、関数名の変更を行いました。

// ドラッグ＆ドロップエリア上ファイルがあるときに枠線の見た目を変更
function handleDragEnter() {
  document.getElementById('dragDropArea').style.border = '6px dashed #87CEEB';
}

// ドラッグ＆ドロップエリア外にファイルが移動したら、枠線を元に戻す
function handleDragLeave() {
  document.getElementById('dragDropArea').style.border = '4px dashed #ccc';
}

// ファイルがドラッグ＆ドロップで選択されたときの処理
document.querySelector('input').addEventListener('change', (event) => {

  // アイテムのドロップ後、枠線を元に戻す
  document.getElementById('dragDropArea').style.border = '4px dashed #ccc';

  // ドロップされたアイテムのデフォルトの挙動をキャンセル
  event.preventDefault(); 

  // 選択されたファイルの情報を取得
  const files = event.target.files;

  // 選択されたファイルのプレビュー表示を行うため、showPreview関数の呼び出し
  showPreview(files);
});

// ファイル選択ボタンでファイルを選択した際の処理を行う関数
function handleFileSelect(event) { 
  // 選択されたファイルの情報を取得
  const files = event.target.files;

  // 選択されたファイルのプレビュー表示を行うため、showPreview関数の呼び出し
  showPreview(files);
}

// 選択されたファイルのプレビュー表示を行う関数
function showPreview(files) { 
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

// ファイルが選択されていない場合にエラーメッセージを表示する関数
function confirmImageFile() {
  const preview = document.getElementById('preview');

  if(preview.src == '') {
      alert('ファイルが選択されていません。');
  }
}