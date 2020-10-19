package com.deloitte.app.todoapp.controller;

import com.deloitte.app.todoapp.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

    @Controller
    public class LoginController {


        @PostMapping(value = "/processLogin")
        public String processLogin(User login) throws Error{

            String userName = login.getUserName();
            String password = login.getPassword();

            if ("test".equalsIgnoreCase(userName)
                    && "pwd123".equalsIgnoreCase(password)) {
                return "Success";
            } else {
                return "Error";
            }

        }
    }
