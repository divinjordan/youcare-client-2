import { FC } from "react";

type InputRadioProps = {
  label?: string;
  className?: string;
  labelClass?: string;
  inputClass?: string;
  optionClass?: string;
  value: string;
  handler: (e: React.FormEvent) => void;
  name: string;
  options: any[];
};

const InputRadio: FC<InputRadioProps> = ({
  label,
  className,
  labelClass,
  inputClass,
  optionClass,
  value,
  handler,
  name,
  options,
}) => {
  return (
    <div className={className}>
      <span className={labelClass}>{label}</span>
      {options.map((item, index) => (
        <label
          key={`ir${name}${index}`}
          htmlFor={item.name}
          className={optionClass}
        >
          <input
            type="radio"
            id={item.name}
            name={name}
            value={item.value}
            onChange={handler}
            checked={value == item.value ? true : false}
            className={inputClass}
          />
          <span>{item.label}</span>
        </label>
      ))}
    </div>
  );
};

InputRadio.defaultProps = {
  label: "Exemple",
  labelClass: "block mb-1",
  optionClass: "flex items-center gap-2",
  inputClass:
    "text-secondary focus:ring-secondary/50 focus:border-secondary/50",
  className: "",
};

export default InputRadio;
