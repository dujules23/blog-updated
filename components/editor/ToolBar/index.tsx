import { FC } from "react";
import { Editor } from "@tiptap/react";
import DropdownOptions from "@/components/common/DropdownOptions";

interface Props {
  editor: Editor | null;
}

const ToolBar: FC<Props> = ({ editor }): JSX.Element | null => {
  if (!editor) return null;
  // heading 1, 2, 3 "bold"  "Underline" "italic"
  return (
    <div>
      {/* paragraph, Heading 1, 2, 3 */}
      <DropdownOptions
        options={[
          {
            label: "Paragraph",
            onClick: () => {
              console.log("paragraph clicked");
            },
          },
          {
            label: "Heading 1",
            onClick: () => {
              console.log("Heading 1 clicked");
            },
          },
          {
            label: "Heading 2",
            onClick: () => {
              console.log("Heading 2 clicked");
            },
          },
          {
            label: "Heading 3",
            onClick: () => {
              console.log("Heading 3 clicked");
            },
          },
        ]}
        head={<p>Paragraph</p>}
      />
    </div>
  );
};

export default ToolBar;
