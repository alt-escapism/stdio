import { useRef, useState } from "react";
import { BiCheck, BiLink } from "react-icons/bi";
import { getVariableSnapshots } from "../frames-state";
import { Button } from "../generic-ui/button";
import { encode } from "./share";

function copyTextToClipboard(text: string) {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  el.parentElement?.removeChild(el);
}

const TIP = "Copy share link";
const TIP_COPIED = "Copied!";

export function ShareButton() {
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<number>();

  return (
    <Button
      tip={isCopied ? TIP_COPIED : TIP}
      onClick={() => {
        const variables = getVariableSnapshots("main");
        const encoded = encode(variables);
        const url = new URL(window.location.href);
        url.searchParams.set("s", encoded);
        copyTextToClipboard(url.href);
        setIsCopied(true);
        if (timerRef.current) {
          window.clearTimeout(timerRef.current);
        }
        timerRef.current = window.setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      }}
    >
      {isCopied ? <BiCheck /> : <BiLink />}
    </Button>
  );
}
