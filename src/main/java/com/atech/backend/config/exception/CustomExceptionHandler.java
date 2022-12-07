package com.atech.backend.config.exception;

import com.atech.backend.response.ResponseCode;
import com.atech.backend.response.ResponseMsg;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(Exception.class)
    protected ResponseEntity handleIllegalArgumentException(Exception e) {
        e.printStackTrace();

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SERVER_ERROR, e.getMessage()),
                HttpStatus.OK);
    }
}
