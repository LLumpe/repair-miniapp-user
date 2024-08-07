import http from "@/utils/request";
import { ResponseData, JavaList, repairOrder } from "./types/models";
/**
 * 获取所有维修订单
 *
 * @return {*}
 */
export const requestGetAllRepairOrder = (
  params?: {
    /* 当前页码 */
    current?: number;
    /* 页码数据量 */
    pageSize?: number;
    /* 查询开始日期 */
    startAt?: string;
    /* 查询结束日期 */
    endAt?: string;
    [key: string]: unknown;
  },
  options?: { [key: string]: any }
) => {
  return http.request({
    url: `api/repairOrder`,
    method: "GET",
    params: params,
    data: {},
    custom: { noAuth: true },
  });
};

/**
 * 通过维修订单ID获取所有维修订单
 *
 * @return {*}
 */
export const requestGetRepairOrderById = (id: number) => {
  return http.request({
    url: `api/repairOrder/id`,
    method: "GET",
    data: {},
    params: { id: id },
    custom: { noAuth: true },
  });
};

/**
 * 新增维修订单
 *
 * @return {*}
 */
export const requestAddRepairOrder = (data: repairOrder) => {
  return http.request({
    url: `api/repairOrder`,
    method: "POST",
    data: data,
    params: {},
    custom: { noAuth: true },
  });
};
/**
 * 用户确认完成订单
 *
 * @return {*}
 */
export const requestUserFinishRepairOrder = (data: any) => {
  return http.request({
    url: `api/repairOrder/confirm`,
    method: "POST",
    data: data,
    params: {},
    custom: { noAuth: true },
  });
};

/**
 * 用户申请退单
 *
 * @return {*}
 */
export const requestOrderBack = (data: any) => {
  return http.request({
    url: `api/repairOrder/back`,
    method: "POST",
    data: data,
    params: {},
    custom: { noAuth: true },
  });
};

/**
 * 用户申请返修
 *
 * @return {*}
 */
export const requestOrderRepair = (data: any) => {
  return http.request({
    url: `api/repairOrder/again`,
    method: "POST",
    data: data,
    params: {},
    custom: { noAuth: true },
  });
};

/**
 * 用户取消订单
 *
 * @return {*}
 */
export const requestCancelOrder = (data: any) => {
  console.log("data", data);
  return http.request({
    url: `api/repairOrder/cancel`,
    method: "POST",
    data: { id: data.id },
    params: {},
    custom: { noAuth: true },
  });
};
