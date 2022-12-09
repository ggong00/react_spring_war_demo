import React, { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from 'react-phone-number-input'
import Button from "../common/Button";
import 'react-phone-number-input/style.css'

function EditInfo({userInfo, close}) {
    const { register, handleSubmit, reset, control,formState: { isSubmitting, isDirty, errors }} = useForm({
        defaultValues: useMemo(() => userInfo),
    });

    const onsubmit = (formData) => {
        console.log(formData)
    }

    return (
    <form className="form-box" onSubmit={handleSubmit(onsubmit)}>
        <div className="input-box text">
            <div className="title">소속</div>
            <div className="input">
                <input
                    id="belong"
                    type="text"
                    name="belong"
                    defaultValue={userInfo?.belong}
                    {...register("belong", {
                        required: "소속을 입력해주세요.",
                    })}
                />
            </div>
            <div className="title">성함</div>
            <div className="input">
                <input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={userInfo?.name}
                    {...register("name", {
                        required: "이름을 입력해주세요.",
                    })}
                />
            </div>
            <div className="error-box">
                <div className="error-msg">{errors.belong?.message}</div>
                <div className="error-msg">{errors.name?.message}</div>
            </div>
        </div>

        <div className="input-box text">
            <div className="title">직책</div>
            <div className="input">
                <input
                    id="position"
                    type="text"
                    name="position"
                    defaultValue={userInfo?.position}
                    {...register("position", {
                        required: "칙책을 입력해주세요.",
                    })}
                />
            </div>
            <div className="title">핸드폰</div>
            <div className="input">
                <Controller
                    name="tel"
                    control={control}
                    rules={{ required: "전화번호를 입력해주세요." }}
                    render={({ field: { onChange, value } }) => (
                        <PhoneInput
                            id="tel"
                            type="tel"
                            name="tel"
                            international
                            initialValueFormat="national"
                            onChange={onChange}
                            value={userInfo?.tel}
                            defaultCountry="TR"
                        />
                    )}
                />
            </div>
            <div className="error-box">
                <div className="error-msg">{errors.position?.message}</div>
                <div className="error-msg">{errors.tel?.message}</div>
            </div>
        </div>
        <div className="btn-group">
            <Button title='변경' backgroundColor="var(--main-bg-color)"/>
            <Button title='취소' backgroundColor="red" onClick={close}/>
        </div>
    </form>
    );
}

export default EditInfo;

