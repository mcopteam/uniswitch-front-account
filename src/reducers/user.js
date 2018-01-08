export default (state = {
  // isFetching: false,
  user: {
    id: '',
    name: ''
  },
  role: {
    id: '', // 1 MIS, 2 BIZ
    title: '',
  },
  menues: [
//{name: '首页',
//  key: 'home',
//  link: '/main/welcome',
//  icon: '',
//},
  {
    name: '数据管理',
    key: 'uniSwitch-metadata',
    icon: '',
    subMenues: [
      {
        name: '数据分类维护',
        key: 'metadata-classify',
        link: '/main/metadata/classifyPreserve',
        icon: '',
      },
      {
        name: '数据产品添加',
        key: 'metadata-preserve',
        link: '/main/metadata/productAdd',
        show:"none",
        icon: '',
      },
      {
        name: '数据产品维护',
        key: 'metadata-track',
        link: '/main/metadata/productPreserve',
        icon: '',
      },
    ]
  },
    {
      name: '合同模板管理',
      key: 'templage-manage',
      icon: '',
      subMenues: [
        {
          name: '合同模板添加',
          key: 'template-add',
          link: '/main/template/add',
          show:"none",
          icon: '',
        },
        {
          name: '合同模板维护',
          key: 'template-preserve',
          link: '/main/template/preserve',
          icon: '',
        },
      ]
    },
  ],
  authes: [],
  menuList:[]
}, action) => {
  const {
    type,
    menues,
    user,
    role,
    authes,
    menuList,
    ...other,
  } = action
  switch(type) {
    case 'REQUEST_USER_INFO':
     return {
      ...state,
      isFetching: true,
     }
     case 'REQUEST_MENU_LIST':
      return {
       ...state,
       menuList
      }
    case 'RECEIVE_USER_INFO_SUCCESS':
      return {
        ...state,
        isFetching: false,
        user,
        menues,
        role,
      }
    case 'RECEIVE_AUTH_INFO_SUEECESS':
      return {
        ...state,
        authes,
      }
    case 'RECEIVE_USER_INFO_FAIL':
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
