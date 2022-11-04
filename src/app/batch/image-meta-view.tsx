import { DbObject } from "../db";
import { Pane } from "../generic-ui/pane";
import { Section } from "../generic-ui/section";
import { VariableTreeView } from "../variables-section/variable-tree-view";

export function ImageMetaView({
  imageMeta,
}: {
  imageMeta: DbObject["ImageMeta"];
}) {
  const nonHashVariables = Object.fromEntries(
    Object.entries(imageMeta.variables).filter(
      ([_, variable]) => variable.type !== "Hash"
    )
  );

  return (
    <Pane
      main={
        <Section title="Variables">
          <VariableTreeView variables={nonHashVariables} />
        </Section>
      }
    />
  );
}
