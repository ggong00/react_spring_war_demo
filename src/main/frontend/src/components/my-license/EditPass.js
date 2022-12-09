import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

function EditPass({userInfo, close}) {
    const { register, handleSubmit, getValues, formState: { isSubmitting, isDirty, errors }} = useForm();

    const onsubmit = (formData) => {
        console.log(formData)
    }

    return (
    <form className="form-box pass" onSubmit={handleSubmit(onsubmit)}>
        <div className="input-box text">
            <div className="title">비밀번호</div>
            <div className="input">
                <input
                    id="pass1"
                    type="text"
                    name="pass1"
                    {...register("pass1", {
                        required: "비밀번호를 입력해주세요.",
                    })}
                />
            </div>
            <div className="error-box">
                <div className="error-msg">{errors.pass1?.message}</div>
            </div>
        </div>

        <div className="input-box text">
            <div className="title">비밀번호 확인</div>
            <div className="input">
                <input
                    id="pass2"
                    type="text"
                    name="pass2"
                    {...register("pass2", {
                        validate: () => {
                            if(getValues('pass1') == getValues('pass2')) {
                                return true;
                            } else {
                                return '비밀번호가 일치하지 않습니다.'
                            }
                        },
                    })}
                />
            </div>
            <div className="error-box">
                <div className="error-msg">{errors.pass2?.message}</div>
            </div>
        </div>

        <div className="btn-group">
            <Button title='변경' backgroundColor="var(--main-bg-color)"/>
            <Button title='취소' backgroundColor="red" onClick={close}/>
        </div>
    </form>
    );
}

export default EditPass;

