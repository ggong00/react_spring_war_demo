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
                        <main><Question id={modal.id} mode='modal' userInfo={modal.userInfo}/></main>
                    }
                    {
                        modal.type == "management" && 
                        <main><ManagementModal data={modal.data} close={close}/></main>
                    }
                    {
                        modal.type == "my-license" && 
                        <main><MyLicneseModal userInfo={modal.userInfo} close={close}/></main>
                    }
                </section>
            ) : null}
        </div>
    );
}

export default Modal;
