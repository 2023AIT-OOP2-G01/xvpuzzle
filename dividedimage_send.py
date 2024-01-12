# dividedimage_send.py
#分割した画像をstaticの中に送る部分を作ります

import os
from shutil import copyfile

def send_divided_images():
    # 分割した画像が保存されているディレクトリ
    segments_folder = 'segments'

    # staticフォルダに分割した画像をコピー
    for file_name in os.listdir(segments_folder):
        # 分割された画像のパス
        source_path = os.path.join(segments_folder, file_name)
        
        # staticフォルダにコピーする先のパス
        destination_path = os.path.join('static', file_name)

        # 画像をstaticフォルダにコピー
        copyfile(source_path, destination_path)

    print('Divided images sent to static folder')

if __name__ == '__main__':
    # メインとして実行された場合、画像をstaticフォルダに送る
    send_divided_images()
