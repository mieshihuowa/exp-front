// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/report', title: '实验发布' },
      { path: '/explist', title: '查看实验' },
      { path: '/page3', title: '页面 3' },
      { path: '/page-demo',title: '页面4'},
      {path: '/page5',title:'学生信息管理'}
    ]
  }
]
