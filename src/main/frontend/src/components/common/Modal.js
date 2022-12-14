import React from "react";
import "../../assets/css/modal.css";
import Question from "../common/Question";
import ManagementModal from "../admin/management/ManagementModal";
import MyLicneseModal from "../../components/my-license/MyLicenseModal"

function Modal(props) {

    const { open, close, header, modal } = props;

    return (
        <div className={open ? "openModal modal" : "modal"}>
            {open ? (
                <section className="modal-lg">
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    {
                        modal.type == "question" && 
                        <main><Question id={modal.id} type='license' userInfo={modal.userInfo}/></main>
                    }
                    {
                        modal.type == "management" && 
                        <main><ManagementModal 
                            data={modal.data} 
                            reload={modal.reload}
                            type={modal.managementType}
                        /></main>
                    }
                    {
                        modal.type == "my-license" && 
                        <main><MyLicneseModal userInfo={modal.userInfo} reload={modal.reload}/></main>
                    }
                </section>
            ) : null}
        </div>
    );
}

export default Modal;
