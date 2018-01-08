import {
  portAccount,
  portService,
  portMetadata,
  portTradeorders,
  portContract,
} from './jumpPort'
export  function findRoute(link) {
  if (routes[link] != undefined) {
    return routes[link]
  } else {
    return false
  }
}
export const routes={
  // 账户管理
	// "/main/account/check":portAccount+'#/main/welcome?'+'link='+'check&'+'token='+sessionStorage.token,
	// "/main/account/preserve":portAccount+'#/main/welcome?'+'link='+'preservee&'+'token='+sessionStorage.token,
  // "/main/account/track":portAccount+'#/main/welcome?'+'link='+'track&'+'token='+sessionStorage.token,
  // "/main/limit/role":portAccount+'#/main/welcome?'+'link='+'role&'+'token='+sessionStorage.token,
  // "/main/limit/menu":portAccount+'#/main/welcome?'+'link='+'menu&'+'token='+sessionStorage.token,
  // "/main/limit/btn":portAccount+'#/main/welcome?'+'link='+'btn&'+'token='+sessionStorage.token,
  // "/main/limit/data":portAccount+'#/main/welcome?'+'link='+'data&'+'token='+sessionStorage.token,
  // 数据服务
  "/orderMaintain":portService+'#/orderMaintain?'+'link='+'orderMaintain&',
	"/agentMain":portService+'#/orderMaintain?'+'link='+'agentMain&',
	"/billingTrack":portService+'#/orderMaintain?'+'link='+'billingTrack&',
  // 数据管理
	"/main/metadata/productAdd":portMetadata+'#/main/welcome?'+'link='+'productAdd&',
	"/main/metadata/productPreserve":portMetadata+'#/main/welcome?'+'link='+'productPreserve&',
  "/main/metadata/classifyPreserve":portMetadata+'#/main/welcome?'+'link='+'classifyPreserve&',
  "/main/template/add":portMetadata+'#/main/welcome?'+'link='+'add&',
	"/main/template/preserve":portMetadata+'#/main/welcome?'+'link='+'preserve&',
  // 交易大厅
	"/main/uniswitch/goodsList":portTradeorders+'#/main/uniswitch/goodsList?'+'link='+'goodsList&',
  "/orderTrack":portTradeorders+'#/main/uniswitch/goodsList?'+'link='+'orderTrack&',
  "/goodsCar":portTradeorders+'#/main/uniswitch/goodsList?'+'link='+'goodsCar&',
  "/orderUnconfirmed":portTradeorders+'#/main/uniswitch/goodsList?'+'link='+'orderUnconfirmed&',
	"/goodsCheckout":portTradeorders+'#/main/uniswitch/goodsList?'+'link='+'goodsCheckout&',
  // 智能合约
  "/main/asset/create":portContract+'#/main/welcome?'+'link='+'create&',
  "/main/asset/record":portContract+'#/main/welcome?'+'link='+'record&',
  "/main/order/file":portContract+'#/main/welcome?'+'link='+'file&',
  "/main/order/product":portContract+'#/main/welcome?'+'link='+'product&',
  "/main/order/execute":portContract+'#/main/welcome?'+'link='+'execute&',
  "/main/finance/transfer":portContract+'#/main/welcome?'+'link='+'transfer&',
};
