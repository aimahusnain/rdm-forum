"use client";

import CustomCodeRenderer from "@/src/components/renderers/CustomCodeRenderer";
import dynamic from "next/dynamic";
import { FC } from "react";
import CustomHeaderRenderer from "./renderers/CustomHeaderRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  code: CustomCodeRenderer,
  header: CustomHeaderRenderer, // Add custom renderer for header block
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      // style={style}
      // className="text-sm"
      renderers={renderers}
      data={content}
    />
  );
};
export default EditorOutput;
