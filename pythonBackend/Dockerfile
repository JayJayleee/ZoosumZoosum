# FROM: 이미지 지정
FROM ultralytics/ultralytics

# COPY: 이미지에 파일이나 폴더를 추가
COPY fastapiserver.py fastapiserver.py
COPY yolov8s_custom.pt yolov8s_custom.pt
COPY yolov8n_custom.pt yolov8n_custom.pt

RUN pip install fastapi
RUN pip install uvicorn
RUN pip install python-multipart


# ENTRYPOINT: 컨테이너를 실행할 때 실행할 명령어 강제 지정
# ENTRYPOINT ["uvicorn", "fastapiserver:app --host 0.0.0.0 --port 8000 --workers 4"]
