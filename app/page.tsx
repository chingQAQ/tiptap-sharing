import { StarterKitTiptap } from "@/components/StarterKitTiptap";
import { DefaultTextEditor } from "@/components/DefaultTextEditor";
import { Image } from "@/components/Images";
import { OfficialFontSize } from "@/components/OfficialFontSize";
import { CustomExtension } from "@/components/CustomExtension";
import { PasteImage } from "@/components/PasteImage";

export default function Home() {
  return (
    <>
      <StarterKitTiptap />
      <DefaultTextEditor />
      <Image />
      <OfficialFontSize />
      <CustomExtension />
      <PasteImage />
    </>
  );
}
