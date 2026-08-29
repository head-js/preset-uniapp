const WEBVIEW_TARGET = "https://uniapp.dcloud.net.cn/";

const TAB_ITEMS = {
  home: {
    key: "home",
    text: "Home",
    iconPath: "/static/tabbar/home.png",
    selectedIconPath: "/static/tabbar/home-selected.png",
  },
  detail: {
    key: "detail",
    text: "Detail",
    iconPath: "/static/tabbar/detail.png",
    selectedIconPath: "/static/tabbar/detail-selected.png",
  },
  webview: {
    key: "webview",
    text: "",
    iconPath: "/static/tabbar/webview.png",
  },
  profile: {
    key: "profile",
    text: "Profile",
    iconPath: "/static/tabbar/profile.png",
    selectedIconPath: "/static/tabbar/profile-selected.png",
  },
};

function mockFetchTabItems() {
  let timer;
  const promise = new Promise((resolve) => {
    timer = setTimeout(() => {
      resolve([
        TAB_ITEMS.home,
        TAB_ITEMS.detail,
        TAB_ITEMS.webview,
        TAB_ITEMS.profile,
      ]);
    }, 500);
  });

  return { promise, timer };
}

Component({
  data: {
    selectedKey: "home",
    navigating: false,
    color: "#7A7E83",
    selectedColor: "#007AFF",
    items: [TAB_ITEMS.home, TAB_ITEMS.profile],
  },

  lifetimes: {
    attached() {
      this.loadItems();
    },

    detached() {
      this.detachedState = true;
      if (this.mockFetchTimer) {
        clearTimeout(this.mockFetchTimer);
        this.mockFetchTimer = undefined;
      }
      if (this.navigationTimer) {
        clearTimeout(this.navigationTimer);
        this.navigationTimer = undefined;
      }
    },
  },

  methods: {
    async loadItems() {
      const request = mockFetchTabItems();
      this.mockFetchTimer = request.timer;
      const items = await request.promise;
      this.mockFetchTimer = undefined;
      if (!this.detachedState) {
        this.setData({ items });
      }
    },

    handleTap(event) {
      const key = event.currentTarget.dataset.key;

      if (this.data.navigating) {
        return;
      }

      if (key === "webview") {
        this.navigate("navigateTo", {
          url: `/pages/webview/index?url=${encodeURIComponent(WEBVIEW_TARGET)}`,
        });
        return;
      }

      const tabRoutes = {
        home: "/pages/index/index",
        detail: "/pages/detail/index",
        profile: "/pages/profile/index",
      };
      const url = tabRoutes[key];

      if (!url || key === this.data.selectedKey) {
        return;
      }

      this.navigate("switchTab", { url });
    },

    navigate(method, options) {
      this.setData({ navigating: true });

      let released = false;
      const release = () => {
        if (released) {
          return;
        }
        released = true;
        clearTimeout(this.navigationTimer);
        this.navigationTimer = undefined;
        this.setData({ navigating: false });
      };

      this.navigationTimer = setTimeout(release, 2000);
      wx[method]({
        ...options,
        complete: release,
      });
    },
  },
});
