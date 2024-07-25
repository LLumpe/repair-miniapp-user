/*
 * @Author: LLumpe LLumpe@163.com
 * @Date: 2024-07-09 03:16:54
 * @LastEditors: LLumpe LLumpe@163.com
 * @LastEditTime: 2024-07-26 00:17:28
 * @FilePath: \repair-miniapp-user\src\api\announcement.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import http from "@/utils/request";
import { Banner, JavaList, Notice, ResponseData } from "./types/models";

/**
 * 获取公告列表
 *
 * @return {*}
 */
export const requestGetAnnouncements = (params: { [key: string]: string }) => {
  console.log("params", params);
  return http.request<ResponseData<JavaList<Notice>>>({
    url: `api/richText`,
    method: "GET",
    params: params,
    data: {},
    custom: { noAuth: true },
  });
};

/**
 * 获取特定公告
 *
 * @param {number} id
 * @return {*}
 */
export const requestGetAnnouncementByID = (id: number) => {
  return http.request<ResponseData<JavaList<Notice>>>({
    url: `notice`,
    method: "GET",
    params: { roleId: 2, id },
    data: {},
    custom: { noAuth: true },
  });
};

/**
 * 获取 Banner 列表
 *
 * @return {*}
 */
export const requestGetBanners = () => {
  return http.request<ResponseData<JavaList<Banner>>>({
    url: `notice/banner`,
    method: "GET",
    params: { roleId: 2 },
    data: {},
    custom: { noAuth: true },
  });
};
