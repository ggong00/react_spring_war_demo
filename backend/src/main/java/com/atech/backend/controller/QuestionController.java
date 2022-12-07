package com.atech.backend.controller;

import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.response.ResponseCode;
import com.atech.backend.response.ResponseMsg;
import com.atech.backend.service.question.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(produces = "application/json")
@RequiredArgsConstructor
public class QuestionController {
    final private QuestionService questionService;

    @PostMapping("/api/question")
    public ResponseEntity insert(@RequestBody QuestionDTO.QuestionReq questionReq) {
        log.info("questionReq = {}",questionReq);
        questionService.insert(questionReq);

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS),
                HttpStatus.OK
        );
    }
}
