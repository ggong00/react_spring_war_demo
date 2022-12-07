import React, { useEffect, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../assets/css/question.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import QuestionFooter from "../question/QuestionFooter";

function Question({data, id}) {
    const [ solution, setSolution ] = useState([]);
    const [ loginUser, setLoginUser ] = useState({});
    const { register, handleSubmit, reset, control,formState: { isSubmitting, isDirty, errors }} = useForm({
        defaultValues: useMemo(() => loginUser),
    });

    useEffect(() => {
        // 로그인 유저 정보 조회
        if (localStorage.getItem("user") && !data) {
            fetch("/api/user", {
                method : 'get',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    if (json.data) {
                        setLoginUser(json.data);
                        reset(json.data);
                    }
                });
        }

        // 솔루션 정보 조회
        fetch("/api/solution", {
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
        const user = localStorage.getItem("user") || null;

        fetch("/api/question", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...formData, userId : user})
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    alert("정상적으로 처리되었습니다.");
                    window.location.reload();
                }
            }
            )
            .catch(error => {console.log(error)});
    }

    return (
        <form className="form-box" onSubmit={handleSubmit(onsubmit)}>
            <div className="input-box category">
                <div className="title">솔루션</div>
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
                <div className="title">소속</div>
                <div className="input">
                    <input
                        id="belong"
                        type="text"
                        name="belong"
                        disabled={data && true}
                        defaultValue={data ? data.belong : loginUser?.belong}
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
                        disabled={data && true}
                        defaultValue={data ? data.name : loginUser?.name}
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
                        disabled={data && true}
                        defaultValue={data ? data.position : loginUser?.position}
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
                                disabled={data && true}
                                value={data ? data.tel : loginUser?.tel}
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

            <div className="input-box text">
                <div className="title">이메일</div>
                <div className="input">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        disabled={data && true}
                        defaultValue={data ? data.email : loginUser?.email}
                        {...register("email", {
                            required: "이메일을 입력해주세요.",

                        })}
                    />
                </div>
                <div className="title">제목</div>
                <div className="input">
                    <input
                        id="title"
                        type="text"
                        name="title"
                        disabled={data && true}
                        defaultValue={data && data.title}
                        {...register("title", {
                            required: "제목을 입력해주세요",
                        })}
                    />
                </div>
                <div className="error-box">
                    <div className="error-msg">{errors.email?.message}</div>
                    <div className="error-msg">{errors.title?.message}</div>
                </div>

            </div>

            <div className="input-box contents-box">
                <div className="title">내용</div>
                <div className="input">
                    <textarea
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
            {!data && <QuestionFooter errors={errors} register={register}/>}
        </form>
    );
}

export default Question;
