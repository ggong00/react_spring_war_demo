import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

function CreateLicense({data, reload}) {
    const { register, handleSubmit, getValues, formState: { isSubmitting, isDirty, errors }} = useForm();

    const create = (formData) => {
        fetch("/api/admin/license", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data, ...formData})
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert("성공적으로 지급되었습니다.");
                    reload();
                } else if (json.code == "05-2") {
                    alert("사이트 계정을 먼저 생성해주세요");
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    const errorHadle = (error) => {
        const order = ['siteId', 'sitePass', 'siteUrl'];
        const first = order
                        .map(ele => error[ele])
                        .find(ele => ele);

        alert(first.message);
    }

    const onDelete = () => {
        fetch(`/api/admin/question/${data.questionId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    reload();
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <>
            <form className="user-form" onSubmit={handleSubmit(create,errorHadle)}>
                <div className="form-header">
                    <div className="form-title">솔루션</div>
                </div>
                <div className="form-main">
                    <div className="input">
                        <label className="essential">아이디</label>
                        <input
                            type="text"
                            name="siteId"
                            autoComplete="off"
                            {...register("siteId", {
                                required: "아이디는 필수 입력입니다.",                                                   
                            })}
                        />
                    </div>
                    <div className="input">
                        <label className="essential">비밀번호</label>
                        <input
                            type="text"
                            name="sitePass"
                            autoComplete="off"
                            {...register("sitePass", {
                                required: "비밀번호는 필수 입력입니다.",
                            })}
                        />
                    </div>
                    <div className="input">
                        <label className="essential">주소</label>
                        <input
                            type="text"
                            name="siteUrl"
                            autoComplete="off"
                            {...register("siteUrl", {
                                required: "주소는 필수 입력입니다.",
                            })}
                        />
                    </div>
                </div>
                <div className="button-wrap">
                    <Button
                        title="라이선스 지급"
                        backgroundColor="var(--main-bg-color)"
                    />
                    <Button
                        title="삭제"
                        onClick={onDelete}
                        backgroundColor="red"
                    />
                </div>
            </form>
        </>
    );
}

export default CreateLicense;
