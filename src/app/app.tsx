import { AppStyles } from "./app-styles";
import { DevelopPane } from "./develop/develop-pane";
import { isEmbedded } from "./is-embedded";
import { NavigationStack } from "./navigation-stack";

export function App() {
  return (
    <AppStyles>
      {isEmbedded() ? <DevelopPane /> : <NavigationStack />}
    </AppStyles>
  );
}
