import { DevelopFooter } from "./develop-footer";
import { DevelopHeader } from "./develop-header";
import { DevelopMain } from "./develop-main";
import { ReloadToolbar } from "./reload-toolbar";

export function DevelopPane() {
  return (
    <>
      <DevelopHeader />
      <ReloadToolbar />
      <DevelopMain />
      <DevelopFooter />
    </>
  );
}
