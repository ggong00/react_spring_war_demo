import { ColDefUtil } from "ag-grid-community";
import React, {useEffect, useState} from "react";

function AuthMail({to,success,fail}) {
    const [codeValue, setCodeValue] = useState();

    const changeHandle = ({target}) => {
        setCodeValue(target.value);
    }

    const sendAuthMail = () => {
        // fetch(`/api/send-code`, {
        //     method: 'delete',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then((res) => res.json())
        //     .then((json) => {
        //         console.log(json)
        //         if (json.code == "00") {

        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     });
    }

    const onAuth = () => {
        // fetch(`/api/code-check`, {
        //     method: 'delete',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })
        //     .then((res) => res.json())
        //     .then((json) => {
        //         console.log(json)
        //         if (json.code == "00") {

        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     });
    }

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                margin: '16px 0px',
            }}>
                <input
                    style={{
                        flex: '4',
                        padding: '6px',
                        marginRight: '8px',
                        borderRadius: '4px',
                    }}
                    type="text"
                    placeholder="인증코드를 입력해주세요."
                    maxLength={8}
                    onChange={changeHandle}
                />
                <button
                    style={{
                        flex: '1',
                        backgroundColor: 'rgb(240 125 125)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px',
                        color: 'white',
                        margin: '0 4px',
                    }} 
                    type="button"
                    onClick={sendAuthMail}
                >
                    메일 전송
                </button>
                <button
                    style={{
                        flex: '1',
                        backgroundColor: 'rgb(131 142 128 / 54%)',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px',
                        color: 'white'
                    }} 
                    type="button"
                    onClick={onAuth}
                >
                    인증
                </button>
            </div>
        </>        
    )
}

export default AuthMail;