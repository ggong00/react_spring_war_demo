import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

function SendMail({data, reload}) {
    const { register, handleSubmit, getValues, formState: { isSubmitting, isDirty, errors }} = useForm();

    const defaultMailMsg = {
        title: '안녕하세요 에이테크입니다.',
    }

    const create = (formData) => {

        //FormData 셋팅
        if(!formData.mailTitle) formData.mailTitle = defaultMailMsg.title; 
        const newFormData = new FormData();
        formData = {...data, ...formData}
        for(const name in formData) {
            if(name == 'attachFileList') {
                [...formData[name]].forEach(file => {
                    newFormData.append(name, file);
                })
            }else {
                newFormData.append(name, formData[name]);
            }
        }

        //메일 전송
        fetch("/api/admin/mail", {
            method: 'post',
            body: newFormData
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert("성공적으로 전송했습니다.");
                    reload();
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    const errorHadle = (error) => {
        alert(error.message.message);
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
                    <div className="form-title">메일</div>
                </div>
                <div className="form-main">
                    <div className="input">
                        <label>제목</label>
                        <input
                            type="text"
                            name="mailTitle"
                            autoComplete="off"
                            placeholder={`기본 : ${defaultMailMsg.title}`}
                            {...register("mailTitle", {
                            })}
                        />
                    </div>
                    <div className="input">
                        <label>내용</label>
                        <textarea
                            type="text"
                            name="message"
                            {...register("message", {
                                required:'메일 내용을 입력해주세요'
                            })}
                        />
                    </div>
                    <div className="input file">
                        <label>첨부파일</label>
                        <input
                            type="file"
                            multiple={true}
                            name="attachFileList"
                            autoComplete="off"
                            {...register("attachFileList", {
                            })}
                        />
                    </div>
                </div>    

                <div className="button-wrap">
                    <Button
                        title="메일 전송"
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

export default SendMail;
