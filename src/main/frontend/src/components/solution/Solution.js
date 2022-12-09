import React, { useEffect, useState } from "react";
import "../../assets/css/solution.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from "../../components/common/Modal";
import SolutionSlider from "./slider/SolutionSlider";

function Solution({userInfo}) {
    const [solution, setSolution] = useState([]);
    const [selectedNav, setSelectedNav] = useState("");
    const [modal, setModal] = useState({});
    const [licenseInfo, setLicenseInfo] = useState([
        {id: "trial", name: "체험 상품", desc: "서비스를 체험해 보고 싶은 고객"},
        {id: "basic", name: "Basic", },
        {id: "premium", name: "Premium", },
        {id: "custom", name: "맞춤형 상품", }
    ]);

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
            <div className="container">
                <h2>솔루션 소개</h2>

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
                        {/*<div className="question-wrap">*/}
                        {/*    <button*/}
                        {/*        className="btn-question"*/}
                        {/*        onClick={openModal}*/}
                        {/*    >15일 무료체험 신청하기</button>*/}
                        {/*</div>*/}
                    </div>
                </div>

                <div className="section-header">구축 비용</div>
                <div className="section3">

                    {solution
                        .find(ele => ele.solutionId == selectedNav)
                        ?.license
                        .map(ele => {
                            // return (
                            //     <tr key={ele.licenseId}>
                            //         <td>{ele.type}</td>
                            //         <td>{ele.basic}</td>
                            //         <td>{ele.premium}</td>
                            //         <td>{ele.custom}</td>
                            //     </tr>
                            // )
                        })
                    }

                    <ul className="license-info">
                        {/*{licenseInfo.map(m => {*/}
                        {/*    console.log(m);*/}
                        {/*    return (*/}
                        {/*        <li>*/}
                        {/*            <div className="card">*/}
                        {/*                <div className="card_header">*/}
                        {/*                    <h6>{m.name}</h6>*/}
                        {/*                    <p>{m.desc}</p>*/}
                        {/*                </div>*/}
                        {/*                <div className="card_body">*/}
                        {/*                    <dl>*/}
                        {/*                        <dd><span className="cost">　</span></dd>*/}
                        {/*                        <dd><span className="cost">0$</span> / 15일</dd>*/}
                        {/*                    </dl>*/}
                        {/*                    <div className="question-wrap">*/}
                        {/*                        <button*/}
                        {/*                            className="btn-question"*/}
                        {/*                            onClick={openModal}*/}
                        {/*                        >15일 무료체험 신청하기</button>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </li>*/}
                        {/*    )*/}
                        {/*})}*/}

                        <li>
                            <div className="card">
                                <div className="card_header">
                                    <h6>체험 상품</h6>
                                    <p>서비스를 체험해<br />보고 싶은 고객</p>
                                </div>
                                <div className="card_body">
                                    <dl>
                                        <dd><span className="cost">　</span></dd>
                                        <dd><span className="cost">0$</span> / 15일</dd>
                                    </dl>
                                    <div className="question-wrap">
                                        <button
                                            className="btn-question"
                                            onClick={openModal}
                                        >15일 무료체험 신청하기</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card">
                                <div className="card_header">
                                    <h6>Basic</h6>
                                    <p>합리적인 비용으로<br />사용하고 싶은 고객</p>
                                </div>
                                <div className="card_body">
                                    <dl>
                                        <dd><span className="cost">11$</span><span> / 연간 구독형</span></dd>
                                        <dd><span className="cost">110$</span><span> / 영구 라이선스</span></dd>
                                    </dl>

                                    <div className="question-wrap">
                                        <button
                                            className="btn-question"
                                            onClick={openModal}
                                            style={{background:'#4c7edc', border: '1px solid #4c7edc', color: '#fff'}}
                                        >도입 문의</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card">
                                <div className="card_header">
                                    <h6>Premium</h6>
                                    <p>합리적인 비용으로<br />사용하고 싶은 고객</p>
                                </div>
                                <div className="card_body">
                                    <dl>
                                        <dd><span className="cost">15$</span><span> / 연간 구독형</span></dd>
                                        <dd><span className="cost">150$</span><span> / 영구 라이선스</span></dd>
                                    </dl>

                                    <div className="question-wrap">
                                        <button
                                            className="btn-question"
                                            onClick={openModal}
                                            style={{background:'#4c7edc', border: '1px solid #4c7edc', color: '#fff'}}
                                        >도입 문의</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="card">
                                <div className="card_header">
                                    <h6>맞춤형 상품</h6>
                                    <p>합리적인 비용으로<br />사용하고 싶은 고객</p>
                                </div>
                                <div className="card_body">
                                    <dl>
                                        <dd><span className="cost">　</span><span></span></dd>
                                        <dd><span className="cost">별도문의</span><span> / 영구 라이선스</span></dd>
                                    </dl>

                                    <div className="question-wrap">
                                        <button
                                            className="btn-question"
                                            onClick={openModal}
                                        >도입 문의</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>


                    {/*<table className="license-info-table">*/}
                        {/*<thead>*/}
                        {/*    <tr>*/}
                        {/*        <th>구분</th>*/}
                        {/*        <th>Basic</th>*/}
                        {/*        <th>Premium</th>*/}
                        {/*        <th>맞춤형 제작</th>*/}
                        {/*    </tr>*/}
                        {/*</thead>*/}
                        {/*<tbody>*/}
                        {solution
                            .find(ele => ele.solutionId == selectedNav)
                            ?.license
                            .map(ele => {
                                // return (
                                //     <tr key={ele.licenseId}>
                                //         <td>{ele.type}</td>
                                //         <td>{ele.basic}</td>
                                //         <td>{ele.premium}</td>
                                //         <td>{ele.custom}</td>
                                //     </tr>
                                // )
                            })
                        }
                        {/*</tbody>*/}
                    {/*</table>*/}
                </div>
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
