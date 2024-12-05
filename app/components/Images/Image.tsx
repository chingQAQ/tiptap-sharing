"use client";

import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import ImageExtension from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import "./Image.scss";
import { Container } from "../Container";

export const Image = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, ImageExtension, Dropcursor],
    content: `
      <p>This is a basic example of implementing images. Drag to re-order.</p>
      <img src="https://placehold.co/600x400" />
      <img src="https://placehold.co/800x400" />
    `,
  });

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <Container className="tiptap-sharing-02">
      <h2 className="text-xl font-bold mb-2">置入圖片</h2>
      <div className="border border-gray-200 rounded-lg">
        <div className="control-group">
          <div className="button-group">
            <button onClick={addImage}>Add image from URL</button>
          </div>
        </div>
        <EditorContent editor={editor} />
      </div>
    </Container>
  );
};
