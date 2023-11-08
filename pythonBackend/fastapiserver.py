from fastapi import FastAPI, File
from fastapi.responses import JSONResponse
import numpy as np
import cv2
from ultralytics import YOLO

app = FastAPI()

# class name
trash_name = [
        "general trash",
        "paper",
        "metal",
        "glass",
        "plastic",
        "plastic bag"
    ]

# 모델 로딩
model = YOLO('./yolov8s_custom.pt')
print("model load 완료")

@app.get("/")
def root():
    return "Ggyumo's fastapi server is running!"


# image upload 후 예측 결과 반환
@app.post('/ai')
def predict(file: bytes = File() ):
        
    # numpy를 image buffer를 array로 변환
    nparr = np.frombuffer(file, np.uint8)

    # 이미지 코드로 변환
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 예측 실행
    results = model(img)

    # class 별 count 초기화 
    trash_count = [0]*6

    class_ids = []
    for result in results:
        boxes = result.boxes
        for box in boxes:
            #xyxy = box.xyxy.tolist()[0]
            #print(xyxy)
            confidence = box.conf

            # 0.4 이상의 confidence 만 검출
            if confidence >= 0.4:
                class_ids.append(box.cls.tolist())
                if box.cls == 0.:
                    trash_count[0] += 1
                elif box.cls == 1. or box.cls == 2.:
                    trash_count[1] += 1
                elif box.cls == 3.:
                    trash_count[2] += 1
                elif box.cls == 4.:
                    trash_count[3] += 1
                elif box.cls == 5.:
                    trash_count[4] += 1
                elif box.cls == 7.:
                    trash_count[5] += 1

    predict_result = {trash_name[i]: trash_count[i] for i in range(len(trash_name))}
    predict_result["total"] = sum(trash_count)

    return JSONResponse(predict_result)
