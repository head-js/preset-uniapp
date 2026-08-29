type TabKey = "home" | "detail" | "profile";

interface CustomTabBarInstance {
  setData(data: { selectedKey: TabKey }): void;
}

interface WechatPageInstance {
  route?: string;
  getTabBar?: () => CustomTabBarInstance | undefined;
}

const routeToTabKey: Record<string, TabKey> = {
  "pages/index/index": "home",
  "pages/detail/index": "detail",
  "pages/profile/index": "profile",
};

export function syncCustomTabBar() {
  const pages = getCurrentPages() as unknown as WechatPageInstance[];
  const currentPage = pages[pages.length - 1];
  const selectedKey = currentPage?.route
    ? routeToTabKey[currentPage.route]
    : undefined;

  if (selectedKey) {
    currentPage.getTabBar?.()?.setData({ selectedKey });
  }
}
