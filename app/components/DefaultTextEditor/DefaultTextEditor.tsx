"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Container } from "../Container";
import { MenuBar } from "./DefaultTextEditorMenu";
import "./DefaultTextEditor.scss";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: false,
      keepAttributes: true,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = `
    <h2>
    Hi there,
    </h2>
    <p>
    this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
    <li>
        That's a bullet list with one …
    </li>
    <li>
        … or two list items.
    </li>
    </ul>
    <p>
    Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
    </p>
    <pre><code class="language-css">body {
    display: none;
    }</code></pre>
    <p>
    I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
    </p>
    <blockquote>
    Wow, that's amazing. Good work, boy! 👏
    <br />
    — Mom
    </blockquote>
`;

export const DefaultTextEditor = () => {
  return (
    <Container className="tiptap-sharing-02">
      <h2 className="text-xl font-bold mb-2">自訂 MenuBar</h2>
      <div className="border border-gray-200 rounded-lg">
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          content={content}
        />
      </div>
    </Container>
  );
};
