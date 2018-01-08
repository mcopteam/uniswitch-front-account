import {
  routerReducer as routing
} from 'react-router-redux'
import {
  combineReducers
} from 'redux'
import {default as user} from './user'
import {default as placeOrder} from './place-order'
import {default as auth} from './auth'
import {default as preList} from './preList'
import {default as productSidebar} from './productSidebar'
import {default as proSidCon} from './proSidCon'
import {default as executeSidebar} from './executeSidebar'
import {default as exeSidCon} from './exeSidCon'
import {default as limitRole} from './limit-role'
import {default as limitMenu} from './limit-menu'
import {default as limitBtn} from './limit-btn'
import {default as limitData} from './limit-data'
import {default as assetQueryList} from './assetQueryList'
import {default as assetQueryAmount} from './assetQueryAmount'
import {default as limitRoleData} from './limitRoleData'
import {default as limitRoleFun} from './limitRoleFun'
import {default as accountRecord} from './accountRecord'
import {default as assetKeyPairs} from './assetKeyPairs'
import {default as buttonList} from './buttonList'
import {default as blockchainList} from './blockchainPreserve'
import {default as blockchainOption} from './blockchainOption'
import {default as metaDataList} from './metadataDatas'
import {default as metaGategoryList} from './metadataCategory'
import {default as templateData} from './templateData'

export default combineReducers({
  user,
  placeOrder,
  auth,
  routing,
  preList,
  productSidebar,
  proSidCon,
  executeSidebar,
  exeSidCon,
  limitRole,
  limitMenu,
  limitBtn,
  limitData,
  assetQueryAmount,
  assetQueryList,
  limitRoleData,
  limitRoleFun,
  accountRecord,
  assetKeyPairs,
  buttonList,
  blockchainList,
  blockchainOption,
  metaDataList,
  metaGategoryList,
  templateData,
})
