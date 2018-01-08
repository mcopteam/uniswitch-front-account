export const url={

  // ----------------------------初始化数据------------------------------------------------
  // 登出
  "logout":"logout",
  // 登录
  "login":"login",
  // 公钥信息列表
  "userList":"companyUser/list",
  // 角色菜单
  "requireMenuList":"privilege/findMenuTreePrivilege",
  // 按钮权限
  "requireButtonList":"privilege/findButtonListPrivilege",

  // ----------------------------执行合约------------------------------------------------
  // 执行合约列表
  "executeQueryAll":"executeContract/queryAll",
  // 执行合约日志
  "executeQueryLog":"executeContract/queryLog",
  // 执行合约内容
  "executeQueryContent":"executeContract/queryExecuteContractContent",
  // 执行合约终止前置查询
  "preTerminate":"executeContract/preTerminate",
  // 终止合约
  "terminateContract":"executeContract/terminateContract",

  // ----------------------------文件管理------------------------------------------------
  // 合约文件创建
  "fileCreate":"fileContract/create",
  // 合约文件导入
  "fileImport":"fileContract/import",
  // 合约文件送审
  "fileSendAudit":"fileContract/sendAudit",
  // 合约文件删除
  "fileDelete":"fileContract/delete",
  // 合约文件列表
  "fileList":"fileContract/list",

  // ----------------------------合约产品------------------------------------------------
  // 合约文件审核修改
  "productOperate":"productContract/operate",
  // 根据合约图查询合约产品内容
  "productOriginContract":"productContract/queryOriginContract",
  // 合约产品发布
  "productPublish":"productContract/publish",
  // 合约产品列表
  "productList":"productContract/list",
  // 合约产品审核记录
  "productQueryLog":"productContract/queryAuditLog",
  // 合约产品内容
  "productQueryContent":"productContract/queryContent",
  // 合约产品获取
  "productPreSign":"productContract/preSign",
  // 签约
  "productSign":"productContract/signContract",

  // ----------------------------个人设置------------------------------------------------
  // 密码重置
  "persetResetPass":"user/resetPWD",
  // 账号列表
  "persetkeyList":"account/list",
  // 账号删除
  "persetDeleteKey":"account/delete",
  // 账号关联账户
  "persetRelateKey":"account/bind",
  // 账号取消关联
  "persetCencelRelateKey":"account/cancelrelate",
  // 账号申请
  "persetApplyKey":"account/apply",
  // 角色数据权限展示
  "persetDataRes":"privilege/dataResDisplay",
  // 角色功能权限展示
  "persetFunRes":"privilege/functionResDisplay",
  // 修改基本信息
  "persetResetBase":"user/update",
  // 获取基本信息
  "persetRequireBase":"user/baseInfo",
  // 用户注销
  "persetOff":"user/close",
  // 用户挂失
  "persetReported":"user/reported",
  // 账户详情
  "accountTrackQuery":"accountMaintain/detail",
  // 账户修改
  "accountPreserveReset":"accountMaintain/updateUser",
  // 账户列表
  "accountPreserveQuery":"accountMaintain/list",
  // 管理员注销
  "persetClose":"accountMaintain/close",
  // 管理员挂失
  "persetLost":"accountMaintain/reported",
  // 账户冻结
  "persetFreeze":"accountMaintain/freeze",
  // 账户激活
  "persetActivate":"accountMaintain/active",

  // ----------------------------账户维护------------------------------------------------
  // 待审核用户列表
  "accountCheckList":"auditUser/list",
  // 用户注册审核
  "accountCheckIsPass":"auditUser/audit",
  // 账户状态跟踪
  "accountPreserveQueryRecord":"chainUsers/accountRecord",
  // 账号导入
  "accountPreserveQueryImport":"chainUsers/importUsers",
  // 账号导出
  "accountPreserveQueryExport":"chainUsers/exportUsers",
  // 账号列表
  "accountKeypairList":"account/keypairOpList",

  // ----------------------------角色管理------------------------------------------------
  // 资产添加
  "assetCreate":"asset/add",
  // 账号余额查询
  "assetRecordQueryAmount":"asset/queryBlance",
  // 资产记录列表
  "assetRecordQueryList":"asset/list",

  // ----------------------------角色管理------------------------------------------------
  // 角色列表
  "limitRoleList":"role/list",
  // 角色信息修改
  "limitRoleListUpdate":"role/update",
  // 角色删除
  "limitRoleListDelete":"role/delete",
  // 角色添加
  "limitRoleListCreate":"role/add",
  // 角色数据权限查询
  "limitRoleListData":"privilege/findDataPrivilege",
  // 角色功能权限查询
  "limitRoleListFun":"privilege/findFunctionPrivilege",
  // 角色权限设置
  "limitRoleLimitReset":"privilege/updatePrivilege",

  // ----------------------------角色管理------------------------------------------------
  // 菜单列表
  "limitMenuList":"menu/list",
  // 菜单添加
  "limitMenuCreate":"menu/add",
  // 菜单删除
  "limitMenuDelete":"menu/delete",
  // 菜单更新
  "limitMenuListDetail":"menu/update",
  // ----------------------------角色管理------------------------------------------------
  // 按钮列表
  "limitButtonList":"button/list",

  // ----------------------------区块链维护------------------------------------------------
  // 区块链列表
  "blockchainOption":"blockChain/getBlockChainOptionList",
  // 区块链下拉列表
  "blockchainList":"blockChain/getBlockChainList",
  // 区块链添加
  "blockchainAdd":"blockChain/addBlockChain",
  // 区块链编辑
  "blockchainEdit":"blockChain/updateBlockChain",
  // 区块链详细
  "blockchainDetail":"blockChain/getBlockChainDetail",
  // 区块链删除
  "blockchainDelete":"blockChain/deleteBlockChain",
  // 区块链测试
  "blockchainTest":"blockChain/test",

  // ----------------------------合约初始化------------------------------------------------
  // 合约应用列表
  "getContractAppsList":"contractApp/getContractAppsList",
  // 合约应用初始化
  "initContractApp":"contractApp/initContractApp",

// ----------------------------转账合约------------------------------------------------
  // 获取最新合约
  "transferLatelyContract":"transferController/queryLatelyContract",
  // 余额查询
  "transferBalanceQuery":"transferController/balanceQuery",
  // 转账记录查询
  "transferQuery":"transferController/transferQuery",
  // 用户所有合约查询
  "transferQueryAll":"transferController/contractQueryAll",
  // 单个合约查询MySQL
  "transferQuerySingle":"transferController/contractQuerySingleMysql",
  // 转账设置
  "transferSetting":"transferController/transferSetting",
  // ----------------------------转账合约------------------------------------------------
  // 余额查询
  "getAccountBlances":"contractApp/getAccountBalances",
  // 执行记录
  "getContractAppsExecuteList":"contractApp/getContractsList",
  // 转账记录
  "getTransferAssetsList":"contractApp/getTransferAssetsList",
  // 签约
  "signContract":"contractApp/signContract",

  // ----------------------------数据管理------------------------------------------------
  // 分类列表
  "getMetadataCategoryList":"baseDataCategory/getBaseDataCategoryList",
  // 分类添加
  "getMetadataCategoryCreate":"baseDataCategory/addBaseDataCategory",
  // 分类修改
  "getMetadataCategoryEdit":"baseDataCategory/updateBaseDataCategory",
  // 分类删除
  "getMetadataCategoryDelete":"baseDataCategory/deleteBaseDataCategory",

  // 数据列表
  "metadataDataList":"baseData/getBaseDataList",
  // 数据详情
  "getBaseDataDetail":"/baseData/getBaseDataDetail",
  // 数据添加
  "metadataDataCreate":"baseData/addBaseData",
  // 数据上架
  "metadataDataPutaway":"baseData/upperBaseData",
  // 数据下架
  "metadataDataSoldOut":"baseData/downBaseData",
  // 数据删除
  "metadataDataDelete":"baseData/deleteBaseData",
  // 数据更新
  "metadataDataUpdate":"baseData/updateBaseData",

    // ----------------------------模板管理------------------------------------------------
    // 模板列表
    "queryTemplateList":"baseDataCategory/getBaseDataCategoryList",
    // 修改列表
    "editTemplateData":"baseDataCategory/getBaseDataCategoryList",
    // 删除列表
    "deleteTemplateData":"baseDataCategory/getBaseDataCategoryList",
    // 添加列表
    "addTemplateData":"baseDataCategory/getBaseDataCategoryList",
    // 发布列表
    "publishTemplateData":"baseDataCategory/getBaseDataCategoryList",
    // 下线列表
    "offTemplateData":"baseDataCategory/getBaseDataCategoryList",
}
