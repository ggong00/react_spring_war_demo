import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../../../assets/css/management.css";
import Modal from "../../common/Modal";

function Management(props) {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState({});
    const [selectStatus, setSelectStatus] = useState("ALL");
    const [dataReload, setDataReload] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (!role || role != "ROLE_ADMIN") {
            window.location = "/";
        }
        getData();
    }, [selectStatus, dataReload]);

    const columnDefs = [
        { field: "belong", headerName: "소속", flex: 1, filter: false },
        { field: "name", headerName: "성함", flex: 1, filter: false },
        { field: "position", headerName: "직책", flex: 1, filter: false },
        { field: "tel", headerName: "전화번호", flex: 1, filter: false },
        { field: "solutionName", headerName: "신청 솔루션", flex: 1, filter: false },
        // { field: "createDtm", headerName: "등록일", flex: 1, filter: false },
        { field: "resYn", headerName: "상태", flex: 1, filter: false },
    ];

    const getData = () => {
        fetch(`/api/admin/question?status=${selectStatus}`, {
            method : 'get'
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    const newMap = json.data.map(ele => {
                        return {
                            ...ele, 
                            resYn: ele.resYn == 'SUCCESS' ?
                             {txt:'지급완료', order: 2} 
                             : ele.resYn == 'DELETE' ?
                             {txt:'삭제', order: 3} : {txt:'대기', order: 1}
                        }
                    });

                    newMap.sort((a,b) => a.resYn.order - b.resYn.order);

                    const sortedMap = newMap.map(ele => {
                        return {...ele, resYn: ele.resYn.txt};
                    })

                    setData(sortedMap);
                }
            });
    }

    const changeStatus = (e) => {
        if(e.target.tagName != 'LI') return;

        setSelectStatus(e.target.dataset.value);
    }

    const cellClickHandler = (e) => {
        openModal(e.data);
    }

    // 모달
    const openModal = (data) => {
        setModal({
            ...modal,
            type: 'management',
            data: data,
            reload: reload,
            status : true,
        });
    };

    const closeModal = () => {
        setModal({
            ...modal,
            status : false
        });
    };

    const reload = () => {
        setModal({
            ...modal,
            status : false
        });

        setDataReload(!dataReload);
    };

    return (
        <div id="route-contents">
            <div className="management-contents">
                <div id="contents-title">문의글 관리 페이지</div>

                <ul className="status-option" onClick={changeStatus}>
                    <li className={selectStatus == "ALL" ? 'selected' : ''} data-value='ALL'>전체</li>
                    <li className={selectStatus == "NEW" ? 'selected' : ''} data-value='NEW'>대기</li>
                    <li className={selectStatus == "SUCCESS" ? 'selected' : ''} data-value='SUCCESS'>지급완료</li>
                </ul>

                <div className="grid-wrap">
                    <div className="ag-theme-alpine"  style={{ width: "100%", height: "700px" }}>
                        <AgGridReact
                            rowData={data}
                            columnDefs={columnDefs}
                            pagination={true}
                            paginationPageSize={25}
                            onCellClicked={cellClickHandler}
                            overlayNoRowsTemplate={
                                "문의글이 없습니다."
                            }
                        />
                    </div>
                </div>
            </div>

            <Modal
                open={modal.status}
                close={closeModal}
                header="문의글 상세정보"
                modal={modal}
            >
            </Modal>
        </div>
    );
}

export default Management;
