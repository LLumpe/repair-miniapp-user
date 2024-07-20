<template>
  <view class="repairDetail">
    <view class="box">
      <view class="box-title" v-if="currentRepairOrder.state === 0">
        <h1>待审核</h1>
        <h2>订单正在审核中，请您耐心等待~</h2>
      </view>
      <view class="box-title" v-if="currentRepairOrder.state === 1">
        <h1>待接单</h1>
        <h2>订单正在等待师傅接单，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="currentRepairOrder.state === 2">
        <h1>进行中</h1>
        <h2>订单正在进行中，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="currentRepairOrder.state === 3">
        <h1>待确认</h1>
        <h2>订单已维修完毕，请您确认~</h2>
      </view>
      <view class="box-title" v-if="currentRepairOrder.state === 4">
        <h1>已完成</h1>
        <h2>订单已经完成，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="currentRepairOrder.state === -10">
        <h1>已售后</h1>
        <h2>订单已经售后，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="currentRepairOrder.state === -20">
        <h1>已终止</h1>
        <h2>订单已经终止，祝您生活愉快~</h2>
      </view>
      <view class="box-notice">
        <view class="box-notice-image">
          <image src="@/static/images/repairDetail/repairMan.png" />
        </view>
        <view class="box-notice-content">
          <span v-if="currentRepairOrder.state === 1">
            HI!~订单正在等待师傅接单，请您耐心等待!
          </span>
          <span v-if="currentRepairOrder.state === 2">
            HI!~订单正在进行中，请您耐心等待师傅完成维修!
          </span>
          <span v-if="currentRepairOrder.state === 3">
            HI!~订单已由维修师傅完成，请您确认!
          </span>
          <span v-if="currentRepairOrder.state === 4">
            HI!~订单已经完成，感谢您选择我们的服务!
          </span>
          <span v-if="currentRepairOrder.state === -10">
            HI!~订单已经售后，感谢您选择我们的服务!
          </span>
          <span v-if="currentRepairOrder.state === -20">
            HI!~订单已经终止，感谢您选择我们的服务!
          </span>
        </view>
        <RepairDetailNotice />
      </view>
      <view class="box-orderId">
        <span class="box-orderId-content">
          订单号：1020240706143145142099
        </span>
        <view style="color: #09c46e" @click="handleCopyRepairId">复制</view>
      </view>
      <view class="box-order">
        <view class="box-order-title"> 订单详情：</view>
        <view class="box-order-content">
          <view class="box-order-steps">
            <view class="box-order-steps-item">
              <USteps
                :options="stepList"
                :active="currentRepairOrder.state"
                active-color="#09C46E"
              />
            </view>
          </view>
          <RepairOrderDetailInfo :orderDetail="currentRepairOrder" />
        </view>
      </view>
      <view v-if="currentRepairOrder.state !== 1" class="box-order">
        <view class="box-order-title"> 维修记录：</view>
        <view class="box-order-content">
          <RepairOrderWorkerInfo :orderDetail="currentRepairOrder" />
        </view>
      </view>

      <view class="block" />

      <view class="box-option">
        <view
          v-if="
            currentRepairOrder.state === 0 || currentRepairOrder.state === 1
          "
          class="box-option-item"
        >
          取消订单
        </view>
        <view
          v-if="
            currentRepairOrder.state === 3 || currentRepairOrder.state === 4
          "
          class="box-option-item"
          @click="handleRepairBack"
        >
          返修
        </view>
        <view
          v-if="
            currentRepairOrder.state === 3 || currentRepairOrder.state === 4
          "
          class="box-option-item"
          @click="handleOrderBack"
        >
          退单
        </view>
        <view
          v-if="currentRepairOrder.state === 3"
          class="box-option-item"
          @click="handleSubmitImage"
        >
          确认完成
        </view>
      </view>

      <u-popup
        v-model="showMessage"
        custom-class="place-info-popup"
        mode="center"
        :border-radius="20"
        @close="handleModalClose"
      >
        <view class="message">
          <title class="message-title">确认订单须知</title>
          <h1></h1>
          <view class="message-content">
            <view>
              尊敬的客户，您好！感谢您选择我们的维修服务，为了确保您的权益，请仔细阅读一下确认订单须知：
            </view>
            <view class="message-content-text">
              请检查师傅是否已按照订单要求完成所有维修项目，若有任何未完成或遗漏的项目，请及时告知师傅或联系客户服务。
            </view>
            <view class="message-content-text">
              请仔细检查维修质量，确保所有修理部位正常运行且没有出现新的问题。
            </view>
            <view class="message-content-text">
              如有任何不满意之处，可以后续提供退单或者返修的需求。
            </view>
            <br />
          </view>
          <view class="message-button">
            <button @click="handleCancelOrder">
              {{ text }}
            </button>
            <button @click="handleAcceptOrder">确认</button>
          </view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script lang="ts">
import { ref, Ref, reactive, defineComponent, onMounted } from "vue";
import USteps from "@/components/USteps/index.vue";
import RepairOrderDetailInfo from "./components/repairOrderDetailInfo/index.vue";
import RepairOrderWorkerInfo from "./components/repairOrderWorkerInfo/index.vue";
import UCollapse from "@/components/UCollapse/index.vue";
import UCollapseItem from "@/components/UCollapseItem/index.vue";
import UPopup from "@/components/UPopup/index.vue";
import {
  hideLoading,
  navigateTo,
  showLoading,
  showModalError,
  showToast,
} from "@/utils/helper";
import { repairOrder } from "@/api/types/models";
import { requestUserFinishRepairOrder } from "@/api/repairOrder";
//维修进度状态
const stepList = ref<Array<object>>([]);
//显示确认须知
const showMessage = ref(false);
//定时关闭
let timeout = ref<number | null>(null);
//设置关闭秒数
const count = ref<number>(7);
//显示关闭
const text = ref<string>("取消");
//折叠是否显示
const showCollapse = ref<Array<string>>(["0"]);
//维修标签状态
const repairLabel = {
  "2": "订单进行中",
  "3": "订单待确认",
  "4": "订单已完成",
  "4-4": "订单已退单",
};
const currentRepairOrder: Ref<repairOrder | null> = ref(null);
export default defineComponent({
  name: "RepairDetail",
  components: {
    USteps,
    RepairOrderDetailInfo,
    UPopup,
    RepairOrderWorkerInfo,
  },
  props: {
    repairOrder: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    const handleCopyRepairId = () => {
      showToast("复制成功", "success");
    };
    //折叠面板折叠
    const handleCollapseChange = (value: any) => {
      console.log("value", value);
    };
    //返修
    const handleRepairBack = () => {
      //optionType 0表示返修,1表示退单
      uni.navigateTo({
        url: `/pages/orderBack/index?id=${currentRepairOrder.value.id};optionType=0`,
      });
    };
    //退单
    const handleOrderBack = () => {
      uni.navigateTo({
        url: `/pages/orderBack/index?id=${currentRepairOrder.value.id};optionType=1`,
      });
    };
    //提醒用户
    const handlePushUser = () => {
      showToast("提醒用户成功！", "success");
    };
    //用户确认订单完成
    const handleSubmitImage = () => {
      startCountDown();
      showMessage.value = true;
    };
    //取消
    const handleCancelOrder = () => {
      showMessage.value = false;
      handleClearInterval();
    };
    //确认
    const handleAcceptOrder = async () => {
      let timeout;
      showMessage.value = false;
      handleClearInterval();
      const data = {
        ...currentRepairOrder.value,
        repairEquipmentContent: JSON.stringify(
          currentRepairOrder.value.repairEquipmentContent
        ),
        repairImg: JSON.stringify(
          currentRepairOrder.value.repairEquipmentContent
        ),
        orderFlowDate: null,
        orderFlowDesc: null,
        orderFlowFinish: null,
        orderFlowList: null,
        orderFlowState: null,
      };
      console.log("data", data);
      try {
        const res = await requestUserFinishRepairOrder(data);
        console.log("res", res);
        if (res.data.success) {
          showToast("订单确认成功", "success");
          timeout = setTimeout(() => {
            uni.navigateBack({ delta: 2 });
          }, 600);
        }
      } catch (error) {
        showToast("error");
        console.log("error", error);
      }
      clearTimeout(timeout);
    };
    //弹窗关闭
    const handleModalClose = () => {
      handleClearInterval();
    };
    const handleClearInterval = () => {
      clearInterval(timeout.value);
    };
    const startCountDown = () => {
      count.value = 7;
      text.value = "关闭";
      timeout.value = setInterval(() => {
        console.log("count", count.value);

        if (count.value > 0) {
          if (count.value <= 5) {
            text.value = `关闭 (${count.value})`;
          } else {
            text.value = "关闭";
          }
          count.value--;
        } else {
          showMessage.value = false;
          handleClearInterval();
        }
      }, 1000);
    };
    return {
      handleRepairBack,
      handleOrderBack,
      repairLabel,
      currentRepairOrder,
      handleCopyRepairId,
      stepList,
      handleCollapseChange,
      showCollapse,
      handleSubmitImage,
      showMessage,
      handlePushUser,
      timeout,
      handleCancelOrder,
      handleClearInterval,
      handleModalClose,
      count,
      startCountDown,
      text,
      handleAcceptOrder,
    };
  },
  onLoad(options) {
    console.log(
      "repairDetail options --->",
      JSON.parse(decodeURIComponent(options?.repairOrder))
    );
    const data = JSON.parse(decodeURIComponent(options?.repairOrder));
    let newData = {};
    if (data.repairEquipmentContent) {
      newData = {
        ...data,
        repairEquipmentContent: JSON.parse(data.repairEquipmentContent),
        repairImg: JSON.parse(data.repairImg),
      };
    }
    console.log("repairDetail newData", newData);
    if (newData.orderFlowList) {
      const tempList: Array<object> = [];
      newData.orderFlowList.map((item: any) => {
        tempList.push({
          title: item.desc,
          desc: item.time || "N/A",
        });
      });
      stepList.value = tempList;
    }
    currentRepairOrder.value = newData;
  },
  beforeUnmount() {
    this.handleClearInterval();
  },
});
</script>

<style lang="scss">
@mixin flex($direction: row) {
  display: flex;
  flex-direction: $direction;
}
@mixin box() {
  width: 100%;
  border-radius: 20rpx;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}
.repairDetail {
  .box {
    width: 100vw;
    padding: 40rpx;
    box-sizing: border-box;
    border-radius: 15rpx;
    &-title {
      @include flex(column);
      flex-direction: column;
      height: 150rpx;
      justify-content: space-around;
      h1 {
        font-size: $uni-font-size-xxl;
      }
      h2 {
        font-size: $uni-font-size-lg;
      }
    }
    &-notice {
      width: 100%;
      height: 200rpx;
      @include flex;
      align-items: center;
      &-image {
        width: 130rpx;
        height: 130rpx;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 130rpx;
          height: 130rpx;
        }
      }
      &-content {
        flex: 1;
        // height: 130rpx;
        background-color: #ffffff;
        margin-left: 20rpx;
        border-radius: 30rpx;
        padding: 10rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
        span {
          margin-left: 20rpx;
          width: 100%;
          letter-spacing: 2rpx;
          font-size: $uni-font-size-base;
          color: $uni-text-color;
        }
      }
    }
    &-orderId {
      @include box;
      @include flex(row);
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 30rpx;
      &-content {
        letter-spacing: 2rpx;
        font-size: $uni-font-size-base;
        color: $uni-text-color;
        width: 530rpx;
        white-space: nowrap; /* 禁止文本换行 */
        overflow: hidden; /* 隐藏溢出内容 */
        text-overflow: ellipsis; /* 使用省略号表示溢出内容 */
      }
    }
    &-order {
      width: 100%;
      @include flex(column);
      border-radius: 20rpx;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      margin-top: 35rpx;
      background-color: #ffffff;
      display: flex;
      &-title {
        font-size: $uni-font-size-base;
        color: $uni-text-color;
        padding: 30rpx 0 20rpx 30rpx;
      }
      &-steps {
        width: 625rpx;
        overflow: auto;
        margin: 20rpx auto 0 auto;
        -webkit-overflow-scrolling: touch; /* 在 iOS 上启用惯性滚动 */
        &-item {
          width: 1000rpx;
          height: 140rpx;
        }
      }
    }
    &-option {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      width: 100%;
      height: 140rpx;
      background-color: #ffffff;
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 20rpx;
      box-sizing: border-box;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        // width: 200rpx;
        padding: 0 20rpx;
        height: 70rpx;
        margin-left: 20rpx;
        border-radius: 50rpx;
        background-color: $uni-color-primary;
        color: #ffffff;
      }
    }
    .message {
      width: 600rpx;
      position: relative;
      padding-bottom: 100rpx;
      &-title {
        display: block;
        text-align: center;
        box-sizing: border-box;
        padding: 20rpx;
        font-size: $uni-font-size-xl;
        color: $uni-color-primary;
        font-weight: 600;
      }
      &-content {
        width: 100%;
        padding: 40rpx;
        box-sizing: border-box;
        &-text {
          padding: 20rpx 20rpx 0 20rpx;
          box-sizing: border-box;
          &::before {
            content: "*";
            color: red;
          }
        }
      }
      &-button {
        width: 100%;
        display: flex;
        flex-direction: row;
        position: absolute;
        bottom: 0;
        button {
          font-size: $uni-font-size-lg;
          width: 50%;
        }
      }
    }
    .block {
      display: inline-block;
      width: 100%;
      height: 130rpx;
    }
  }
}
.box-order-steps::-webkit-scrollbar {
  width: 200rpx; /* 滚动条的宽度 */
}
</style>
