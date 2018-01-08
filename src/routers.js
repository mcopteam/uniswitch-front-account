import React from 'react'
import {
	Route,
	IndexRoute,
	IndexRedirect,
} from 'react-router'

import App from './pages/app'
import Main from './pages/main'
import Portal from './pages/portal'
import Login from './pages/login'
import Register from './pages/register'

// 欢迎页面
const welcomePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/welcome').default)
	}, 'welcome-page')
}
// 账户审核
const accountCheckPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/account-check').default)
	}, 'account-check-page')
}
// 账户维护
const accountPreservekPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/account-preserve').default)
	}, 'account-check-page')
}
// 账户状态跟踪
const accountTrackPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/account-track').default)
	}, 'account-check-page')
}
// 资产创建
const assetCreatePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/asset-create').default)
	}, 'asset-create-page')
}
// 资产记录查询
const assetRecordPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/asset-record').default)
	}, 'asset-record-page')
}
// 区块链维护
const blockchainPreservePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/blockchain-preserve').default)
	}, 'blockchain-preserve-page')
}
// 角色管理
const limitRolekPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/limit-role').default)
	}, 'limit-role-page')
}
// 菜单资源
const limitMenukPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/limit-menu').default)
	}, 'limit-menu-page')
}
// 按钮资源
const limitBtnkPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/limit-btn').default)
	}, 'limit-btn-page')
}
// 数据资源
const limitDatakPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/limit-data').default)
	}, 'limit-data-page')
}

// 合约产品
const contarctProductPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/contract-product').default)
	}, 'contract-product-page')
}
// 文件管理
const contarctFilePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/contract-file').default)
	}, 'contract-file-page')
}
// 执行合约
const contarctExecutePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/contract-execute').default)
	}, 'contract-execute-page')
}
// 初始化
const financeInitPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/finance-init').default)
	}, 'finance-init-page')
}
// 转账合约
const financeTransferPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/finance-transfer').default)
	}, 'finance-transfer-page')
}
// 跨链合约
const financeAcrossPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/finance-across').default)
	}, 'finance-across-page')
}
// 决策合约
const financeDecisionPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/finance-decision').default)
	}, 'finance-decision-page')
}
// uniSwitch数据分类维护
const metadataClassifyPreservePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/metadata-classifyPreserve').default)
	}, 'metadata-classifyPreserve-page')
}
// uniSwitch数据产品添加
const metadataProductAddPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/metadata-productAdd').default)
	}, 'metadata-productAdd-page')
}
// uniSwitch数据产品维护
const metadataProductPreservePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/metadata-productPreserve').default)
	}, 'metadata-productPreserve-page')
}
// 合同模板添加
const templateAddPage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/template-add').default)
	}, 'template-add-page')
}
// 合同模板维护
const templatePreservePage = (location, callback) => {
	require.ensure([], (require) => {
		callback(null, require('./pages/template-preserve').default)
	}, 'template-preserve-page')
}
// console.log(App, loginPage(), placeOrderPage())d

//    		<Route path="login" getComponent={LoginPage} />
//    		<Route path="register" getComponent={RegisterPage} />
//    <Route path="welcome" getComponent={welcomePage} />
//  <Route path="financebilldetail/:billId" getComponent={billDetailPage} />
//  <Route path="financesettlementdetail/:settlementId" getComponent={settlementDetailPage} />
export default(
	<Route path="/" component={App}>
		// <IndexRoute component={Login}/>
		<IndexRedirect to="/Login" />
		// <Route path="portal" component={ Portal } />
		<Route path="Login" component={ Login } />
		<Route path="Register" component={ Register } />
    <Route path="main" component={Main}>
	    <Route path="welcome" getComponent={welcomePage} />
      <Route path="account">
				<Route path='check' getComponent={accountCheckPage}/>
	    	<Route path='preserve' getComponent={accountPreservekPage}/>
				<Route path='track' getComponent={accountTrackPage}/>
      </Route>
      <Route path="limit">
				<Route path='role' getComponent={limitRolekPage}/>
				<Route path='menu' getComponent={limitMenukPage}/>
				<Route path='btn' getComponent={limitBtnkPage}/>
	    	<Route path='data' getComponent={limitDatakPage}/>
      </Route>
      {/* <Route path="metadata">
				<Route path='classifyPreserve' getComponent={metadataClassifyPreservePage}/>
	    	<Route path='productAdd' getComponent={metadataProductAddPage}/>
				<Route path='productPreserve' getComponent={metadataProductPreservePage}/>
      </Route>
      <Route path="template">
				<Route path='preserve' getComponent={templatePreservePage}/>
				<Route path='add' getComponent={templateAddPage}/>
      </Route>
      <Route path="asset">
				<Route path='create' getComponent={assetCreatePage}/>
				<Route path='record' getComponent={assetRecordPage}/>
      </Route>
      <Route path="blockchain">
				<Route path='preserve' getComponent={blockchainPreservePage}/>
      </Route>
      <Route path="order">
      	<Route path='file' getComponent={contarctFilePage}/>
      	<Route path='product' getComponent={contarctProductPage}/>
      	<Route path='execute' getComponent={contarctExecutePage}/>
      </Route>
      <Route path="finance">
        <Route path="init" getComponent={financeInitPage} />
				<Route path="transfer" getComponent={financeTransferPage} />
        <Route path="across" getComponent={financeAcrossPage} />
        <Route path="decision" getComponent={financeDecisionPage} />
      </Route> */}
    </Route>
  </Route>
)
