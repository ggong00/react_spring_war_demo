import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../../../assets/css/management.css";
import Modal from "../../common/Modal";

function Management(props) {
    const [data, setData] = useState([]);
    const [modal, setModal] = useState({});
    const [selectStatus, setSelectStatus] = useState("NEW");

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (!role || role != "ROLE_ADMIN") {
            window.location = "/";
        }
        getData();
    }, []);

    const columnDefs = [
        { field: "belong", headerName: "소속", filter: true},
        { field: "name", headerName: "성함", filter: true },
        { field: "position", headerName: "직책", filter: true },
        { field: "tel", headerName: "전화번호", filter: true },
        { field: "name", headerName: "신청 솔루션", filter: true },
    ];

    const getData = () => {
        fetch(`/api/admin/question?status=${selectStatus}`, {
            method : 'get'
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "00") {
                    setData(json.data);
                }
            });
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
            status : true,
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
            <div className="management-contents">
                <div id="contents-title">문의글 관리 페이지</div>
                <div className="grid-wrap">
                    <div className="ag-theme-alpine"  style={{ width: "100%", height: "700px" }}>
                        <AgGridReact
                            rowData={data}
                            columnDefs={columnDefs}
                            pagination={true}
                            paginationPageSize={10}
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
