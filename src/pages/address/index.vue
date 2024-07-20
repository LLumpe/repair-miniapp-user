<template>
  <view class="myAddress">
    <view class="box">
      <view
        class="box-item"
        v-for="(item, index) in myAddress"
        :key="item.id"
        v-if="myAddress.length"
        @click="handleSelectAddress(item)"
      >
        <view class="box-item-content">
          <view class="box-item-content-address">
            <span style="font-size: 26rpx; margin-bottom: 10rpx">
              {{ item.province }} - {{ item.city }} - {{ item.district }}
            </span>
            <span
              style="font-size: 34rpx; font-weight: 600; margin-bottom: 10rpx"
              >{{ item.address }}</span
            >
            <view style="font-size: 24rpx">
              <span>{{ item.name }}</span>
              <span>({{ item.phone }})</span>
            </view>
          </view>
          <image
            v-if="select === false"
            src="@/static/images/home/edit.png"
            @click="handleEditAddress(item)"
          />
        </view>
        <view class="box-item-option">
          <view class="box-item-option-checkbox">
            <checkbox
              :checked="item.isDefault === 1"
              style="transform: scale(0.7)"
            />默认维修地址
          </view>
          <span @click="handleConfirmDelete(item)" v-if="select === false">
            删除
          </span>
        </view>
      </view>

      <view class="box-empty" v-if="!myAddress.length">
        <image src="@/static/images/address/empty.png" class="empty-icon" />
        <span> 暂无地址信息，请添加！</span>
      </view>
    </view>
    <view class="box-block"></view>
    <view class="box-option">
      <button @click="handleAddAddress">新增地址</button>
    </view>
  </view>
</template>

<script lang="ts">
import { Ref, computed, defineComponent, reactive, ref } from "vue";
import { Address } from "@/api/types/models";
import {
  requestGetUserAddressByPage,
  requestDeleteUserAddress,
} from "@/api/address";
import {
  hideLoading,
  navigateBack,
  navigateTo,
  showLoading,
  showToast,
} from "@/utils/helper";
import UPopup from "@/components/UPopup/index.vue";
const loadData = () => {
  try {
    requestGetUserAddressByPage({ current: 1, size: 10 }).then((res: any) => {
      console.log("res:", res.data.result.records);
      myAddress.value = res.data.result.records;
    });
  } catch (error) {
    console.log("error", error);
    showToast("获取数据失败");
  }
};
const myAddress = ref<Array<Address>>([]);
const showDelete = ref(false);
const select = ref(false); //是否是选择地址
export default defineComponent({
  name: "Address",
  components: { UPopup },
  setup(props) {
    const getUserAddress = async () => {};
    const handleAddAddress = () => {
      uni.navigateTo({
        url: "/pages/createAddress/index",
      });
    };
    const handleEditAddress = (address: Address) => {
      uni.navigateTo({
        url: `/pages/editAddress/index?address=${encodeURIComponent(
          JSON.stringify(address)
        )}`,
      });
    };
    //选择地址
    const handleSelectAddress = (address: Address) => {
      if (select.value) {
        //获得当前页面实例
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2]; // 获取上一页实例
        prevPage.$vm.getAddressFromPage(address);
        navigateBack();
      }
    };
    const handleConfirmDelete = (address: Address) => {
      uni.showModal({
        title: "提示",
        content: "是否删除地址？",
        success: function (res) {
          if (res.confirm) {
            handleDelete(address);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    };
    const handleDelete = async (address: Address) => {
      showLoading("删除中");
      try {
        const res = await requestDeleteUserAddress(address.id as number);
        console.log("res", res);
        if (res.data.success) {
          console.log(111);
          showToast("删除成功", "success");
          showDelete.value = false;
          loadData();
        }
      } catch (error) {
        showToast("error");
      }
      hideLoading();
    };
    return {
      ...getUserAddress(),
      myAddress,
      handleConfirmDelete,
      handleDelete,
      showDelete,
      handleSelectAddress,
      handleAddAddress,
      handleEditAddress,
      loadData,
      select,
    };
  },
  onLoad(option: any) {
    console.log("option", option.select);
    if (option.select) {
      select.value = option.select;
    } else {
      select.value = false;
    }
  },
  onShow() {
    loadData();
  },
});
</script>

<style lang="scss">
.myAddress {
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(9, 196, 110, 1),
    rgb(229, 236, 232),
    rgb(238, 240, 239),
    rgb(206, 233, 220),
    rgb(237, 241, 240),
    rgba(255, 255, 255, 1)
  );
  .box {
    width: 100%;
    min-height: 90vh;
    padding: 20rpx 20rpx 0 20rpx;
    overflow: hidden;
    box-sizing: border-box;
    &-block {
      width: 100%;
      height: 10vh;
      background-color: #ffffff;
    }
    &-item {
      width: 100%;
      border-radius: 15rpx;
      background-color: #ffffff;
      margin-bottom: 30rpx;
      &-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1rpx solid gainsboro;
        &-address {
          width: 650rpx;
          padding: 20rpx;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        image {
          width: 35rpx;
          height: 35rpx;
          padding-right: 20rpx;
        }
      }
      &-option {
        color: $uni-text-color-grey;
        font-size: $uni-font-size-base;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10rpx;
        justify-content: space-between;
        span {
          height: 50rpx;
          line-height: 50rpx;

          padding-right: 20rpx;
          &:active {
            font-weight: 600;
          }
        }
      }
    }
    &-option {
      background-color: #ffffff;
      z-index: 1;
      width: 100%;
      height: 150rpx;
      position: fixed;
      bottom: 0;
      padding: 20rpx;
      box-sizing: border-box;
      button {
        border-radius: 50rpx;
        background-color: $uni-color-primary;
        color: #ffffff;
        font-weight: 600;
      }
    }
    &-empty {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      image {
        width: 200rpx;
        height: 200rpx;
      }
      span {
        margin-top: 20rpx;
        color: #ffffff;
        font-size: $uni-font-size-base;
        font-weight: 600;
      }
    }
  }
  .popup {
    width: 400rpx;
    text-align: center;
    &-title {
      font-size: $uni-font-size-xl;
      line-height: 100rpx;
      font-weight: 600;
    }
    &-button {
      display: flex;
      flex-direction: row;
      height: 80rpx;
      button {
        width: 50%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: $uni-font-size-sm;
      }
    }
  }
}
</style>
