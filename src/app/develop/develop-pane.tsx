import { Pane } from "../generic-ui/pane";
import { DevelopFooter } from "./develop-footer";
import { DevelopHeader } from "./develop-header";
import { DevelopMain } from "./develop-main";
import { ReloadToolbar } from "./reload-toolbar";

export function DevelopPane() {
  return (
    <Pane
      header={<DevelopHeader />}
      toolbar={<ReloadToolbar />}
      main={<DevelopMain />}
      footer={<DevelopFooter />}
    />
  );
}
