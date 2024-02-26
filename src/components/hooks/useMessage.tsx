import { useState } from "react";

function useMessage() {
  const [content, setContent] = useState<string>("");
  const [type, setType] = useState<string>("");

  function check() {
    return content != "";
  }

  function set(ctn: string, typ: string = "success") {
    setContent(ctn);
    setType("success");
  }

  function isError() {
    return type == "error";
  }

  function isSuccess() {
    return type == "success";
  }

  function errorClass() {
    return "bg-red-50 text-red-500 border-red-500 p-3 ";
  }

  function successClass() {
    return "bg-green-50 text-green-600 border-green-500 p-3 ";
  }

  function element() {
    const classes = type == "success" ? successClass() : errorClass();
    return (
      <div className={`${classes} flex items-center justify-center`}>
        {content}
      </div>
    );
  }

  return {
    content,
    check,
    set,
    type,
    setType,
    errorClass,
    successClass,
    isError,
    isSuccess,
    element,
  };
}

export default useMessage;
