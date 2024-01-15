#画像を16分割にする部分を作ります
import cv2
import os

def split_image(input_image_path, output_folder):
    # 画像読み込み
    image = cv2.imread(input_image_path)

    # 画像のサイズを取得
    height, width, _ = image.shape

    # 分割後のサイズを計算
    split_height = height // 4
    split_width = width // 4

    # 出力フォルダが存在しない場合は作成
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # 画像を縦4横4に分割
    for i in range(4):
        for j in range(4):
            # 分割された画像を取得
            split_img = image[i * split_height: (i + 1) * split_height, j * split_width: (j + 1) * split_width]

            # 分割された画像を保存
            output_path = os.path.join(output_folder, f'split_{i}_{j}.png')
            cv2.imwrite(output_path, split_img)

if __name__ == "__main__":
    input_image_path = "path/to/your/input/image.jpg"
    output_folder = "path/to/your/output/folder"

    split_image(input_image_path, output_folder)