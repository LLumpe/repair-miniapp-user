/*
 * @Author: LLumpe LLumpe@163.com
 * @Date: 2024-07-09 03:16:55
 * @LastEditors: LLumpe LLumpe@163.com
 * @LastEditTime: 2024-07-26 14:53:21
 * @FilePath: \repair-miniapp-user\src\store\modules\announcement.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { Module } from "vuex";
import { AnnouncementState, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import { requestGetAnnouncements, requestGetBanners } from "@/api/announcement";

const Announcement: Module<AnnouncementState, RootState> = {
  state: {
    announcements: [],
    banners: [],
  },

  mutations: {
    [MutationTypes.SET_ANNOUNCEMENT_LIST]: (
      state,
      announcements: typeof state.announcements
    ) => {
      state.announcements = announcements;
      console.debug(state);
    },
    [MutationTypes.SET_BANNER_LIST]: (state, banners: typeof state.banners) => {
      state.banners = banners;
      console.debug(state);
    },
  },

  actions: {
    [ActionTypes.getAnnouncements]: ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await requestGetAnnouncements({
            sceneType: "user_notice",
          });
          console.log("notice", res.data.result);
          if (res.data && res.data.result) {
            commit(MutationTypes.SET_ANNOUNCEMENT_LIST, res.data.result);
          }
          resolve(res.data.result);
        } catch (e) {
          reject(e);
        }
      });
    },
    [ActionTypes.getBanners]: ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await requestGetBanners({ type: 1 });
          if (res.data && res.data.result) {
            commit(MutationTypes.SET_BANNER_LIST, res.data.result);
          }
          resolve(res.data.data);
        } catch (e) {
          reject(e);
        }
      });
    },
  },

  getters: {
    announcements: (state) => state.announcements,
    banners: (state) => state.banners,
  },
};

export default Announcement;
