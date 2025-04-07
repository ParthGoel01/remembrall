import { useEffect, useRef, useState } from "react";

export const useEasyMDE = () => {
  const [editor, setEditor] = useState<any>(null);
  const [data, setData] = useState<string>("");
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

  return { editor, textareaRef, data };
};
