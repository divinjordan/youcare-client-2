import { FC } from "react";

type InputPhoneProps = {
  className: string;
  label: string;
  labelClass: string;
  inputClass: string;
  buttonClass: string;
  codeClass: string;
  mainClass: string;
  placeholder: string;
  value: string;
  handler: () => void;
  name: string;
  code: string;
};

const InputPhone: FC<InputPhoneProps> = ({
  label,
  labelClass,
  codeClass,
  mainClass,
  inputClass,
  placeholder,
  value,
  handler,
  name,
  code,
  className,
}) => {
  return (
    <div className={className}>
      <label className={labelClass}> {label}</label>
      <div className={mainClass}>
        <div className={codeClass}>{code}</div>
        <input
          name={name}
          onChange={handler}
          className={inputClass}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

InputPhone.defaultProps = {
  label: "Exemple",
  mainClass: "flex items-center border border-gray-300  rounded-md",
  labelClass: "mb-1 block",
  inputClass: "px-3 py-2.5 border-transparent rounded-r-md bg-gray-50 w-full",
  codeClass:
    "bg-gray-100 flex items-center justify-center w-20 py-2.5 rounded-l-md",
  placeholder: "",
  className: "",
};

export default InputPhone;
