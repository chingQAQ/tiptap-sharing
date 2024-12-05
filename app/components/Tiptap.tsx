"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Container } from "@/components/Container";
import "./Tiptap.css";

export const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>你好 世界！ 🌎️</p>",
  });

  return (
    <Container>
      <div className="border border-gray-200 rounded-lg">
        <EditorContent editor={editor} />
      </div>
    </Container>
  );
};
