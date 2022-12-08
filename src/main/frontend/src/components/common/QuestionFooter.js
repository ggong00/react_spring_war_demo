import React, { useEffect, useState } from "react";
import Button from "./Button";

function QuestionFooter(props) {
    const {errors, register, mode} = props

    return (
        <>
            <div className="agree">
                <label htmlFor="agree" className="title">개인정보 수집 및 이용에 동의합니다.</label>
                <input
                    id="agree"
                    type="checkbox"
                    name="agree"
                    value="on"
                    {...register("agree", {
                        required: "개인정보 수집 및 이용에 동의해주세요.",
                    })}
                />
            </div>
            {errors.agree && <div className="error-box">{errors.agree.message}</div>}

            <div className="btn-group">
                <Button title={mode == 'modal' ? '신청하기' : '문의하기'} backgroundColor="var(--main-bg-color)"/>
            </div>
        </>
    )
}

export default QuestionFooter;