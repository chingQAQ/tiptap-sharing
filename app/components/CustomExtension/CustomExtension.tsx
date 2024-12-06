"use client";

import { Extension, Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import { Container } from "../Container";
import "./CustomExtension.scss";

type HandlerProps = { name: string; options: any; storage: any; editor: Editor; parent: any };

export const EventLogs = Extension.create({
    onBeforeCreate(this: HandlerProps) {
        console.log("%conBeforeCreate: Before the view is created.", "color: yellow;");
        console.log(this.editor);
    },
    onCreate(this: HandlerProps) {
        console.log("%conCreate: The editor is ready.", "color: yellow;");
        console.log(this.editor);
    },
    onUpdate(this: HandlerProps) {
        console.log("%conUpdate: The content has changed.", "color: yellow;");
        console.log(this.editor);
    },
    onSelectionUpdate(this: HandlerProps) {
        console.log("%conSelectionUpdate: The selection has changed.", "color: yellow;");
        console.log(this.editor);
    },
    onTransaction(this: HandlerProps) {
        console.log("%conTransaction: The editor state has changed.", "color: yellow;");
        console.log(this.editor);
    },
    onFocus(this: HandlerProps) {
        console.log("%conFocus: The editor is focused.", "color: yellow;");
        console.log(this.editor);
    },
    onBlur(this: HandlerProps) {
        console.log("%conBlur: The editor isn't focused anymore.", "color: yellow;");
        console.log(this.editor);
    },
    onDestroy(this: HandlerProps) {
        console.log("%conDestroy: The editor is being destroyed.", "color: yellow;");
        console.log(this.editor);
    },
    onPaste(this: HandlerProps) {
        console.log("%conPaste: The editor is being pasted into.", "color: yellow;");
        console.log(this.editor);
    },
    onDrop(this: HandlerProps) {
        console.log("%conDrop: The editor is being dropped into.", "color: yellow;");
        console.log(this.editor);
    },
    onContentError(this: HandlerProps) {
        console.log("%conContentError: The editor content does not match the schema.", "color: yellow;");
        console.log(this.editor);
    },
});

export const CustomExtension = () => {
  const editor = useEditor({
    extensions: [StarterKit, EventLogs],
    content: `
        <p>
          兩點距離距離公式
        </p>
        <pre>
          <code>
          d = √((Δx)² + (Δy)²) = √((x₂ - x₁)² + (y₂ - y₁)²)
        </code>
      </pre>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <Container className="tiptap-sharing-04">
      <h2 className="text-xl font-bold mb-2">事件</h2>
      <div className="border border-gray-200 rounded-lg">
        <EditorContent editor={editor} />
      </div>
    </Container>
  );
};

