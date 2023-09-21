import { Editor, EditorContent } from "@tiptap/react";
import { FC } from "react";
import editor from "../editor";
import useEditorConfig from "@/hooks/useEditorConfig";
import ActionButton from "./ActionButton";

interface Props {
  title?: string;
  onSubmit(content: string): void;
  busy?: boolean;
}

const CommentForm: FC<Props> = ({
  title,
  onSubmit,
  busy = false,
}): JSX.Element => {
  const { editor } = useEditorConfig({ placeholder: "Add your comment" });

  const handleSubmit = () => {
    if (editor && !busy) {
      const value = editor?.getHTML();
      if (value === "<p></p>") return;

      onSubmit(value);
    }
  };

  return (
    <div>
      {title ? (
        <h1 className="text-xl text-primary-dark dark:text-primary font-semibold py-3">
          {title}
        </h1>
      ) : null}
      <EditorContent
        className="min-h-[200px] border-2 border-secondary-dark rounded p-2"
        editor={editor}
      />
      <div className="flex justify-end py-3">
        <div className="inline-block">
          <ActionButton busy={busy} title="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
