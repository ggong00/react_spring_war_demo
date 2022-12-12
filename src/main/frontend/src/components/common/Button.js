import React from "react";

function Button(props) {
    const {onClick, title, backgroundColor} = props;
    const style = {
        cursor: "pointer",
        minWidth: '50%',
        border: "none", borderRadius: ".375em",
        fontSize: '1.125em', fontWeight: '700', color: "white",
        padding: '.875em 2.5em'
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