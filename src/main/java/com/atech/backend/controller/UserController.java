package com.atech.backend.controller;

import com.atech.backend.dto.UserDTO;
import com.atech.backend.response.ResponseCode;
import com.atech.backend.response.ResponseMsg;
import com.atech.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(produces = "application/json")
@RequiredArgsConstructor
public class UserController {

    final private UserService userService;

    @GetMapping("/api/loginChk")
    public ResponseEntity loginStatus() {
        UserDTO.UserInfoRes userInfoRes = userService.loginChk();

        if (userInfoRes == null) {

            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.SUCCESS, false),
                    HttpStatus.OK
            );
        }

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS, userInfoRes),
                HttpStatus.OK
        );
    }
}
