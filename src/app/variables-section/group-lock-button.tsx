import { useSnapshot } from "valtio";
import { useMemo } from "react";
import { lock, settings, unlock } from "../settings-state";
import { unlockedButtonStyles } from "../setting-controls/setting-lock-button";
import { VscLock, VscUnlock } from "react-icons/vsc";
import { lockedStyles } from "../setting-controls/use-lock-styles";
import { BsCircleHalf } from "react-icons/bs";
import { GenericIconButton } from "../generic-icon-button";
import { autoReload } from "../reload";
import { getLeafNodes, VariableTree } from "./variable-tree";

export function GroupLockButton({ tree }: { tree: VariableTree }) {
  const _settings = useSnapshot(settings);
  const variables = useMemo(() => getLeafNodes(tree), [tree]);
  const numLocked = useMemo(
    () =>
      variables.reduce(
        (num, variable) =>
          num + (_settings.variables[variable.name] == null ? 0 : 1),
        0
      ),
    [_settings.variables, variables]
  );

  return (
    <GenericIconButton
      onClick={() => {
        if (numLocked < variables.length) {
          lock(...variables);
        } else {
          unlock(...variables);
        }
        autoReload(...variables);
      }}
    >
      {numLocked === 0 ? (
        <VscUnlock className={unlockedButtonStyles} />
      ) : numLocked === variables.length ? (
        <VscLock className={lockedStyles} />
      ) : (
        <BsCircleHalf className={lockedStyles} style={{ fontSize: "0.8em" }} />
      )}
    </GenericIconButton>
  );
}
