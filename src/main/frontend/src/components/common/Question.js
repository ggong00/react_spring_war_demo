import React, { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../assets/css/question.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import QuestionFooter from "./QuestionFooter";

function Question({data, id, userInfo, type}) {
    const [ solution, setSolution ] = useState([]);
    const { register, handleSubmit, reset, control,formState: { isSubmitting, isDirty, errors }} = useForm({
        defaultValues: useMemo(() => userInfo),
    });

    useEffect(() => {
  
        // 솔루션 정보 조회
        fetch(`/api/solution`, {
            method : 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    setSolution(json.data);
                }
            });

    }, []);

    // 문의글 작성
    const onsubmit = (formData) => {
        let userId = '';
        let url = ''; 

        if(type == 'question') {
            url = "/api/question";

        } else if(type == 'license') {
            userId = localStorage.getItem("user");
            url = "/api/license-question";
        }

        fetch(url , {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData, userId : userId})
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert("답변은 이메일로 보내드립니다.");
                    window.location = "/";
                }
            }
            )
            .catch(error => {console.log(error)});
    }

    return (
        <form className="form-box" onSubmit={handleSubmit(onsubmit)}>
            <div className="input-box category">
                <div className="title">관심 제품 선택</div>

                <div className="inner-input">
                    {!data ? (solution.map((ele) => {
                        return (
                            <div className="input" key={ele.solutionId}>
                                <input
                                    id={"solution-" + ele.solutionId}
                                    type="radio"
                                    name="solution"
                                    value={ele.solutionId}
                                    defaultChecked={id ? ele.solutionId == id && true : ele.solutionId == 1 && true}
                                    {...register("solutionId")}
                                />
                                <label htmlFor={"solution-" + ele.solutionId}>{ele.solutionName}</label>
                            </div>
                        )
                    })) : (<div className="selected-solution">{data.solutionName}</div>)}
                </div>
            </div>

            <div className="input-box text">
                {/*<div className="title">소속</div>*/}
                {/*<div className="input">*/}
                {/*    <input*/}
                {/*        id="belong"*/}
                {/*        type="text"*/}
                {/*        name="belong"*/}
                {/*        disabled={data && true}*/}
                {/*        defaultValue={data ? data.belong : userInfo?.belong}*/}
                {/*        {...register("belong", {*/}
                {/*            required: "소속을 입력해주세요.",*/}
                {/*        })}*/}
                {/*    />*/}
                {/*</div>*/}

                {
                    type == 'question' || type == 'management' ? 
                    <>
                        <div className="input_group">
                            <label htmlFor="belong" className="title">회사명</label>
                            <input
                                className="form_control"
                                id="belong"
                                type="text"
                                name="belong"
                                disabled={data && true}
                                defaultValue={data ? data.belong : userInfo?.belong}
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
                                disabled={data && true}
                                defaultValue={data ? data.name : userInfo?.name}
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
                                disabled={data && true}
                                defaultValue={data ? data.position : userInfo?.position}
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
                                        disabled={data && true}
                                        value={data ? data.tel : userInfo?.tel}
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
                                disabled={data && true}
                                defaultValue={data ? data.email : userInfo?.email}
                                {...register("email", {
                                    required: "이메일을 입력해주세요.",
                                })}
                            />
                            <div className="error-box">
                                <div className="error-msg">{errors.email?.message}</div>
                            </div>
                        </div>
                    </> 
                    : null
                }

                <div className="input_group">
                    <label htmlFor="title" className="title">제목</label>
                    <input
                        className="form_control"
                        id="title"
                        type="text"
                        name="title"
                        disabled={data && true}
                        defaultValue={data && data.title}
                        {...register("title", {
                            required: "제목을 입력해주세요",
                        })}
                    />
                    <div className="error-box">
                        <div className="error-msg">{errors.title?.message}</div>
                    </div>
                </div>

                <div className="input_group">
                    <label htmlFor="contents" className="title">내용</label>
                    <textarea
                        className="form_control"
                        id="contents"
                        type="text"
                        name="contents"
                        disabled={data && true}
                        defaultValue={data && data.contents}
                        {...register("contents", {
                            required: "내용을 입력해주세요.",
                        })}
                    />
                    {errors.contents && <div className="error-box">{errors.contents.message}</div>}
                </div>
            </div>

            {!data && <QuestionFooter errors={errors} register={register} type={type} />}
        </form>
    );
}

export default Question;
