import { ChangeEventHandler, FC, useState } from "react";
import classNames from "classnames";

interface Props {}

const commonInput =
  "w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition text-primary-dark dark:text-primary p-2 ";

const SeoForm: FC<Props> = (props): JSX.Element => {
  const [values, setValues] = useState({ meta: "", slug: "", tags: "" });

  const handleChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target }) => {
    let { name, value } = target;

    if (name === "meta") value = value.substring(0, 150);

    setValues({ ...values, [name]: value });

    console.log(target.name);
  };

  const { meta, slug, tags } = values;
  return (
    <div className="space-y-4">
      <h1 className="text-primary-dark dark:text-primary text-xl font-semibold">
        SEO Section
      </h1>
      <Input
        onChange={handleChange}
        name="slug"
        value={slug}
        placeholder="slug-goes-here"
        label="Slug:"
      />
      <Input
        onChange={handleChange}
        name="tags"
        value={tags}
        placeholder="React, Next JS"
        label="Tags:"
      />
      <div className="relative">
        <textarea
          onChange={handleChange}
          name="meta"
          value={meta}
          className={classNames(commonInput, "text-lg h-20 resize-none")}
          placeholder="Meta description"
        ></textarea>
        <p className="absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm">
          {meta.length}/150
        </p>
      </div>
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