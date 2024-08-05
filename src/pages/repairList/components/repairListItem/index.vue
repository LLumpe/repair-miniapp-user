<template>
  <view class="repairListItem">
    <view v-if="repairOrderList.length" class="box">
      <view class="box-list" v-for="item in repairOrderList" :key="item.id">
        <view class="box-list-item" @click="handleShowMoreRepairOrder(item)">
          <view class="box-list-item-label">
            <span class="box-list-item-label-text">
              {{ repairLabel[String(item.state)] }}
              {{ item.orderType === 2 ? "(返修订单)" : "" }}
            </span>
            <text class="iconfont icon-arrow-right box-list-item-label-arrow" />
          </view>
          <view class="box-list-item-top">
            <span class="box-list-item-top-time">
              {{ item.createdAt || "N/A" }}
            </span>
            <view class="box-list-item-top-user">
              <image :src="item.familyUser.avatarUrl" />
              <span style="color: #999">{{ item.name || "匿名订单" }}</span>
            </view>
          </view>
          <view class="box-list-item-divide" />
          <view class="box-list-item-content">
            <view class="box-list-item-content-address">
              <span style="color: #999">维修地区：</span>
              <span class="box-list-item-content-address-detail">
                {{ item.province || "N/A" }} - {{ item.district || "N/A" }}
              </span>
            </view>
            <view class="box-list-item-content-address">
              <span style="color: #999">详细地址：</span>
              <span class="box-list-item-content-address-detail">
                {{ item.address || "N/A" }}</span
              >
            </view>
            <view class="box-list-item-content-number">
              <span style="color: #999">维修数量：</span>
              {{ item.repairEquipmentNumber || "N/A" }}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="empty">
      <Empty v-if="!repairOrderList.length" message="暂无订单信息" />
    </view>
  </view>
</template>

<script lang="ts">
import { RepairOrder } from "@/store/types";
import { computed, defineComponent, ref, Ref } from "vue";

//维修标签状态
const repairLabel = {
  "0": "待审核",
  "1": "待接单",
  "2": "进行中",
  "3": "待确认",
  "4": "已完成",
  "-1": "取消订单",
  "-2": "审核不通过",
  "-3": "退单申请中",
  "-4": "退单审核不通过",
  "-5": "已退单",
  "-6": "返修申请中",
  "-7": "返修审核不通过",
  "-8": "已返修",
  "-10": "已售后",
  "-20": "已终止",
};

import Empty from "@/components/Empty/index.vue";
import { useStore } from "vuex";
import { repairOrder } from "@/api/types/models";
export default defineComponent({
  name: "RepairListItem",
  components: { Empty },
  props: {
    pageIndex: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const store = useStore();
    //跳转页面事件
    const handleShowMoreRepairOrder = (item: RepairOrder) => {
      console.log("item", item);
      uni.navigateTo({
        url:
          "/pages/repairDetail/index?repairOrder=" +
          encodeURIComponent(JSON.stringify(item)),
      });
    };
    const repairOrderList = computed(() => {
      return store.getters.userRepairOrder.filter((item: repairOrder) =>
        props.pageIndex === 5
          ? item
          : props.pageIndex === -10
          ? item.state >= -8 && item.state <= -3
          : props.pageIndex === -20
          ? item.state >= -2 && item.state <= -1
          : item.state === props.pageIndex
      );
    });
    return {
      repairOrderList,
      repairLabel,
      handleShowMoreRepairOrder,
    };
  },
});
</script>

<style lang="scss">
@mixin flex($direction: row) {
  display: flex;
  flex-direction: $direction;
}
.repairListItem {
  .box {
    width: 100%;
    margin-top: 100rpx;
    overflow: hidden;
    &-list {
      width: 700rpx;
      margin: 20rpx auto 0 auto;
      height: 240rpx;
      margin-bottom: 30rpx;
      border-radius: 20rpx;
      background-color: #ffffff;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      border: 1rpx solid transparent;
      transition: 0.2s all;
      &:active {
        border: 1rpx solid $uni-text-color-grey;
      }
      &-item {
        width: 100%;
        height: 100%;
        // padding: 20rpx;
        box-sizing: border-box;
        position: relative;
        &-label {
          @include flex;
          align-items: center;
          justify-content: space-between;
          &-text {
            border-top-left-radius: 20rpx;
            border-bottom-right-radius: 50rpx;
            background-color: $uni-color-primary;
            padding: 0 30rpx 0 10rpx;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            color: #ffffff;
            line-height: 35rpx;
            font-size: 26rpx;
          }
          &-arrow {
            margin-right: 20rpx;
            color: $uni-text-color-grey;
            font-size: 30rpx;
          }
        }
        &-top {
          width: 100%;
          height: 70rpx;
          padding: 20rpx;
          box-sizing: border-box;
          font-size: 26rpx;
          @include flex;
          justify-content: space-between;
          &-user {
            @include flex;
            align-items: center;
            image {
              width: 50rpx;
              height: 50rpx;
              border-radius: 50%;
              object-fit: contain;
            }
            span {
              margin-left: 10rpx;
            }
          }
        }
        &-divide {
          width: 660rpx;
          height: 1rpx;
          margin: 0 auto 0 auto;
          border-bottom: 2rpx solid $uni-border-color;
        }
        &-content {
          width: 100%;
          padding: 20rpx;
          box-sizing: border-box;
          font-size: 26rpx;
          height: 100rpx;
          font-size: 24rpx;
          &-address {
            display: flex;
            flex-direction: row;
            &-detail {
              width: 500rpx;
              display: block;
              overflow: hidden;
              white-space: nowrap; /* 不换行 */
              text-overflow: ellipsis; /* 超出部分显示省略号 */
            }
          }
        }
      }
    }
  }
  .empty {
    width: 100%;
    margin-top: 100rpx;
    overflow: hidden;
  }
}
</style>
