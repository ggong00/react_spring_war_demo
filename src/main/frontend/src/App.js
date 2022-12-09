import {Routes, Route, Navigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import './App.css';
import "./assets/css/font.css";
import "./assets/css/common.css";
import Header from "./components/common/Header";
import Login from "./components/login/Login";
import Solution from "./components/solution/Solution";
import MyLicense from "./components/my-license/MyLicense";
import Management from "./components/admin/management/Management";
import QuestionPage from "./components/question/QuestionPage";

function App() {
  const [menu, setMenu] = useState([]);
  const [userInfo, serUserInfo] = useState();

  useEffect(() => {

    // 서버세션 확인
    if (localStorage.getItem("user") && localStorage.getItem("role")) {
      loginChk();
    }

    // 메뉴 설정
    const LoginUser = localStorage.getItem("user");
    if (LoginUser) {
      if (localStorage.getItem("role") == "ROLE_USER") {
        setMenu([
          {id: "solution", name: "솔루션 소개", url: "/solution"},
          {id: "question", name: "문의하기", url: "/question"},
          {id: "MyLicense", name: "내 라이선스", url: "/my_license"},
        ]);
      }

      if (localStorage.getItem("role") == "ROLE_ADMIN") {
        const tmpMenu = [...menu]
        tmpMenu.push(
            {id: "solution", name: "솔루션 소개", url: "/solution"},
            {id: "question", name: "문의하기", url: "/question"},
            {id: "admin", name: "문의글 관리", url: "/admin/management"},
            {id: "MyLicense", name: "내 라이선스", url: "/my_license"},
        )
        setMenu(tmpMenu);
      }
    } else {
      setMenu([
        {id: "solution", name: "솔루션 소개", url: "/solution"},
        {id: "question", name: "문의하기", url: "/question"},
      ]);
    }
  }, []);

  const loginChk = () => {
    fetch("/api/loginChk", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => res.json())
        .then((json) => {
          if (!json.data) {
            localStorage.removeItem("user");
            localStorage.removeItem("role");
          } else {
            serUserInfo(json.data);
          }

        });
  };

  return (
      <div className="App">
        <Header menu={menu}/>
        <Routes>
          <Route path="/" element={<Navigate to="/solution" replace />} />
          <Route path="/solution" element={<Solution userInfo={userInfo}/>} />
          <Route path="/question" element={<QuestionPage userInfo={userInfo}/>} />
          <Route path="/my_license" element={<MyLicense userInfo={userInfo}/>} />
          <Route path="/admin/management" element={<Management userInfo={userInfo}/>} />
          <Route path="/login" element={<Login userInfo={userInfo}/>} />
        </Routes>
        {/*<Footer/>*/}
      </div>
  );
}

export default App;
