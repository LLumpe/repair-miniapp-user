<template>
  <view class="repairList">
    <view class="box">
      <view class="tag">
        <USegment
          :current="pageIndex"
          :values="items"
          style-type="text"
          active-color="#09C46E"
          @clickItem="onClickItem"
        />
      </view>
      <view class="content">
        <view v-if="pageIndex == 0"
          ><RepairListItem :pageIndex="pageIndex"></RepairListItem
        ></view>
        <view v-if="pageIndex == 1"
          ><RepairListItem :pageIndex="pageIndex"
        /></view>
        <view v-if="pageIndex == 2"
          ><RepairListItem :pageIndex="pageIndex"
        /></view>
        <view v-if="pageIndex == 3"
          ><RepairListItem :pageIndex="pageIndex"
        /></view>
        <view v-if="pageIndex == 4"
          ><RepairListItem :pageIndex="pageIndex"
        /></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, ref, watch, onMounted } from "vue";
import USegment from "@/components/USegment/index.vue";
import RepairListItem from "./components/repairListItem/index.vue";
//订单类别
const pageIndex = ref(0);
export default defineComponent({
  name: "RepairList",
  components: { USegment, RepairListItem },

  setup(props, ctx) {
    const items = ["全部", "进行中", "待确认", "已完成", "退单"];

    const onClickItem = (value: any) => {
      console.log("value", value);
      pageIndex.value = value.currentIndex;
    };
    return { items, onClickItem, pageIndex };
  },
  onLoad(option) {
    if (option?.pageIndex) {
      pageIndex.value = option.pageIndex;
    }
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
      width: 100%;
      height: 70rpx;
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
