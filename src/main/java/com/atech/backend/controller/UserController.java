package com.atech.backend.controller;

import com.atech.backend.config.security.login.JsonUsernamePasswordAuthenticationFilter;
import com.atech.backend.dto.UserDTO;
import com.atech.backend.repository.user.User;
import com.atech.backend.response.ResponseCode;
import com.atech.backend.response.ResponseMsg;
import com.atech.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

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

    @PostMapping("/api/user/info")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity updateInfo(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody UserDTO.UserReq userReq
    ) throws IOException {
        log.info("user {}", userReq);
        Integer resultCnt = userService.updateInfo(userReq);

        if (resultCnt == 0) {
            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.FAIL, false),
                    HttpStatus.OK
            );
        }

        // 세션 등록
        SecurityContextHolder.getContext().setAuthentication(createNewAuthentication(userReq.getUserId()));

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS, true),
                HttpStatus.OK
        );
    }

    @PostMapping("/api/user/pass")
    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity updatePass(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody UserDTO.UserReq userReq
    ) throws NoSuchAlgorithmException, InvalidKeySpecException, IOException {
        log.info("user {}", userReq);
        Integer resultCnt = userService.updatePass(userReq);

        if (resultCnt == 0) {
            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.FAIL, false),
                    HttpStatus.OK
            );
        }

        // 세션 등록
        SecurityContextHolder.getContext().setAuthentication(createNewAuthentication(userReq.getUserId()));

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS, true),
                HttpStatus.OK
        );
    }

    protected Authentication createNewAuthentication(String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails details = userService.findByUserId(username);
        UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(details, details.getPassword(), details.getAuthorities());
        newAuth.setDetails(authentication.getDetails());
        return newAuth;
    }
}
