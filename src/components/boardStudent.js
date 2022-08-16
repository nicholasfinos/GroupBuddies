import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const BoardStudent = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getStudentBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container" style={{fontFamily: "Times New Roman"}}>
      <h3>{content}</h3>
    </div>
  );
};

export default BoardStudent;