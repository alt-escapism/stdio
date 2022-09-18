import { AppChrome } from "./app-chrome";
import { HashSection } from "./hash-section";
import { AppHeader } from "./app-header";
import { VariablesSection } from "./variables-section/variables-section";
import { AppFooter } from "./app-footer";

export function App() {
  return (
    <AppChrome>
      <AppHeader />
      <main>
        <HashSection />
        <VariablesSection />
      </main>
      <AppFooter />
    </AppChrome>
  );
}
