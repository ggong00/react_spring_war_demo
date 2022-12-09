import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Header({menu}) {
    const [selectedMenu, setSelectedMenu] = useState();

    const onLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("role")

        fetch("/api/logout", {
            method : 'post',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.code == "07") {
                    window.location = "/";
                }
            });
    }
    const changeMenu = (e) => {
        setSelectedMenu(e.target.id);
    }

    return (
        <div className="navbar-wrap">
            <div className="container">
                <nav className="navbar flxCnt" id="gnb">
                    <h1 className="navbar-header" id="logo">
                        <a href="/">
                            <img src={require("../../assets/img/common/logo.png")} />
                        </a>
                    </h1>

                    <div className="gnb">
                        <ul className="menu">
                            {menu.map((menu) => {
                                return (
                                    <li key={menu.id}>
                                        <Link
                                            to={menu.url}
                                            id={menu.id}
                                            onClick={changeMenu}
                                            className={selectedMenu == menu.id ? "selected-menu" : ""}
                                        >
                                            {menu.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="navbar_quick">
                        <ul>
                            {!localStorage.getItem("user") ? (
                                <>
                                    <li>
                                        <Link to="/login">로그인</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <a onClick={onLogout}>로그아웃</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;
