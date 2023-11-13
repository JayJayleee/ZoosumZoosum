package com.addShot.zoosum.util.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({UserNotFoundException.class, UnsatisfiedUserLoginDataException.class, NotEnoughSeedException.class, NotEnoughInputException.class,
        NotExistTreeException.class, NotExistAnimalException.class, NotExistIslandException.class, ExceedRequestException.class})
    public ResponseEntity<CustomErrorResponse> customBadRequestException(Exception e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CustomErrorResponse(e.getMessage()));
    }

    @ExceptionHandler({InvalidTokenException.class})
    public ResponseEntity<CustomErrorResponse> nicknameUpdateException(Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new CustomErrorResponse(e.getMessage()));
    }

    @ExceptionHandler()
    public ResponseEntity<CustomErrorResponse> internalServerErrorException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new CustomErrorResponse(e.getMessage()));
    }

//    @ExceptionHandler({Exception.class})
//    public ResponseEntity<CustomErrorResponse> commonBadRequestException(Exception e) {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CustomErrorResponse(CustomErrorType.BAD_REQUEST.getMessage()));
//    }


}
