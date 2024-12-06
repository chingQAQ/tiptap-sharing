"use client";

import React, { useState, useEffect } from "react";
import _Image from "@tiptap/extension-image";
import { Plugin } from "@tiptap/pm/state";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { Container } from "../Container";
import "./PasteImage.scss";

export const Image = _Image.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop(view, event) {
              const hasFiles =
                event.dataTransfer &&
                event.dataTransfer.files &&
                event.dataTransfer.files.length;

              if (!hasFiles) {
                return;
              }

              const images = Array.from(event.dataTransfer.files).filter(
                (file) => /image/i.test(file.type)
              );

              if (images.length === 0) {
                return;
              }

              event.preventDefault();

              const { schema } = view.state;

              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              images.forEach((image) => {
                const reader = new FileReader();

                reader.onload = (readerEvent) => {
                  const node = schema.nodes.image.create({
                    src: readerEvent.target.result,
                  });

                  const transaction = view.state.tr.insert(
                    coordinates.pos,
                    node
                  );

                  view.dispatch(transaction);
                };

                reader.readAsDataURL(image);
              });
            },
            paste(view, event) {
              const hasFiles =
                event.clipboardData &&
                event.clipboardData.files &&
                event.clipboardData.files.length;

              if (!hasFiles) {
                return;
              }

              const images = Array.from(event.clipboardData.files).filter(
                (file) => /image/i.test(file.type)
              );

              if (images.length === 0) {
                return;
              }

              event.preventDefault();

              const { schema } = view.state;

              images.forEach((image) => {
                const reader = new FileReader();

                reader.onload = (readerEvent) => {
                  const node = schema.nodes.image.create({
                    src: readerEvent.target.result,
                  });

                  const transaction = view.state.tr.replaceSelectionWith(node);

                  view.dispatch(transaction);
                };

                reader.readAsDataURL(image);
              });
            },
          },
        },
      }),
    ];
  },
});

export const PasteImage = () => {
    const [editable, setEditable] = useState(true);


  const editor = useEditor({
    editable,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch (error) {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch (error) {
            return false;
          }
        },
      }),
      Image,
    ],
    content: `
        <a href="https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing#access-the-prosemirror-api">
          Access the ProseMirror API
        </a>
    `,
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setEditable(editable);
  }, [editor, editable]);

  if (!editor) {
    return null;
  }

  return (
    <Container className="tiptap-sharing-05 mb-[600px]">
      <h2 className="text-xl font-bold mb-2 flex justify-between">
        貼上圖片
        <button onClick={() => setEditable(!editable)}>
          {!editable ? "編輯" : "預覽"}
        </button>
      </h2>
      <div className="border border-gray-200 rounded-lg">
        <EditorContent editor={editor} />
      </div>
    </Container>
  );
};
