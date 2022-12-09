import React, { useEffect, useState } from "react";
import Question from "../../common/Question"
import CreateUser from "../CreateUser";
import CreateLicense from "../CreateLicense";
import "../../../assets/css/management-modal.css"

function ManagementModal({data, close}) {

    return (
        <>
            <Question data={data}/>
            <CreateUser data={data}/>
            <CreateLicense data={data} close={close}/>
        </>
    );
}

export default ManagementModal;

