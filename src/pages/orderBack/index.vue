<template>
  <view class="uploadRepairImage">
    <view class="box">
      <view class="box-form">
        <view  class="box-form-item">
          <title class="box-form-item-title">选择待{{context}}设备</title>
          <checkbox-group @change="checkboxChange">
            <view v-for="(item, index) in repairInfo" :key="item.id" class="box-form-item-device">
              <view class="box-form-item-device-checkbox">
                <checkbox :value="item.id" style="transform: scale(0.7)" />
              </view>
              <view class="box-form-item-device-content">
                <view class="box-form-item-device-content-title">
                  <span style="background-color: #09C46E;border-radius: 20rpx;color: #ffffff;padding: 5rpx 10rpx;">设备{{
                    index + 1 }}</span>

                </view>
                <view class="box-form-item-device-content-desc">
                  <span style="width: 250rpx;">设备名：{{ item.equipmentName || 'N/A' }}</span>
                  <span style="width: 250rpx;">维修描述：{{ item.repairDesc || 'N/A' }}</span>
                </view>
                <view class="box-form-item-device-content-image">
                  <span>设备图片：</span>
                  <view class="box-form-item-device-content-image-item" v-for="(item_1, index_1) in item.equipmentImg"
                    :key="index_1" @click="showImageEvent(item_1, index_1)">
                    <image :src="item_1" mode="aspectFit" />
                  </view>
                  <view v-if="
                    !item.equipmentImg ||
                    !item.equipmentImg
                      .length
                  ">暂无照片</view>
                </view>
              </view>
            </view>
          </checkbox-group>
        </view>
        <view class="box-form-item">
          <title class="box-form-item-title">{{ context }}描述</title>
          <view label="退单描述" class="box-form-item-desc">
            <textarea v-model="formData.afterSaleDesc" type="textArea" :placeholder="`请输入${context}的理由`"
              :maxlength="50" />
          </view>
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
import { reactive, defineComponent, computed, ref, onUnmounted } from "vue";
import {
  hideLoading,
  navigateBack,
  showModalError,
  showToast,
} from "@/utils/helper";
import { requestOrderBack, requestOrderRepair } from "@/api/repairOrder";
export interface formType {
  id: string;
  afterSaleDesc: string; //退单原因
  afterSaleEquipment: string; //退单维修设备
}
const timeout = ref<number | null>(null);
export default defineComponent({
  name: "UploadRepairImage",
  props: {
    id: {
      type: String,
      default: "",
    },
    type: {
      type: Number,
      default: 0, //0表示返修,1表示退单
    },
    repairOrder: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const formData = reactive<formType>({
      id: props.id,
      afterSaleDesc: "",
      afterSaleEquipment: "[]",
    });
    const repairInfo = computed(() => {
      return JSON.parse(JSON.parse(props.repairOrder).repairEquipmentContent);
    });
    console.log("repairInfo", repairInfo);
    const items = computed(() => {
      return JSON.parse(JSON.parse(props.repairOrder).repairEquipmentContent).map((item: any, index: number) => {
        return {
          value: item,
          name: item.equipmentName,
        };
      });
    });
    const context = computed(() => {
      return props.type === 0 ? "返修" : "退单";
    });
    const handleSubmit = async () => {
      try {
        console.log("orderBack_formData", formData);
        if (!formData.afterSaleDesc) {
          showToast(`请填写${context.value}描述`);
        } else if (formData.afterSaleEquipment === "[]") {
          showToast(`请选择需要${context.value}的设备`);
        } else {
          const res = await (props.type === 1
            ? requestOrderBack(formData)
            : requestOrderRepair(formData));
          console.log("res", res);
          if (res) {
            showToast("提交售后成功", "success");
            timeout.value = setTimeout(() => {
              navigateBack(2);
            }, 600);
          }
        }
      } catch (error) {
        console.log(error);
        hideLoading();
        showModalError("提交失败");
      }
    };
    const checkboxChange = (e: any) => {
      formData.afterSaleEquipment = JSON.stringify(e.detail.value);
    };
    //放大图片
    const showImageEvent = (item: any, index: number) => {
      uni.previewImage({
        urls: [item],
      });
    };

    onUnmounted(() => {
      clearTimeout(timeout.value);
    });
    return {
      showImageEvent,
      items,
      repairInfo,
      checkboxChange,
      timeout,
      context,
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

        &-device {
          display: flex;
          flex-direction: row;
          &-content {
            width: 100%;
            padding: 10rpx 20rpx 8rpx 20rpx;
            margin-bottom: 30rpx;
            border-radius: 10rpx;
            background-color: #ffffff;
            border: 1rpx solid rgb(230, 230, 230);
            transition: 0.2s all;
            font-size: $uni-font-size-sm;
            color: $uni-text-color;

            &-title {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-bottom: 5rpx;
              border-bottom: 1rpx solid rgb(230, 230, 230);

              span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
                position: relative;
              }
            }

            &-desc {
              width: 100%;
              display: flex;
              align-items: center;

              span {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
                position: relative;
              }
            }

            &-image {
              display: flex;
              flex-direction: row;
              width: 100%;
              margin-top: 5rpx;

              &-item {
                float: left;
                margin-left: 10rpx;

                image {
                  width: 100rpx;
                  height: 100rpx;
                  border: 1px solid rgb(230, 230, 230);
                  border-radius: 10rpx;
                }
              }
            }
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
