#画像をアップロードする部分を作ります
#その後にimage_divied.pyにて16分割にします
from flask import Flask, request, render_template
from werkzeug.utils import secure_filename
import os, shutil

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './upload_images'

# Topページ
@app.route('/')
def index():
    return render_template("home.html", message=None)


# ファイルアップロード待受
@app.route('/upload', methods=['POST'])
def upload():

    fs = request.files['file']

    # ファイルの保存先パス
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(fs.filename))
    
    shutil.rmtree('upload_images')
    os.mkdir('upload_images')
    
    # ファイルを保存
    fs.save(file_path)
    print(f"File saved to: {file_path}")

    return render_template("home.html", message="ファイルのアップロードが完了しました。")


if __name__ == '__main__':
    app.run(debug=True)