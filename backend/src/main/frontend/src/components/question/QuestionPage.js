import React, { useEffect, useState } from "react";
import Question from "../common/Question";

function QuestionPage() {

    return (
        <div id="route-contents">
            <div id="contents-title">문의하기</div>
            <Question/>
        </div>
    );
}

export default QuestionPage;
