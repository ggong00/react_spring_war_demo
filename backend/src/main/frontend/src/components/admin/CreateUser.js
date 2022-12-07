import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

function CreateUser({data}) {
    const { register, handleSubmit, formState: { isSubmitting, isDirty, errors }} = useForm();
    
    const create = (formData) => {
        fetch("/api/admin/create-user", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data, ...formData})
        })
            .then((res) => res.json())
            .then((json) => {
                    if (json.code == "00") {
                        alert("정상적으로 처리되었습니다.");
                    }
                    if (json.code == "05") {
                        alert("이미 계정이 존재합니다.");
                    }
                    if (json.code == "06") {
                        alert("ID가 중복됩니다.");
                    }
                }
            )
            .catch(error => {console.log(error)});
    }
    
    return (
        <>
            <form className="user-form" onSubmit={handleSubmit(create)}>
                <div className="form-header">
                    <div className="form-title">사이트</div>
                </div>
                <div className="form-main">
                    <div className="input">
                        <label>아이디</label>
                        <input
                            type="text"
                            name="userId"
                            autoComplete="off"
                            {...register("userId", {
                                required: "ID는 필수 입력입니다.",
                            })}
                        />
                    </div>
                    <div className="input">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="userPass"
                            autoComplete="off"
                            {...register("userPass", {
                                required: "비밀번호는 필수 입력입니다.",
                            })}
                        />
                    </div>
                </div>
                <div className="button-wrap">
                    <Button
                        title="생성"
                        backgroundColor="#54B435"
                    />
                </div>
            </form>
        </>
    );
}

export default CreateUser;

