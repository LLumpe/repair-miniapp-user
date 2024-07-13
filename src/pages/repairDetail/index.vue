<template>
  <view class="repairDetail">
    <view class="box">
      <view class="box-title" v-if="String(pageIndex) === '2'">
        <h1>进行中</h1>
        <h2>订单正在进行中，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="String(pageIndex) === '3'">
        <h1>等待用户确认</h1>
        <h2>订单正在等待用户确认，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="String(pageIndex) === '4'">
        <h1>已完成</h1>
        <h2>订单已经完成，祝您生活愉快~</h2>
      </view>
      <view class="box-title" v-if="String(pageIndex) === '4-4'">
        <h1>已退单</h1>
        <h2>订单已经退单，祝您生活愉快~</h2>
      </view>
      <view class="box-notice">
        <view class="box-notice-image">
          <image src="@/static/images/repairDetail/repairWorker.svg" />
        </view>
        <view class="box-notice-content">
          <span v-if="String(pageIndex) === '2'">
            HI!~订单正在进行中，待设备维修完毕后请上传维修图片和备注!
          </span>
          <span v-if="String(pageIndex) === '3'">
            HI!~订单正在等待用户确认哦，请维修师傅耐心等待!
          </span>
          <span v-if="String(pageIndex) === '4'">
            HI!~订单已经由用户确认完成了哦，感谢您对该订单的维修支持!
          </span>
          <span v-if="String(pageIndex) === '4-4'">
            HI!~订单已经由用户退单了哦，感谢您对该订单的维修支持!
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
        <UCollapse @change="handleCollapseChange">
          <UCollapseItem title="订单信息" show-arrow="true">
            <view class="box-order-steps">
              <USteps :options="stepList" :active="3" active-color="#09C46E" />
            </view>
            <RepairOrderDetailInfo :orderDetail="text_data" />
          </UCollapseItem>
        </UCollapse>
      </view>
      <view class="box-order" v-if="String(pageIndex) !== '2'">
        <UCollapse @change="handleCollapseChange">
          <UCollapseItem title="维修师傅上传图片" />
        </UCollapse>
      </view>
      <view class="box-option">
        <view
          class="box-option-item"
          v-if="String(pageIndex) === '4' || String(pageIndex) === '4-4'"
        >
          删除订单
        </view>
        <view class="box-option-item" v-if="String(pageIndex) === '4-4'">
          查看历史订单
        </view>
        <!-- <view
          class="box-option-item"
          v-if="String(pageIndex) === '2'"
          @click="handleSubmitImage"
          >确认订单</view
        > -->
        <view class="box-option-item" @click="handleSubmitImage">
          确认订单
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
              尊敬的维修师傅，您好！在完成维修工作后，请您遵循以下须知内容，以确保顺利交付和客户满意：
            </view>
            <view class="message-content-text">
              请现场测试维修后的设备或系统，确保其正常运转，确保维修项目按照要求完成，无遗漏或质量问题。
            </view>
            <view class="message-content-text">
              请清理维修现场，确保工作区域干净整洁,将拆卸的零件、工具和垃圾妥善处理。
            </view>
            <view class="message-content-text">
              与客户核对维修费用明细，确保客户对费用无异议,根据公司的结算方式，完成费用收取或确认。
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
import { ref, Ref, reactive, defineComponent } from "vue";
import USteps from "@/components/USteps/index.vue";
import RepairOrderDetailInfo from "./components/repairOrderDetailInfo/index.vue";
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
//维修进度状态
const stepList = [
  {
    title: "待接单",
  },
  {
    title: "进行中",
  },
  {
    title: "待确认",
  },
  {
    title: "已完成",
  },
  {
    title: "已退单",
  },
];
const text_data = reactive({
  address: "软件园3号楼405",
  cancelAt: null,
  cancelNumber: 0,
  checkAt: "2024-06-24 17:22:19",
  city: "天津市",
  confirmAt: null,
  createdAt: "2024-06-24 17:04:58",
  creatorType: 1,
  distance: null,
  district: "西青区",
  endAt: null,
  expectDate: "2024-06-26",
  expectVolunteerId: null,
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
  id: 1,
  latitude: 0,
  longitude: 0,
  name: "赵肖云",
  orderColumn: null,
  orderType: 1,
  orderWay: null,
  phone: "15192043237",
  province: "天津市",
  receiveAt: null,
  repairEquipmentContent: [
    {
      equipmentName: "冰箱",
      repairDesc:
        "这个冰箱的门坏了，他打不开了，我自己修了半天都没修好，能帮我看看怎么办吗能帮我看看怎么办吗？",
      equipmentImg: [
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALkAxgMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAAAwECBAUHBv/EAEQQAAEDAQQGBgcFBwIHAAAAAAEAAgMRBBITMQUhIjJBcRQzUVJh0QZCYoGRlKEjU2RysRU0Y5PB4fAWJAdDgoOEksL/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwDjM3ByVZtxRi3Nm7lqQXYuzkgScitMXVhLwa+spxMPZuoLy9WVmGQTsTE2bqjBp6yC0O4rP3DyVA7C2c0Yt/Zu56kCeITrPuHmowfayUh2Ds58UDVkTsavqqMD2s0BZ/WTu1KH2PjVGP7OaBJTLPvnkpwa+spDcHaz4IGjgsr98803G9nJRhX9q9nrQVg31obwSbuFtZoxqeqgpL1hRF1gV8PE2ryMPD2r2SBx4rPPvq2NX1UXcXayQJQnGD2kIFv3zzVoN9OY1t0bIyVZqBhoAEDG8Fml6wqpOtaI6FoqAUCYusC0niqSUDTQALODrQXn31Vm+OadDQsFQCrPa26dkZcEFjxSLRvjkl1dq2k6DWzaodaBIWvsUXW90LLed3j8UDbR6qUmwbV69r560263uj4IJSrRuDmlFzu8firwa3m9U6uJQL4laWbg5KbrdWysznOvHaOfAoHTbiQcirw1L9ZJ5lPA1IIi6sIl6spEhIcaEjkURklwqSeZQVGQT4dxXI1JE1Q/USORQaAhZC53ePvUINAka3Z2tWpQ4iXZH1Sn755q0G+gMF5zu+Cu17WbJvVGaa3gs0vWFAxz2v2ReqclTBeMrvioi6wLSeKBTSItk/RSZGu2drXqS5ztqse1I0Cta8Agvgurw1KzThbLuepbY7Da5D9nZZ3fljKudAaZmcMPR1oIpm5lP1QYDK095UwXeyu1D6H6beQTZGs/NI0foujH6F6UIF+Sys5yE/8Ayg+Wb9lvcexSZm+0vrj6AzvpiW+Fv5YyVoi/4fwDXLpGU+DYwEHw2E491SBhbTuWpejRehWjGjaktMnN4H6BaG+iGhRS9ZHPp3pXeaDzLGbTjqVDG5xvVArrXrUXo7oaPq9G2eo4ube/VbI7DZI+rskDPyxhB45HE9pq1peexoJK2RWK3SUuaPtTuURXrzRQUFKdgClB5M30Y01O68zR8zQe+QFqh9DdNE1dZ4m85AvUAjw7UHmNo9F9K2cAvgaeykgXNtOhdINeXOsjwPDX+i9V0uOoHsk/FcwtqqPMHWaRpo4UPY6qF6XJZ2S0vsa6naAVCg+ai9CtKuG2yzMPG9If6BaWegdrO9bLNGfZDneS9AoiiD4eP0C+80o+vG5F/dbIvQTRzestFpkPiWj+i+rIRRB89H6G6GZnA9/5pSP0WuL0b0PHu2CM/mcXfqushUY49FaPj3LDZm+IiC0tiZGKRta0djQAroQRRFFKEAAiiEIBCEIBCEIBCFIQCApVgEFVUjUT2a0wqpUGTSgvTNHY0Bc8soujpD95f7v0WIqhN1CYUIjsoQoKipUFQUKiaKChCAQitF89afScwTyQt0PpKQscW3mw6jTVq8EH0KF81/qe2OBEfo9pE17zSP6LsaKtk1usxltFilsb7xGHKdfNBtQhCAQhCAQhAQClCAglXaqBMCggqA2rhzVihm8OaDDbz/upOaxFa7d+8y/mWMqohCEIOyoKupCKUUJqkIEgKaHgmqQgTRyA1ychAq65FxyaiqgVcci45MLkXlQu47sqi47somXkXkCwxysGOVrw4ovDggrcPFWDEX6KRIoJDFa6qYiL44oLFqq0UeFJc1QCLwog51v/AHub8yxuWy3fvUv5ljcqioUqAhB0DO5BnckdMYco3fFHS2/dn4opxmcoxn8DRK6U37v6o6QOEf1QNxpO8jGk7yV0j+H9UG0fw/qgYZpD6yMSTvJXSP4f1R0j+H9UDC+TvIvyd4+5L6R/DQbR/DHvqgZefxc5FXd5yV0g8GNHxR0h3db9UDau7XFFXdrgldId3WoNod3WoHC93j70bXbVI6Q7saFItDvZQPN5SLyzm0P4XVHSJPZQa9pSAeKx9Jk9n4I6TIBWrR7kG0K4yKxY0paCHgV9lAml4yDLg1Ay19e9ZXJ73XwHdo7Uh6IqhCEGfpLq/utp/kOU9KPGzWof9h3kttrt1ms8L5ft5A3NsUYc73BYWekWi3wQ2i/aA2WtKwmtQciK6kVYWv8AD2r+Q7yR0v8AD2n+Q7yVv27osRNlM0xY510fZE0KiLTuipS8tnkJay84GI1p4KiDa/w9q91nd5KOl/h7X8s/yV49PaKkkEbbS687UAYiAVDtPaKaS19rcC00NYnakFel/h7X8s/yR0v8Pa/ln+SdLpnRcTwH2wh1AR9i7L4LLJ6UaCidck0jQ59Q/wAkDOl/h7X8s/yR0scbPa/ln+SV/qvQB1ftIe+CTyWmHTWiZ4MeO3sfFWl4McKH4IE9NaP+Rahzs0nkjpzfubV8vJ5LRHpTRkhIbb4nENLqXT5KHaV0Q2oOkIW0zqD5IEdOZxhtXy0nko6dH9zavlZPJapdIaLjP2ukIG17SUR2/RcoJZpCAhue12oMvTo/ubV8rJ5I6dH9zavlZPJajpLQ+Z0nZh27avJa9Gx0v6SszfzSBQYunR/c2r5WTyQbdH9zavlZPJaJNJ6HjpiaYsLK5Xpmiqp+1tCHLTejz/5DfNAnp0f3Nq+Vk8kdOj+6tQ5WWTyWgaU0MdY01o6gz/3LfNPNosTYsYW6GVhywXhxd4alQixzsmY6jJxdNayQvYPiQnVbXOq5r9ISG0NkpRjcoxkBx963VGbTUHWD2qB7KEEBVOs1Sw66ajNNIqARkURQiilSoQeeN05pC6KzAnxaFLdJunBZazHQ62vDcnePgclxH755q0G+orq2bSd6Q2aQMEDzQPprDuDiri29DtBAjikI1OJP0XPbwWaXrCg7NqtDLKWzRhkrTtMBd/n+BTNahPAbZRor1jK5O/uuLF1gWk8UHVjtn7RhAETWSxCl2ubP7f1WY2qyBpxLG2RwzcXZrlz76qzfHNWjp9OsF3Xo6v8A1LXY9IWIsfZ22fBE1BWuR4Fcs8Ui073uUHcjnisNpa+eNxc2pa3sP+V+qi0vgkJtDG/YyVfTw4rgue+RzXOeXGlKuNTq4LcJXtjMQcbhNaUGpWjqutdltlla2BhD4BkRSrf8Ciw2qx2Ocula1zzQGlcv8ouLjPgljliIBFcxVZ5H4srpHEFzjlklHdnbCyQueRgkhwI4t4FaZ7RZLVZmizCpgGtvG7qp8NQXHM8jrO2HNjcqjXRKx5IJGSROoRqyrXUlHUZFo1wPTGtMlcr12iuIdB/dt/mhfPue57i52Z15UWhm4OSUdoWfQbh1Y90oWmzvsUEeHZrTNEytbrZAvmp9xZzkUo+xxIiKC32sV9ppWmzWtsDSDaJpq5YhGrlRfHRdWFMnVlQfaftHXx9yfZdLYUgvNLmHeFF521xFKEjkVpge+5qe4ciUHq0T4rS3Es8jHtPjrHNQvL2zTN3ZH/8AsQhUZsK/tXs9eSLuFtVr4ZJjNwclWfcUFcanqU96MO/tXvdRJORWmLqwgph3Nq9lwojGr6lfery9WVmGQQOu4u1WnhmjCubV7LXkrQbis/cPJAvH9nPxRTG2suHalcQnWfcPNBGDT1vojH9nLxTlkQN672ae9GB7WXgiz+sndqBONT1fqiuNs5ce1KKZZ988kE4HtZ+CMW5s3ctWacOCyv3zzQMvYuzSnjmjBr69fcqwb60N4IE4lzZu5caoxL+zd99VSXrCiLrAgvg09enuRewtmlfHJOPFZ599BbH9n6oSUILP33c1aHfCnDc7avDXr1qQ0xbRIPJA0ZLO/fKYZqKtwv2gQK9qCrN8LQckm4WbRINOxWE1UFJt8qrN9vNMLTLtAgc1GG5u1eGrXqQPPFJtGp45KcZvdzUEYu02g4a0CwtSRhOHrBWxm90oIn1XUpNP227qp2qMF3eagclz6me9GK0eq5QTi7LajjrQKOZWlu43klYLu9mrYjW7N06tWpBM24kHNOvCXZAI5quDVAxm6EP3Sq3wzZIJp2Ivh+yARXtQJGafDuKmDRWvCLZIJ5IGhCVjN7p96EF2bg5Ks24rM3ByVZtxAg5FaYurCzHIrTF1YQEvVlZhkFpl6srMMggfDuKz9w8lWHcVn7h5IM3EJ1n3DzSeITrPuHmgasi1rIgbZ/WTu1Js/rJ3agyFMs++eSWUyz755IHjgsr9881qHBZX755oLQb60N4LPBvrQ3ggzS9YURdYES9YURdYEGk8Vnn31oPFZ599AtCEIP/Z",
        "https://luxushopping.oss-us-west-1.aliyuncs.com/69b78b545920754ec46e9f14363536fb/c0aaf648-025a-49d5-a739-e9ec4bec54f3.jpg",
      ],
    },
    {
      equipmentName: "冰箱",
      repairDesc: "打不开门了",
      equipmentImg: [
        "https://luxushopping.oss-us-west-1.aliyuncs.com/69b78b545920754ec46e9f14363536fb/c0aaf648-025a-49d5-a739-e9ec4bec54f3.jpg",
      ],
    },
  ],
  repairEquipmentNumber: 1,
  startAt: null,
  state: 0,
  updatedAt: "2024-06-29 21:59:46",
  userId: 15,
  volunteerId: null,
});
//显示确认须知
const showMessage = ref(false);
//定时关闭
let timeout = ref<number | null>(null);
//设置关闭秒数
const count = ref<number>(7);
//显示关闭
const text = ref<string>("取消");
//维修标签状态
const repairLabel = {
  "2": "订单进行中",
  "3": "订单待确认",
  "4": "订单已完成",
  "4-4": "订单已退单",
};

export default defineComponent({
  name: "RepairDetail",
  components: {
    USteps,
    RepairOrderDetailInfo,
    UCollapse,
    UPopup,
    UCollapseItem,
  },
  props: {
    pageIndex: {
      type: Number,
      default: 4,
    },
    repairOrderId: {
      type: Number,
      default: null,
    },
  },
  setup() {
    const handleCopyRepairId = () => {
      showToast("复制成功", "success");
    };
    //折叠面板折叠
    const handleCollapseChange = (value: any) => {
      console.log("value", value);
    };
    //上传维修图片
    const handleSubmitImage = () => {
      startCountDown();
      showMessage.value = true;
      // navigateTo("/pages/uploadRepairImage/index", { id: text_data.id });
    };
    //取消
    const handleCancelOrder = () => {
      showMessage.value = false;
      handleClearInterval();
    };
    //确认
    const handleAcceptOrder = () => {
      showMessage.value = false;
      handleClearInterval();
      navigateTo("/pages/uploadRepairImage/index", { id: text_data.id });
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
      repairLabel,
      handleCopyRepairId,
      stepList,
      text_data,
      handleCollapseChange,
      handleSubmitImage,
      showMessage,
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
    // min-height: 100vh;
    padding: 30rpx;
    box-sizing: border-box;
    &-title {
      @include flex(column);
      flex-direction: column;
      height: 120rpx;
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
        height: 130rpx;
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
      // height: 600rpx;
      @include flex(column);
      // align-items: center;
      border-radius: 20rpx;
      box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
      margin-top: 35rpx;
      background-color: #ffffff;
      display: flex;
      &-steps {
        // background-color: aqua;
        padding: 20rpx;
        box-sizing: border-box;
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
  }
}
</style>
