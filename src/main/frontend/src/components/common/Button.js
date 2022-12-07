import React from "react";

function Button(props) {
    const {onClick, title, backgroundColor} = props;
    const style = {
        cursor: "pointer",
        width: "120px",
        padding: "6px",
        margin: "22px 12px",
        borderRadius: "12px",
        border: "none",
        color: "white",
        fontSize: "16px"
    }
    style.backgroundColor = backgroundColor;

    return (
        <>
            <button
                style={style}
                type={onClick ? "button" : "submit"}
                onClick={onClick}
            >{title}</button>
        </>
    )
}

export default Button;