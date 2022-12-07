import React from "react";
import "../../assets/css/modal.css";
import Question from "../common/Question";
import ManagementModal from "../admin/management/ManagementModal";

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
                    {modal.type == "question" && <main><Question id={modal.id}/></main>}
                    {modal.type == "management" && <main><ManagementModal data={modal.data} close={close}/></main>}
                </section>
            ) : null}
        </div>
    );
}

export default Modal;
