import { FC } from "react";

type SelectProps = {
  label?: string;
  labelClass?: string;
  inputClass?: string;
  className?: string;
  handler?: (e: React.FormEvent) => void;
  value: string;
  name: string;
  options: { text: string; value: any }[];
};

const InputSelect: FC<SelectProps> = ({
  label = "Exemple",
  labelClass = "mb-1 block",
  inputClass = "px-3 py-3 border border-gray-300 rounded-md bg-gray-50 w-full",
  className = "",
  handler = () => {},
  value,
  name,
  options,
}) => {
  return (
    <div className={className}>
      <label className={labelClass}> {label}</label>
      <select
        name={name}
        onChange={handler}
        className={inputClass}
        value={value}
      >
        {options.map((item, index) => (
          <option key={`is${name}${index}`} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

InputSelect.defaultProps = {};

export default InputSelect;
