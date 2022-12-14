import React, { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import AuthMail from "../common/AuthMail";
import 'react-phone-number-input/style.css'
import '../../assets/css/join.css'
import PhoneInput from 'react-phone-number-input'

function Join({setSelectedMenu}) {
    const { register, handleSubmit, reset, control, watch, formState: { isSubmitting, isDirty, errors }} = useForm();
    const { mailSuccess, setMailSuccess} = useState(false);

    const sucsess = () => {
        setMailSuccess(true);
    }

    const fail = () => {
        setMailSuccess(false);
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
            window.location = "/";
        }

        setSelectedMenu("join");
    }, [])

    const onSubmit = (formData) => {
        console.log(formData)
        fetch("/api/join", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert("회원가입이 완료되었습니다.");
                    window.location = '/login';
                }
            }
            )
            .catch(error => {console.log(error)});
    }

    const errorHandle = (error) => {
        if(error.email.type != 'required' && error.email.message) {
            alert(error.email.message)
            return;
        }
    }

    return (
    <div className="join-contents">
        <div className="join_wrap">
            <div className="title">회원가입</div>
            <form className="form-box" onSubmit={handleSubmit(onSubmit,errorHandle)}>
                <div className="input-box text">
                    <div className="input_group">
                        <label htmlFor="userId" className="title">아이디</label>
                        <input
                            className="form_control"
                            id="userId"
                            type="text"
                            name="userId"
                            autoComplete="off"
                            {...register("userId", {
                                required: "아이디는 필수 입력입니다.",
                            })}
                        />
                        <div className="error-box">
                            <div className="error-msg">{errors.userId?.message}</div>
                        </div>
                    </div>

                    <div htmlFor="userPass" className="input_group">
                        <label className="title">비밀번호</label>
                        <input
                            id="userPass"
                            className="form_control"
                            type="text"
                            name="userPass"
                            autoComplete="off"
                            {...register("userPass", {
                                required: "비밀번호는 필수 입력입니다.",
                            })}
                        />
                        <div className="error-box">
                            <div className="error-msg">{errors.userPass?.message}</div>
                        </div>
                    </div>

                    <div className="input_group">
                        <label htmlFor="belong" className="title">회사명</label>
                        <input
                            className="form_control"
                            id="belong"
                            type="text"
                            name="belong"
                            {...register("belong", {
                                required: "회사명을 입력해주세요.",
                            })}
                        />
                        <div className="error-box">
                            <div className="error-msg">{errors.belong?.message}</div>
                        </div>
                    </div>

                    <div className="input_group">
                        <label htmlFor="name" className="title">이름</label>
                        <input
                            className="form_control"
                            id="name"
                            type="text"
                            name="name"
                            {...register("name", {
                                required: "이름을 입력해주세요.",
                            })}
                        />
                        <div className="error-box">
                            <div className="error-msg">{errors.name?.message}</div>
                        </div>
                    </div>

                    <div className="input_group">
                        <label htmlFor="position" className="title">직책</label>
                        <input
                            className="form_control"
                            id="position"
                            type="text"
                            name="position"
                            {...register("position", {
                                required: "칙책을 입력해주세요.",

                            })}
                        />
                        <div className="error-box">
                            <div className="error-msg">{errors.position?.message}</div>
                        </div>
                    </div>

                    <div className="input_group">
                        <label htmlFor="tel" className="title">핸드폰</label>
                        <Controller
                            name="tel"
                            control={control}
                            rules={{ required: "전화번호를 입력해주세요." }}
                            render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                    className="form_control"
                                    id="tel"
                                    type="tel"
                                    name="tel"
                                    international
                                    initialValueFormat="national"
                                    onChange={onChange}
                                    defaultCountry="TR"
                                />
                            )}
                        />
                        <div className="error-box">
                            <div className="error-msg">{errors.tel?.message}</div>
                        </div>
                    </div>

                    <div className="input_group">
                        <label htmlFor="email" className="title">이메일</label>
                        <input
                            className="form_control"
                            id="email"
                            type="email"
                            name="email"
                            {...register("email", {
                                required: "메일을 입력해주세요.",
                                validate: () => {
                                    if(mailSuccess) {
                                        return true;
                                    } else {
                                        return '메일을 인증해주세요.'
                                    }
                                },
                            })}
                        />
                        <div className="error-box">
                            <div className="error-msg">{errors.email?.type == 'required' && errors.email?.message}</div>
                        </div>
                    </div>
                    <AuthMail sucsess={sucsess} fail={fail} to={watch("email")}/>
        
                    <div className="btn-submit">
                        <button className="btn" type="submit">회원가입</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
}

export default Join;