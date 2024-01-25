from PIL import Image
import os


def divide_image(image_path):
    # 画像を読み込む
    image = Image.open(image_path)
    image = image.convert("RGB")#pngファイルを実質jpegにする

    # 画像を16分割
    width, height = image.size
    segment_width = width // 4
    segment_height = height // 4

    # 分割した画像を保存するディレクトリ
    output_dir = 'static/divided_images'
    os.makedirs(output_dir, exist_ok=True)

    image.save(f'{output_dir}/original.jpg')  # オリジナル画像も保存するようにしました

    for i in range(16):
        # グリッドの行と列を計算
        row = i // 4
        col = i % 4

        # セグメントの座標を計算
        left = col * segment_width
        upper = row * segment_height
        right = (col + 1) * segment_width
        lower = (row + 1) * segment_height

        # 画像を切り取り保存
        segment = image.crop((left, upper, right, lower))
        # 保存ファイル名は1から16までの番号を持つ
        segment.save(f'{output_dir}/segment_{i+1}.jpg')
