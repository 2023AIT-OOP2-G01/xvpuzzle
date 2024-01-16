from PIL import Image
import os

def divide_image(image_path):
    # 画像を読み込む
    image = Image.open(image_path)

    # 画像を16分割
    width, height = image.size
    segment_width = width // 4
    segment_height = height // 4

    for i in range(4):
        for j in range(4):
            left = j * segment_width
            upper = i * segment_height
            right = (j + 1) * segment_width
            lower = (i + 1) * segment_height

            # 画像を切り取り保存
            segment = image.crop((left, upper, right, lower))
            segment.save(f'segments/segment_{i}_{j}.png')

if __name__ == '__main__':
    # アップロードされた画像のパスを指定
    uploaded_image_path = 'uploads/uploaded_image.jpg'
    
    # 分割した画像を保存するディレクトリ
    os.makedirs('segments', exist_ok=True)

    divide_image(uploaded_image_path)
    print('Image divided successfully') 