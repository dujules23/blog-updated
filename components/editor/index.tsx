import { FC } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";
import Underline from "@tiptap/extension-underline";

interface Props {}

const Editor: FC<Props> = (props): JSX.Element => {
  const editor = useEditor({ extensions: [StarterKit, Underline] });

  return (
    <div className="p-3 dark:bg-primary-dark bg-primary transition">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
