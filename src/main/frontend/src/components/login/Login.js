import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../../assets/css/login.css";

function Login(props) {
    const { register, handleSubmit, formState: { isSubmitting, isDirty, errors }} = useForm();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            window.location = "/";
        }
    }, [])

    const onSubmit = (formData) => {
        fetch("/api/login", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((json) => {

                // 로그인 성공
                if (json.code == "03") {
                    localStorage.setItem("user", json.data.userId);
                    localStorage.setItem("role", json.data.role);
                    window.location = "/";
                }

                // 로그인 실패
                if (json.code == "04") {
                    alert("아이디 또는 비밀번호가 잘못되었습니다.")
                }
            });
    }

    return (
        <div id="route-contents">
            <div className="login-contents">
                <form className="section1" onSubmit={handleSubmit(onSubmit)}>
                    <div className="logo">
                        <img src={require("../../assets/img/common/logo.png")} />
                    </div>
                    <div className="login-input">
                        <div className="input">
                            <label htmlFor="idInput">아이디</label>
                            <input
                                id="idInput"
                                type="text"
                                name="userId"
                                {...register("userId")}
                            />
                        </div>
                        <div className="input">
                            <label htmlFor="PassInput">비밀번호</label>
                            <input
                                id="PassInput"
                                type="password"
                                name="userPass"
                                {...register("userPass")}
                            />
                        </div>
                        <div className="btn-submit">
                            <button type="submit">로그인</button>
                        </div>
                    </div>
                </form>
                <div className="section2">
                    <img src={require("../../assets/img/login/사이드이미지.png")} />
                </div>
            </div>
        </div>
    );
}

export default Login;
