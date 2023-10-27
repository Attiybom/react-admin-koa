const tokens = {
  admin: "admin-token",
  guest: "guest-token",
  editor: "editor-token",
};

const users = {
  "admin-token": {
    id: "admin",
    role: "admin",
    name: "管理员",
    avatar:
      "https://th.bing.com/th/id/OIP.hSVsvdlRpXa1PmU_TQTNFwHaEK?w=287&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    description: "拥有系统内所有菜单和路由权限",
  },
  "editor-token": {
    id: "editor",
    role: "editor",
    name: "编辑员",
    avatar:
      "https://th.bing.com/th/id/OIP.hSVsvdlRpXa1PmU_TQTNFwHaEK?w=287&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    description: "可以看到除户管理页面之外的所有页面",
  },
  "guest-token": {
    id: "guest",
    role: "guest",
    name: "游客",
    avatar:
      "https://th.bing.com/th/id/OIP.hSVsvdlRpXa1PmU_TQTNFwHaEK?w=287&h=180&c=7&r=0&o=5&dpr=2&pid=1.7",
    description: "仅能看到Dashboard、权限测试和关于作者四个页面",
  },
};

module.exports = {
  tokens,
  users
}
