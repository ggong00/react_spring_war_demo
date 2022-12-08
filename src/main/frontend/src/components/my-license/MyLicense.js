import React, { useEffect, useState } from "react";
import "../../assets/css/my-license.css";

function MyLicense({userInfo}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (!role) {

            window.location = "/";
        }
        getData();
    }, []);

    const getData = () => {
        fetch(`/api/my-license`, {
            method : 'get'
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    setData(json.data);
                }
            });
    }

    const moveLink = (e) => {
        const link = e.target.dataset.url;
        window.open(link, "_blank");
    }

    return (
        <div id="route-contents">
            <div className="my-license-contents">
                <div className="title">마이페이지</div>
                <div className="user-info">
                    <div className="name">{userInfo?.name}</div>
                    <div className="belong">{userInfo?.belong}</div>
                </div>
                <table className="my-license-table">
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>솔루션</th>
                        <th>계정정보</th>
                        <th>신청일</th>
                        <th>만료일</th>
                        <th>상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data
                        .map((ele,idx) => {
                            return (
                                <tr key={ele.myLicenseId}>
                                    <td>{idx + 1}</td>
                                    <td>{ele.solutionName}</td>
                                    <td>{`${ele.siteId} / ${ele.sitePass}`}</td>
                                    <td>{ele.startDate}</td>
                                    <td>{ele.endDate}</td>
                                    <td>{
                                        ele.status ?
                                            <button
                                                className="btn-solution-link"
                                                onClick={moveLink}
                                                data-url={ele.siteUrl}
                                            >바로가기</button>
                                            :
                                            <div>만료</div>
                                    }
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyLicense;
