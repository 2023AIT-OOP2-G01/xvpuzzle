# 画像をアップロードする部分を作ります
# その後にimage_divied.pyにて16分割にします

# 橋本　teams にあるようなエラーは発生しなくなりましたがその後の挙動については私には分かりません


from flask import Flask, request, render_template
from werkzeug.utils import secure_filename
import os
import shutil

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './upload_images'

# Topページ


@app.route('/')
def index():
    return render_template("home.html", message='')
    #home.htmlに移行する

# ファイルアップロード待受
@app.route('/upload', methods=['POST'])
def upload():

    fs = request.files['file']

    #ファイルが選択されていない場合の処理
    #ファイルが選択されていない場合はpuzzle.htmlに移行しない
    # 水野　home.js側でファイルが選択されていない場合のメッセージ表示処理を行うため、message=""を削除しました。
    if fs is None or fs.filename == '':
        return render_template("home.html")

    # ファイルの保存先パス
    file_path = os.path.join(
        app.config['UPLOAD_FOLDER'], secure_filename(fs.filename))

    shutil.rmtree('upload_images')
    os.mkdir('upload_images')

    # ファイルを保存
    fs.save(file_path)
    print(f"File saved to: {file_path}")

    return render_template("puzzle.html", message="ファイルのアップロードが完了しました")
    #ファイルが選択されていた際にpuzzle.htmlに移行する
    #puzzle.htmlに移行するため、"ファイルのアップロードが完了しました。"というメッセージはみえない



if __name__ == '__main__':
    app.run(debug=True)
