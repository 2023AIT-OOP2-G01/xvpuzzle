#画像をアップロードする部分を作ります
#その後にimage_divied.pyにて16分割にします
from flask import Flask, request, render_template, send_from_directory
from werkzeug.utils import secure_filename
import os
import glob

app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './upload_images'

# Topページ
@app.route('/')
def index():
    return render_template("home.html", message=None)


# ファイルアップロード待受
@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return render_template("home.html", message="ファイルを指定してください。")

    fs = request.files['file']

    if '' == fs.filename:
        return render_template("home.html", message="ファイルを指定してください。")

    # 下記のような情報がFileStorageからは取れる
    print('file_name={}'.format(fs.filename))
    print('content_type={} content_length={}, mimetype={}, mimetype_params={}'.format(
          fs.content_type,
          fs.content_length,
          fs.mimetype,
          fs.mimetype_params))

    # ファイルを保存
    fs.save('./upload_images/' + secure_filename(fs.filename))

    return render_template("home.html", message="ファイルのアップロードが完了しました。")

# アップロードファイル一覧
@app.route('/uploaded_list/')
def uploaded_list():
    files = glob.glob("./upload_images/*")
    urls = []
    for file in files:
        urls.append({
            "filename": os.path.basename(file),
            "url": "/uploaded/" + os.path.basename(file)
        })
    return render_template("filelist.html", page_title="アップロードファイル", target_files=urls)



@app.route('/uploaded/<path:filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/processed/gs/<path:filename>')
def processed_gs_file(filename):
    return send_from_directory(app.config['OUTPUT_FOLDER'] + '/gs', filename)


if __name__ == '__main__':
    app.run(debug=True)