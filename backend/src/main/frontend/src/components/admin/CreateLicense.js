import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

function CreateLicense({data, close}) {
    const { register, handleSubmit, formState: { isSubmitting, isDirty, errors }} = useForm();

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
                    close();
                    window.location.reload();
                } else if (json.code == "05-2") {
                    alert("사이트 계정을 먼저 생성해주세요");
                }
            })
            .catch(error => {
                console.log(error)
            });
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
                    close();
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    return (
        <>
            <form className="user-form" onSubmit={handleSubmit(create)}>
                <div className="form-header">
                    <div className="form-title">솔루션</div>
                </div>
                <div className="form-main">
                    <div className="input">
                        <label>아이디</label>
                        <input
                            type="text"
                            name="siteId"
                            autoComplete="off"
                            {...register("siteId", {
                                required: "ID는 필수 입력입니다.",
                            })}
                        />
                    </div>
                    <div className="input">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            name="sitePass"
                            autoComplete="off"
                            {...register("sitePass", {
                                required: "비밀번호는 필수 입력입니다.",
                            })}
                        />
                    </div>
                    <div className="input">
                        <label>주소</label>
                        <input
                            type="test"
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
