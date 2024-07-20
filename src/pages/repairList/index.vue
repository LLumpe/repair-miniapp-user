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
      <view class="content">
        <view v-if="segIndex === 0"
          ><RepairListItem :pageIndex="5"></RepairListItem
        ></view>
        <view v-if="segIndex === 1"><RepairListItem :pageIndex="0" /></view>
        <view v-if="segIndex === 2"><RepairListItem :pageIndex="1" /></view>
        <view v-if="segIndex === 3"><RepairListItem :pageIndex="2" /></view>
        <view v-if="segIndex === 4"><RepairListItem :pageIndex="3" /></view>
        <view v-if="segIndex === 5"><RepairListItem :pageIndex="4" /></view>
        <view v-if="segIndex === 6"><RepairListItem :pageIndex="-10" /></view>
        <view v-if="segIndex === 7"><RepairListItem :pageIndex="-20" /></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref, watch, onMounted } from "vue";
import USegment from "@/components/USegment/index.vue";
import RepairListItem from "./components/repairListItem/index.vue";
//订单类别
const segIndex: Ref<number | undefined> = ref(0);
const pageIndex: Ref<number | undefined> = ref(0);
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
  components: { USegment, RepairListItem },
  setup(props, ctx) {
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
    console.log("state", state);
    const onClickItem = (value: any) => {
      console.log("state.get", state.get(value.currentIndex));
      pageIndex.value = state.get(value.currentIndex);
      segIndex.value = value.currentIndex;
      console.log("segIndex", segIndex.value);
    };
    return { items, segIndex, pageIndex, onClickItem, state };
  },
  onLoad(option) {
    if (option?.pageIndex) {
      segIndex.value = option.pageIndex;
      pageIndex.value = state.get(Number(option.pageIndex));
    }
  },
  onShow() {
    console.log("repairList show");
  },
});
</script>

<style lang="scss">
.repairList {
  .box {
    width: 100%;
    .tag {
      position: sticky;
      top: 0;
      // width: 100%;
      height: 70rpx;
      overflow: auto;
      z-index: 1;
      background-color: #ffffff;
    }
    .content {
      margin-top: 30rpx;
      flex: 1;
      width: 100%;
    }
  }
}
</style>
