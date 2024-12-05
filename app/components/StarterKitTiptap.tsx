"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Container } from "@/components/Container";
import "./Tiptap.scss";

/*

Nodes:
- Blockquote
- BulletList
- CodeBlock
- Document
- HardBreak
- Heading
- HorizontalRule
- ListItem
- OrderedList
- Paragraph
- Text

Marks:
- Bold
- Code
- Italic
- Strike

Extensions:
- Dropcursor
- Gapcursor
- History

*/

export const StarterKitTiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>你好 世界！ 🌎️</p>",
  });

  return (
    <Container className="tiptap-sharing-01">
      <h2 className="text-xl font-bold mb-2">直接使用 StarterKit</h2>
      <div className="border border-gray-200 rounded-lg">
        <EditorContent editor={editor} />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-right">CMD + B 試試？</p>
    </Container>
  );
};
