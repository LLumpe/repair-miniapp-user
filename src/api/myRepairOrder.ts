import http from "@/utils/request";
import { Banner, JavaList, Notice, ResponseData } from "./types/models";

/**
 * 上传维修图片
 *
 * @return {*}
 */
export const requestUploadImage = (filePath: string) => {
  return http.upload<ResponseData<string>>(`family/photo`, {
    filePath,
    name: "photo",
  });
};
/**
 * 获取用户维修订单
 *
 * @return {*}
 */
export const requestGetAllUserRepairOrder = (
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
    url: `/api/repairOrder/my`,
    method: "GET",
    data: {},
    params: params,
    custom: { noAuth: true },
  });
};
