<template>
  <view class="repairList">
    <view class="box">
      <view class="tag">
        <USegment
          :current="segIndex"
          :values="items"
          style-type="text"
          active-color="#09C46E"
          @clickItem="onClickItem"
        />
      </view>

      <view v-if="loading == false" class="content">
        <RepairListItem :pageIndex="pageIndex" />
      </view>
      <view v-if="loading == true" class="loading">
        <ULoadMore
          status="loading"
          :contentText="loadingOption"
          iconType="circle"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Ref, defineComponent, ref } from "vue";
import USegment from "@/components/USegment/index.vue";
import RepairListItem from "./components/repairListItem/index.vue";
import { showToast } from "@/utils/helper";
import { repairDetail } from "@/api/types/models";
import ULoadMore from "@/components/ULoadMore/index.vue";
import store from "@/store";
import { ActionTypes } from "@/enums/actionTypes";
//订单类别
const segIndex: Ref<number | undefined> = ref(0);
const pageIndex: Ref<number | undefined> = ref(0);
//当前的列表
const repairOrderList = ref<repairDetail | null>(null);
//loading配置
const loadingOption = {
  contentdown: "下拉显示更多",
  contentrefresh: "正在加载",
  contentnomore: "没有更多了",
};
//是否数据正在加载
const loading = ref<boolean>(true);
//tabs标题
const items = [
  "全部",
  "待审核",
  "待接单",
  "进行中",
  "待确认",
  "已完成",
  "已售后",
  "已终止",
];
//pageIndex转换为state
const state = new Map([
  [0, 5],
  [1, 0],
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 4],
  [6, -10],
  [7, -20],
]);
export default defineComponent({
  name: "RepairList",
  components: { USegment, RepairListItem, ULoadMore },
  setup() {
    const onClickItem = (value: any) => {
      pageIndex.value = state.get(value.currentIndex);
      segIndex.value = value.currentIndex;
      console.log("segIndex", segIndex.value);
      console.log("pageIndex", pageIndex.value);
    };
    return {
      repairOrderList,
      items,
      segIndex,
      pageIndex,
      onClickItem,
      state,
      loadingOption,
      loading,
    };
  },
  onLoad(option) {
    loading.value = true;
    if (option?.pageIndex) {
      segIndex.value = option.pageIndex;
      pageIndex.value = state.get(Number(option.pageIndex));
    }
    store.dispatch(ActionTypes.getRepairOrders);
    loading.value = false;
  },
  onShow() {
    loading.value = true;
    console.log("repairList show");
    store.dispatch(ActionTypes.getRepairOrders);
    loading.value = false;
  },
  onPullDownRefresh() {
    loading.value = true;
    store.dispatch(ActionTypes.getRepairOrders).then(() => {
      uni.stopPullDownRefresh();
      showToast("刷新成功", "success");
      loading.value = false;
    });
  },
});
</script>

<style lang="scss">
.repairList {
  .box {
    width: 100%;
    .tag {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      position: fixed;
      z-index: 1;
      top: 0;
      width: 100%;
      height: 80rpx;
      margin: auto 0;
      background-color: #ffffff;
    }

    .content {
      margin-top: 30rpx;
      flex: 1;
      width: 100%;
    }
    .loading {
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
