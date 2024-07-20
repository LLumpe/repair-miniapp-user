import { repairOrder } from "@/api/types/models";
import { Module } from "vuex";
import { RepairOrder, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import { requestGetAllUserRepairOrder } from "@/api/myRepairOrder";
const RepairOrder: Module<RepairOrder, RootState> = {
  state: {
    userRepairOrder: [],
  },

  mutations: {
    [MutationTypes.SET_MY_REPAIRORDERS]: (
      state,
      userRepairOrder: typeof state.userRepairOrder
    ) => {
      state.userRepairOrder = userRepairOrder;
    },
  },

  actions: {
    //获取用户全部维修订单
    [ActionTypes.getRepairOrders]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetAllUserRepairOrder();
          if (res.data.result) {
            commit(MutationTypes.SET_MY_REPAIRORDERS, res.data.result.records);
          }
          resolve();
        } catch (e) {
          console.log(e);
          reject();
        }
      });
    },
  },

  getters: {
    repairOrder: (state) => state.userRepairOrder,
  },
};

export default RepairOrder;
