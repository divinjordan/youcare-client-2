import classNames from "classnames";
import { FC } from "react";
import { BiCheck } from "react-icons/bi";

type InputPickProps = {
  options: any[];
  label?: string;
  values: string[];
  name: string;
  inputClass?: string;
  labelClass?: string;
  checkedClass?: string;
  handler: (key: string, value: any) => void;
};

const InputPick: FC<InputPickProps> = ({
  options,
  label = "Option label",
  inputClass = "w-4 h-4 border border-gray-400",
  labelClass = "",
  checkedClass = "bg-secondary text-white border-secondary",
  name,
  values,
  handler,
}) => {
  function handleChange(value: string) {
    if (!values) {
      handler(name, [value]);
      return;
    }

    if (values.includes(value)) {
      handler(
        name,
        values.filter((item) => item != value)
      );
    } else {
      handler(name, [...values, value]);
    }
  }
  return (
    <div>
      <label>{label}</label>
      <ul className="space-y-1 mt-2">
        {options.map((item: any, index) => (
          <li
            key={`${name}option${index}`}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              handleChange(item.value);
            }}
          >
            <span
              className={classNames(
                `${inputClass} flex items-center justify-center`,
                {
                  [checkedClass]: values ? values.includes(item.value) : false,
                }
              )}
            >
              {(values ? values.includes(item.value) : false) ? (
                <BiCheck className="w-6 h-6" />
              ) : null}
            </span>
            <span className={labelClass}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputPick;
