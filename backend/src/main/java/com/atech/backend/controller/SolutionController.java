package com.atech.backend.controller;

import com.atech.backend.dto.SolutionDTO;
import com.atech.backend.response.ResponseCode;
import com.atech.backend.response.ResponseMsg;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.service.solution.SolutionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(produces = "application/json")
@RequiredArgsConstructor
public class SolutionController {
    final private SolutionService solutionService;

    @GetMapping("/api/solution")
    public ResponseEntity findAll() {
        List<SolutionDTO.SolutionRes> solutionRes = solutionService.findALl();

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS, solutionRes),
                HttpStatus.OK
        );
    }
}
