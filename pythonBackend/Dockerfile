# FROM: 이미지 지정
FROM ultralytics/ultralytics

# COPY: 이미지에 파일이나 폴더를 추가
COPY server.py server.py
COPY yolov8s_custom.pt yolov8s_custom.pt

RUN pip install flask
RUN pip install waitress


# ENTRYPOINT: 컨테이너를 실행할 때 실행할 명령어 강제 지정
ENTRYPOINT ["python", "server.py"]
