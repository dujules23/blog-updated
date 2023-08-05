import { ChangeEventHandler, FC } from "react";
import classNames from "classnames";

interface Props {}

const commonInput =
  "w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition text-primary-dark dark:text-primary p-2 ";

const SeoForm: FC<Props> = (props): JSX.Element => {
  return (
    <div className="space-y-4">
      <h1 className="text-primary-dark dark:text-primary text-xl font-semibold">
        SEO Section
      </h1>
      <Input name="slug" placeholder="slug-goes-here" label="Slug:" />
      <Input name="tags" placeholder="React, Next JS" label="Tags:" />

      <textarea
        className={classNames(commonInput, "text-lg h-20 resize-none")}
        placeholder="Meta description"
      ></textarea>
    </div>
  );
};

const Input: FC<{
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  label?: string;
}> = ({ name, value, placeholder, label, onChange }) => {
  return (
    <label className="block relative">
      <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2">
        {label}
      </span>
      <input
        type="text"
        value={value}
        name={name}
        placeholder={placeholder}
        className={classNames(commonInput, "italic pl-10")}
        onChange={onChange}
      />
    </label>
  );
};

export default SeoForm;
