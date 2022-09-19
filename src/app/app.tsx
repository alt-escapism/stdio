import { AppChrome } from "./app-chrome";
import { AppHeader } from "./app-header";
import { AppFooter } from "./app-footer";
import { ReloadToolbar } from "./reload-toolbar";
import { AppMain } from "./app-main";

export function App() {
  return (
    <AppChrome>
      <AppHeader />
      <ReloadToolbar />
      <AppMain />
      <AppFooter />
    </AppChrome>
  );
}
