import { repairOrder } from "@/api/types/models";
import { Module } from "vuex";
import { RepairOrder, RootState } from "../types";
import { MutationTypes } from "@/enums/mutationTypes";
import { ActionTypes } from "@/enums/actionTypes";
import { requestGetAllRepairOrder } from "@/api/repairOrder";

const RepairOrder: Module<RepairOrder, RootState> = {
  state: {
    repairOrder: [],
  },

  mutations: {
    [MutationTypes.SET_MY_REPAIRORDERS]: (
      state,
      repairOrderList: typeof state.repairOrder
    ) => {
      state.repairOrder = repairOrderList;
    },
  },

  actions: {
    [ActionTypes.getRepairOrders]: ({ commit }) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const res = await requestGetAllRepairOrder();
          // console.log("res",res)
          if (res.data.result) {
            commit(MutationTypes.SET_MY_MISSIONS, res.data.result);
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
    repairOrder: (state) => state.repairOrder,
  },
};

export default RepairOrder;
