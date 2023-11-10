from fastapi import FastAPI, File
from fastapi.responses import JSONResponse
import numpy as np
import cv2
from ultralytics import YOLO
import io
from starlette.responses import StreamingResponse
import base64

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

color = [
    [255, 0 ,0],
    [0, 255 ,255],
    [102, 51 ,255],
    [102, 255 ,102],
    [255, 255 ,102],
    [255, 102 ,153],
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

# image upload 후 예측 결과 이미지반환
@app.post('/ai/image')
def predict(file: bytes = File() ):
        
    # numpy를 image buffer를 array로 변환
    nparr = np.frombuffer(file, np.uint8)

    # 이미지 코드로 변환
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 예측 실행
    results = model(img)

    # class 별 count 초기화 
    trash_count = [0]*6

    confidences = []
    bboxes = []
    class_ids = []
    for result in results:
        boxes = result.boxes
        for box in boxes:
            
            # print(xyxy)
            confidence = box.conf

            # 0.4 이상의 confidence 만 검출
            if confidence >= 0.4:
                xyxy = box.xyxy.tolist()[0]
                bboxes.append(xyxy)
                confidences.append(float(confidence))
                class_ids.append(int(box.cls.tolist()[0]-1))

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

    # 결과 객체
    predict_result = {trash_name[i]: trash_count[i] for i in range(len(trash_name))}
    predict_result["total"] = sum(trash_count)

    # cv2 가 제공하는 후처리 모델
    result_boxes = cv2.dnn.NMSBoxes(bboxes, confidences, 0.25, 0.45, 0.5)

    # cv2 글씨 폰트..
    font = cv2.FONT_HERSHEY_PLAIN

    # cv2 박스, 글씨 생성
    for i in range(len(bboxes)):
        if i in result_boxes:
            bbox = list(map(int, bboxes[i])) 
            x, y, x2, y2 = bbox

            cv2.rectangle(img, (x, y), (x2, y2), color[class_ids[i]], 2)
            cv2.putText(img, 
                        trash_name[class_ids[i]]
                        , (x, y + 30), font, 2, color[class_ids[i]], 2)

    # cv2 데이터를 base64 로 인코딩
    encode_param=[int(cv2.IMWRITE_JPEG_QUALITY),90]
    _, bts = cv2.imencode('.jpg', img, encode_param)
    encoded = base64.b64encode(bts.tobytes())
    decoded = encoded.decode('ascii')

    result = {
        "decodedImage" : decoded,
        "predictResult" : predict_result
    }
    return JSONResponse(result)