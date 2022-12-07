package com.atech.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @PreAuthorize("permitAll()")
    @GetMapping(value =  {"", "/solution","/question", "/my_license", "/admin/management", "/login"})
    public String handleError() {
        return "forward:/index.html";
    }
}
