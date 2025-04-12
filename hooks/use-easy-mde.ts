import { useEffect, useRef, useState } from "react";

export const useEasyMDE = ({
  setData,
}: {
  setData: (data: string) => void;
}) => {
  const [editor, setEditor] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    //@ts-ignore
    import("easymde/dist/easymde.min.css");
    import("easymde").then(({ default: EasyMDE }) => {
      const easyMDE = new EasyMDE({
        element: textareaRef.current ?? undefined,
        autoDownloadFontAwesome: true,
        forceSync: true,
        toolbar: [
          "bold",
          "italic",
          "heading",
          "|",
          "quote",
          "unordered-list",
          "ordered-list",
          "|",
          "link",
          "image",
          "|",
          "preview",
        ],
      });

      setEditor(easyMDE);
    });

    return () => {
      if (editor) {
        editor.toTextArea();
      }
    };
  }, []);

  useEffect(() => {
    if (editor) {
      editor.codemirror.on("change", () => {
        setData(editor.value());
      });
    }
  }, [editor]);

  return { editor, textareaRef };
};
