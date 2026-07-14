import type { ComponentEntry } from "@/schemas/component-entry";
import { PreviewStage } from "@/components/detail/preview-stage";
import { SourceTabs } from "@/components/detail/source-tabs";

type DetailWorkbenchProps = {
  entry: ComponentEntry;
};

export function DetailWorkbench({ entry }: DetailWorkbenchProps) {
  return (
    <div className="mt-8 grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_minmax(390px,.8fr)]">
      <PreviewStage code={entry.demoCode} title={entry.title} />
      <SourceTabs prompt={entry.prompt} reactCode={entry.code.react} cssCode={entry.code.css} />
    </div>
  );
}
