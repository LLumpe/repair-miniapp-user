<template>
  <view class="repairListItem">
    <view class="box">
      <view class="box-list" v-for="item in text_data" :key="item.id">
        <view class="box-list-item" @click="handleShowMoreRepairOrder">
          <view class="box-list-item-label">
            <span class="box-list-item-label-text">
              {{ repairLabel[String(item.state)] }}
            </span>
            <text class="iconfont icon-arrow-right box-list-item-label-arrow" />
          </view>
          <view class="box-list-item-top">
            <span class="box-list-item-top-time">
              {{ item.receiveAt }}
            </span>
            <view class="box-list-item-top-user">
              <image :src="item.familyUser.avatarUrl" />
              <span style="color: #999">{{ item.familyUser.name }}</span>
            </view>
          </view>
          <view class="box-list-item-divide" />
          <view class="box-list-item-content">
            <view class="box-list-item-content-address">
              <span style="color: #999"> 维修地址： </span>
              <span>
                {{ item.province }} - {{ item.district }} -
                {{ item.address }}
              </span>
            </view>
            <view class="box-list-item-content-number">
              <span style="color: #999">维修数量：</span>
              {{ item.repairEquipmentNumber }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";

//维修标签状态
const repairLabel = {
  "2": "进行中",
  "3": "待确认",
  "4": "已完成",
  "4-4": "已退单",
};
const text_data = reactive([
  {
    id: 1,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 2,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 2,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 2,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 3,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 2,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 4,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 2,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 4,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 2,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 4,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 2,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
  {
    id: 4,
    createTime: "2024-07-02 16:40:02",
    address: "软件园3号楼405",
    name: "赵师傅",
    phone: "14192043237",
    district: "西青区",
    familyUser: {
      avatarUrl:
        "https://home-action.oss-cn-shanghai.aliyuncs.com/admin/33/4c2cbed4-d8d1-41bc-b5af-455b12a935c6.png",
      city: "天津市",
      country: null,
      district: "西青区",
      id: 15,
      name: "赵肖云",
      nickName: "zxy",
      phone: "15192043237",
      province: "天津市",
      registerTime: "2021-03-18 14:49:12",
      sex: 1,
      state: 1,
    },
    finishAt: null,
    latitude: 0,
    longitude: 0,
    orderColumn: null,
    orderType: 1,
    orderWay: null,
    province: "天津市",
    receiveAt: "2024-06-29 21:59:46",
    repairEquipmentNumber: 1,
    startAt: null,
    state: 2,
    updatedAt: "2024-06-29 21:59:46",
    userId: 15,
    volunteerId: null,
  },
]);

export default defineComponent({
  name: "RepairListItem",
  components: {},
  onLoad() {
    console.log("111111");
  },
  props: {
    pageIndex: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    //跳转页面事件
    const handleShowMoreRepairOrder = () => {
      uni.navigateTo({
        url: "/pages/repairDetail/index",
      });
    };
    console.log("props--->", props.pageIndex);
    return { text_data, repairLabel, handleShowMoreRepairOrder };
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
    overflow: hidden;
    &-list {
      width: 700rpx;
      margin: 20rpx auto 0 auto;
      height: 220rpx;
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
            &-detail {
            }
          }
          &-number {
          }
        }
      }
    }
  }
}
</style>
