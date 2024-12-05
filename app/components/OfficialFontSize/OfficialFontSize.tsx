"use client";

import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import { Container } from "../Container";
import { OFFICIAL_FONT_SIZE_MAP, FontSize } from "./fontSizeExtension";
import "./OfficialFontSize.scss";

export const OfficialFontSize = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, TextStyle, FontSize],
    content: `
      <p>ウ ウ・ワ・ワ・ウワ</p>
      <p>u u・ wa・ wa・ u wa</p>
      <p>嗚嗚・哇・哇・嗚哇</p>

      <p>ウワワ タクタク チャオ</p>
      <p>u wa wa ta ku ta ku cha o</p>
      <p>嗚哇哇 他哭他哭 洽哦</p>

      <p>ウワワワウワ ワーイワイトレリ</p>
      <p>u wa wa wa u wa wa~ i wa i to re ri</p>
      <p>嗚哇哇哇嗚哇 哇～伊哇伊偷勒哩</p>

      <p>ウワワ ワイワイ タラチロ</p>
      <p><span class="official-font-size--xl">嗚哇哇</span> 哇伊哇伊 他啦七囉</p>
      <p><span class="official-font-size--xl">嗚哇哇</span> 哇伊哇伊 他啦七囉</p>
    `,
  });

  const handleOnChangeFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "none") {
      editor?.commands.unsetFontSize();
    } else {
      editor?.commands.setFontSize(e.target.value);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <Container className="tiptap-sharing-02">
      <h2 className="text-xl font-bold mb-2">官方字級</h2>
      <div className="border border-gray-200 rounded-lg">
        <div className="control-group">
          <div className="button-group">
            <select
              value={editor.getAttributes("textStyle")?.fontSize || "none"}
              onChange={handleOnChangeFontSize}
            >
              {Object.keys(OFFICIAL_FONT_SIZE_MAP).map((i) => (
                <option key={`option-${i}`} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>
        </div>
        <EditorContent editor={editor} />
      </div>
    </Container>
  );
};
