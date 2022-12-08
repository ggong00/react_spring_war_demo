import React, { useEffect, useState } from "react";
import "../../assets/css/solution.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from "../../components/common/Modal";
import SolutionSlider from "./slider/SolutionSlider";

function Solution({userInfo}) {
    const [solution, setSolution] = useState([]);
    const [selectedNav, setSelectedNav] = useState("");
    const [modal, setModal] = useState({})

    // 솔루션 정보 조회
    useEffect(() => {
        fetch("/api/solution", {
            method : 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    const solution = json.data.filter(ele => ele.solutionId != 99);

                    // 솔루션 정보 저장
                    setSolution(solution);
                    setSelectedNav(solution[0].solutionId);
                }
            });
    }, []);

    const changeSolution = (e) => {
        setSelectedNav(e.target.id);
    }

    // 모달
    const openModal = () => {
        setModal({
            ...modal,
            type: 'question',
            id: selectedNav,
            userInfo: userInfo,
            status : true
        });
    };
    const closeModal = () => {
        setModal({
            ...modal,
            status : false
        });
    };

    return (
        <div id="route-contents">
            <ul className="top-nav">
                {solution.map((ele) => {
                    return (
                        <li
                            id={ele.solutionId}
                            key={ele.solutionId}
                            className={ele.solutionId == selectedNav ? "selected" : ""}
                            onClick={changeSolution}
                        >{ele.solutionName}
                        </li>
                    )
                })}
            </ul>
            <div className="section-header">솔루션 주요기능</div>
            <div className="solution-contents">
                <div className="custom-slider">
                    <SolutionSlider solutionId={selectedNav}/>
                </div>

                <div className="section2">
                    <ul className="solution-detail">
                        {solution
                            .find(ele => ele.solutionId == selectedNav)
                            ?.detail
                            .map(ele => {
                                return (
                                    <li
                                    key={ele.detailId}
                                    >{ele.contents}</li>
                                )
                            })
                        }
                    </ul>
                    <div className="question-wrap">
                        <button
                            className="btn-question"
                            onClick={openModal}
                        >15일 무료체험 신청하기</button>
                    </div>
                </div>
            </div>

            <div className="section-header">구축비용</div>
            <div className="section3">
                <table className="license-info-table">
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>Basic</th>
                            <th>Premium</th>
                            <th>맞춤형 제작</th>
                        </tr>
                    </thead>
                    <tbody>
                    {solution
                        .find(ele => ele.solutionId == selectedNav)
                        ?.license
                        .map(ele => {
                            return (
                                <tr key={ele.licenseId}>
                                    <td>{ele.type}</td>
                                    <td>{ele.basic}</td>
                                    <td>{ele.premium}</td>
                                    <td>{ele.custom}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>

            <Modal
                open={modal.status}
                close={closeModal}
                header="솔루션 체험 신청"
                modal={modal}
            >
            </Modal>
        </div>
);
}

export default Solution;
