import { Mark, mergeAttributes } from "@tiptap/core";

export const OFFICIAL_FONT_SIZE_MAP = {
  none: "",
  latest: "official-font-size--latest",
  xs: "official-font-size--xs",
  s: "official-font-size--s",
  m: "official-font-size--m",
  l: "official-font-size--l",
  xl: "official-font-size--xl",
};

export interface FontsOptions {
  /**
   * @default {}
   * @example { class: 'foo' }
   */
  defaultFontSize: FontSizeOptions;
  HTMLAttributes: Record<string, string>;
}

type FontSizeOptions = keyof typeof OFFICIAL_FONT_SIZE_MAP;

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font-size class
       * @param size The alignment
       * @example editor.commands.setFontSize('latest')
       */
      setFontSize: (size: string) => ReturnType;
      /**
       * Unset the font-size class
       * @example editor.commands.unsetFontSize()
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

function getElementClassListString(element: Element) {
  return element.getAttribute("class")?.split(" ") || [];
}

function getFontSizeClass(classList: string[]) {
  return Object.values(OFFICIAL_FONT_SIZE_MAP).find((cls) => classList.includes(cls));
}

function getFontSizeKey(fontSizeClass?: string) {
  return fontSizeClass
    ? Object.keys(OFFICIAL_FONT_SIZE_MAP).find(
        (key) =>
          OFFICIAL_FONT_SIZE_MAP[key as FontSizeOptions] === fontSizeClass
      )
    : null;
}

export const FontSize = Mark.create<FontsOptions>({
  name: "textStyle",
  // default
  addOptions() {
    return {
      defaultFontSize: "none",
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      fontSize: {
        default: this.options.defaultFontSize,
        // 屬性級設定
        // 用於解析 HTML 標籤中的屬性並將其轉換為 Tiptap 的內部屬性。
        parseHTML: (element) => {
          if (element.hasAttribute("class")) {
            const classList = getElementClassListString(element);

            const fontSizeClass = getFontSizeClass(classList);

            return getFontSizeKey(fontSizeClass);
          }

          return this.options.defaultFontSize;
        },
        // 屬性級設定
        // 用於將屬性轉換為 HTML 標籤的屬性值
        renderHTML: (attributes: { fontSize: FontSizeOptions }) => {
          return {
            class: OFFICIAL_FONT_SIZE_MAP[attributes.fontSize] || null,
          };
        },
      },
    };
  },
  // Extension 級設定
  // 用於定義如何將特定的 HTML 標籤解析為對應的 Tiptap 標記。
  parseHTML() {
    return [
      {
        tag: "span[class]",
        getAttrs: (element) => {
          if (element.hasAttribute("class")) {
            const classList = getElementClassListString(element);

            const fontSizeClass = getFontSizeClass(classList);

            const fontSize = getFontSizeKey(fontSizeClass);

            return {
              fontSize: fontSize || null,
            }
          }

          return {
            fontSize: null,
          };
        },
      },
    ];
  },

  // Extension 級設定
  // 用於定義標記如何被渲染為 HTML。
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark(this.name, { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark(this.name, { fontSize: null }).run();
        },
    };
  },
});

