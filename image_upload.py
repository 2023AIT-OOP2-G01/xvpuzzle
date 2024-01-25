# 画像をアップロードする部分を作ります
# その後にimage_divied.pyにて16分割にします

# 橋本　teams にあるようなエラーは発生しなくなりましたがその後の挙動については私には分かりません


from flask import Flask, request, render_template
from werkzeug.utils import secure_filename
import os
import shutil
from image_divide import divide_image  # 画像を分割する関数と連携を取れるようにしました
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './upload_images'

# Topページ


@app.route('/')
def index():
    return render_template("home.html", message='')
    # home.htmlに移行する

# ファイルアップロード待受


@app.route('/upload', methods=['POST'])
def upload():

    fs = request.files['file']

    # ファイルが選択されていない場合の処理
    if fs is None or fs.filename == '':
        return render_template("home.html")

    # ファイルの拡張子が許可されているかどうかをチェック
    if not allowed_file(fs.filename):
        return render_template("home.html", error="許可されていないファイル形式です。PNGまたはJPEG形式のファイルを選択してください。")

    file_path = os.path.join(
        app.config['UPLOAD_FOLDER'], secure_filename(fs.filename))

    shutil.rmtree('upload_images')
    os.mkdir('upload_images')

    fs.save(file_path)
    print(f"File saved to: {file_path}")

    divide_image(file_path)

    return render_template("puzzle.html", message="ファイルのアップロードが完了しました", filename=fs.filename)


if __name__ == '__main__':
    app.run(debug=True)
