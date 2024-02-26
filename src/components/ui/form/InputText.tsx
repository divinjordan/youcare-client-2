import { FC } from "react";

type InputTextProps = {
  className?: string;
  label?: string;
  labelClass?: string;
  inputClass?: string;
  placeholder?: string;
  disabled?: boolean;
  value: string | undefined;
  handler: (e: React.FormEvent) => void;
  name: string;
  type?: string;
  required?: boolean;
};

const InputText: FC<InputTextProps> = ({
  label,
  className,
  labelClass,
  inputClass,
  placeholder,
  disabled,
  value,
  handler,
  name,
  type,
  required,
}) => {
  return (
    <div className={className}>
      {label != "" ? (
        <label className={labelClass}>
          {label}
          {required ?? <span className="text-orange-600 text-xs ml-1">*</span>}
        </label>
      ) : null}
      <input
        name={name}
        onChange={handler}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        type={type}
        disabled={disabled}
      />
    </div>
  );
};

InputText.defaultProps = {
  label: "",
  labelClass: "mb-1 block",
  inputClass: "px-3 py-2.5 border border-gray-300 rounded-md bg-gray-50 w-full",
  placeholder: "",
  type: "text",
  className: "",
  required: true,
  disabled: false,
};

export default InputText;
