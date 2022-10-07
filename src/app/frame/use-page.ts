import { proxy, useSnapshot } from "valtio";

type AsyncValue<T> =
  | { type: "loading"; loading: Promise<T> }
  | { type: "data"; data: T };

const pages = proxy<Record<string, AsyncValue<string>>>({});

function getPage(url: string) {
  return fetch(url).then((resp) => resp.text());
}

export function usePage(url: string) {
  // Do side-effect before subscription
  if (!pages[url]) {
    pages[url] = {
      type: "loading",
      loading: getPage(url).then((page) => {
        pages[url] = { type: "data", data: page };
        return page;
      }),
    };
  }

  const _pages = useSnapshot(pages);
  return _pages[url];
}
