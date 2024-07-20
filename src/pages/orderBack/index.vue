<template>
  <view class="uploadRepairImage">
    <view class="box">
      <view class="box-form">
        <view class="box-form-item">
          <title class="box-form-item-title">退单/返修描述</title>
          <view label="图片描述" class="box-form-item-desc">
            <textarea
              v-model="formData.desc"
              type="textArea"
              placeholder="请输入返修/退单的理由"
              :maxlength="50"
            />
          </view>
        </view>
      </view>
      <view class="box-button">
        <button @click="handleSubmit">提交</button>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import {
  hideLoading,
  showLoading,
  showModalError,
  showToast,
} from "@/utils/helper";
export interface formType {
  id: string;
  desc: string; //退单原因
}
export default defineComponent({
  name: "UploadRepairImage",
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  setup() {
    const formData = reactive<formType>({
      id: "",
      desc: "",
    });
    const handleSubmit = () => {
      try {
      } catch (error) {
        console.log(error);
        hideLoading();
        showModalError("提交失败");
      }
    };
    return {
      formData,
      handleSubmit,
    };
  },
  onLoad(options) {
    console.log("options", options);
  },
});
</script>

<style lang="scss">
.uploadRepairImage {
  width: 100%;
  .box {
    position: relative;
    width: 100%;
    &-form {
      margin-top: 30rpx;
      border-radius: 20rpx;
      width: 100%;
      box-sizing: border-box;
      padding: 0 40rpx 0 40rpx;
      overflow: hidden;
      background-color: #ffffff;
      &-item {
        width: 100%;
        display: block;
        margin: 30rpx auto 30rpx auto;
        &-title {
          display: flex;
          align-items: center;
          font-size: $uni-font-size-xl;
          letter-spacing: 2rpx;
          &::before {
            content: "*";
            color: red;
          }
        }
        &-desc {
          width: 100%;
          height: 200rpx;
          margin-top: 20rpx;
          border-radius: 20rpx;
          textarea {
            font-size: $uni-font-size-base;
            box-sizing: border-box;
            padding: 20rpx;
            width: 100%;
            height: 100%;
            border-radius: 20rpx;
            border: 1rpx solid $uni-border-color;
            &:hover {
              background-color: #f4f4f4;
            }
          }
        }
      }
    }
    &-button {
      width: 100%;
      background-color: #ffffff;
      height: 160rpx;
      padding: 10rpx;
      padding-bottom: 40rpx;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 2;
      button {
        margin-top: 20rpx;
        width: 700rpx;
        border-radius: 50rpx;
        font-weight: 600;
        color: #ffffff;
        background-color: $uni-color-primary;
      }
    }
  }
}
</style>
