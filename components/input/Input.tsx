// Get the types of the props related to forms
import clsx from "clsx";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

// types of the props
interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

// use the types in the props and destructure it immediately
const Input: React.FC<InputProps> = ({
  id,
  label,
  errors,
  // - comes from the useForm hook
  register,
  disabled,
  required,
  type,
}) => {
  return (
    <div className="w-full space-y-1">
      <label
        className="text-sm font-semibold leading-6 tracking-tight text-neutral-500"
        htmlFor={id}
      >
        {label}
      </label>

      <div>
        <input
          id={id}
          // className="h-10 w-full rounded-md border pl-4 text-sm font-semibold focus:outline-none"

          // you can add dynamic classes using clsx, form-input comes from the tailwind css forms
          className={clsx(
            `form-input block w-full rounded-md border-0 ring-1 ring-inset ring-neutral-300 transition duration-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
            // if the id exists in the errors array, then add the error
            errors[id] && "focus:ring-red-500",
            true && "cursor-default opacity-50",
          )}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
        />
      </div>
    </div>
  );
};
export default Input;
