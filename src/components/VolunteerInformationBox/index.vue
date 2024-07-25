<template>
  <view class="information">
    <view class="userBox" @click="handleJump">
      <view
        class="avatar"
        :class="{ 'avatar--nologin': status === 'unlogin' || !avatarUrl }"
        :style="{
          backgroundImage:
            status !== 'unlogin' && avatarUrl ? `url(${avatarUrl})` : null,
        }"
      ></view>
      <view class="name">
        <span class="name-lg">
          {{ status !== "unlogin" ? name || "匿名用户" : "登录/注册" }}
        </span>
        <span class="name-ws">{{
          status !== "unlogin" ? phone || "去绑定手机号码" : "支持微信快速登录"
        }}</span>
      </view>
      <view class="more">
        <text class="iconfont icon-arrow-right" />
      </view>
    </view>
    <view class="box">
      <view class="title">
        <span class="title-name">我的维修订单</span>
        <view class="title-more" @click="handleMoreRepairOrder">
          查看更多订单
          <text class="iconfont icon-arrow-right" />
        </view>
      </view>
      <view class="list">
        <view
          class="list-box"
          v-for="item in orderList"
          :key="item.id"
          @click="handleNavigateToRepairList(item.id)"
        >
          <image :src="item.icon" class="list-box-image" />
          <view class="list-box-title">{{ item.title }}</view>
        </view>
      </view>
    </view>
    <view class="service">
      <view class="title">
        <span class="title-name">功能服务</span>
      </view>
      <view class="content">
        <view class="content-item" @click="handleEditAddress">
          <image src="@/static/images/user/address.png" />
          <span> 地址管理 </span>
        </view>
        <view class="content-item" @click="moreInfo('about_us')">
          <image src="@/static/images/user/about.png" />
          <span> 关于我们 </span>
        </view>
        <view class="content-item" @click="moreInfo('contact_us')">
          <image src="@/static/images/user/contact.png" />
          <span> 联系我们 </span>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import authService from "@/service/authService";
import dayjs from "@/utils/dayjs";
import { navigateTo, showToast } from "@/utils/helper";
import store from "@/store";

const useLogin = () => {
  const handleLogin = () => {
    authService.login(true);
  };
  const handleClickItem = (type: number) => {
    if (type === 1) {
    }
  };
  const handleEditAddress = () => {
    const logged = store.getters.logged;
    if (logged) {
      uni.navigateTo({
        url: "/pages/address/index",
      });
    } else {
      authService.login();
    }
  };
  const moreInfo = (sceneType: string) => {
    navigateTo("/pages/announcement/index", { sceneType: sceneType });
  };
  return { handleLogin, handleClickItem, handleEditAddress, moreInfo };
};
const orderList = [
  {
    id: 2,
    icon: "../../static/images/user/repairring.png",
    title: "待接单",
  },
  {
    id: 3,
    icon: "../../static/images/user/unconfirmed.png",
    title: "进行中",
  },
  {
    id: 5,
    icon: "../../static/images/user/done.png",
    title: "已完成",
  },
  {
    id: 6,
    icon: "../../static/images/user/cancel.png",
    title: "已售后",
  },
];
export default defineComponent({
  name: "VolunteerInformationBox",
  components: {},
  props: {
    status: {
      type: String as PropType<"unlogin" | "me" | "user">,
      default: "unlogin",
    },
    userInfo: {
      type: Object,
      default: undefined,
    },
    userRepairInfo: {
      type: Object,
      default: undefined,
    },
  },
  setup(props) {
    console.log("props", props.status, props.userInfo);

    const name = computed(() => {
      return props?.userInfo?.name;
    });

    const sex = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.volunteerInformation?.sex
        : props?.userInfo?.sex;
    });
    const registerTimeFromNow = computed(() => {
      const time =
        props.status === "me"
          ? props?.userInfo?.volunteerInformation?.registerTime
          : props?.userInfo?.registerTime;

      return dayjs(time).fromNow(true);
    });

    const avatarUrl = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.avatarUrl
        : props?.userInfo?.volunteer?.avatarUrl;
    });

    const phone = computed(() => {
      return props.status === "me"
        ? props?.userInfo?.phone
        : props?.userInfo?.volunteer?.phone;
    });

    const handleEditProfile = () => {
      const logged = store.getters.logged;
      if (logged) {
        navigateTo("/pages/editProfile/index");
      } else {
        authService.login();
      }
    };

    const handleJump = () => {
      console.log("正在登录");
      if (props.status === "unlogin") {
        authService.login(true);
      } else {
        navigateTo("/pages/editProfile/index");
      }
    };
    const handleClickPhone = () => {
      uni.makePhoneCall({
        phoneNumber: phone.value,
      });
    };
    //跳转至订单详情页面
    const handleNavigateToRepairList = (index: number) => {
      console.log("pageId", index);
      //如果未登录，则跳转登录
      if (props.status === "unlogin") {
        authService.login(true);
      } else {
        navigateTo("/pages/repairList/index", { pageIndex: index });
      }
    };
    //查看更多订单
    const handleMoreRepairOrder = () => {
      //如果未登录，则跳转登录
      if (props.status === "unlogin") {
        authService.login(true);
      } else {
        navigateTo("/pages/repairList/index", { pageIndex: 0 });
      }
    };
    return {
      ...useLogin(),
      name,
      sex,
      registerTimeFromNow,
      avatarUrl,
      phone,
      handleEditProfile,
      handleJump,
      handleClickPhone,
      orderList,
      handleNavigateToRepairList,
      handleMoreRepairOrder,
    };
  },
});
</script>

<style lang="scss" scoped>
.tag {
  border-radius: 16rpx;
  font-size: 16rpx;
  font-weight: $uni-font-weight-base;
  line-height: 32rpx;
  padding: 0 16rpx;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  &--nologin {
    background: #d0d0d0;
  }

  &--time {
    background: #f6eec9;
  }
}

.userBox {
  display: flex;
  height: 100rpx;
  box-sizing: border-box;
  margin: 0 auto 40rpx auto;
  width: 672rpx;
  align-items: center;
  position: relative;
  .avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 100%;
    background-size: cover;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
  .avatar--nologin {
    background-color: #dadada;
    background-image: url("../../static/images/icon/user.png");
  }
  .name {
    display: flex;
    flex-direction: column;
    margin-left: 20rpx;
    font-weight: $uni-font-weight-bold;
    line-height: 44rpx;
    transition: 1s all;
    &-lg {
      color: #ffffff;
      font-size: $uni-font-size-lg;
      letter-spacing: 1rpx;
    }
    &-ws {
      color: #ebebeb;
      font-size: $uni-font-size-xs;
      letter-spacing: 0.5rpx;
    }
  }
  .more {
    color: #ebebeb;
    position: absolute;
    right: 0rpx;
  }
  &:active {
    border-radius: 10rpx;
    background-color: rgba(85, 85, 85, 0.3); /* 半透明蓝色 */
  }
}
.box {
  margin: 0 auto 20rpx auto;
  width: 700rpx;
  height: 250rpx;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    height: 50rpx;
    display: flex;
    box-sizing: border-box;
    padding: 20rpx;
    margin-top: 10rpx;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.5rpx;
    &-name {
      font-size: $uni-font-size-base;
    }
    &-more {
      display: flex;
      align-items: center;
      font-size: $uni-font-size-xs;
      color: #979797;
    }
  }
  .list {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 20rpx;
    width: 100%;
    flex: 1;
    justify-content: center;
    .list-box {
      width: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-image {
        width: 70rpx;
        height: 70rpx;
      }
      &-title {
        margin-top: 20rpx;
        font-size: $uni-font-size-sm;
        color: #979797;
      }
    }
  }
  .divider {
    width: 416rpx;
    height: 2rpx;
    background-color: #979797;
    margin: 20rpx 0;
  }
}
.service {
  margin: 0 auto 20rpx auto;
  width: 700rpx;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    height: 50rpx;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 20rpx;
    margin-top: 10rpx;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 0.5rpx;
    &-name {
      font-size: $uni-font-size-base;
    }
    &-more {
      display: flex;
      align-items: center;
      font-size: $uni-font-size-xs;
      color: #979797;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    place-items: center;
    overflow: hidden;
    padding: 10rpx 0;
    &-item {
      width: 130rpx;
      height: 130rpx;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      border-radius: 15rpx;
      transition: all 0.2s;
      &:active {
        box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
          rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
      }
      image {
        width: 60rpx;
        height: 60rpx;
      }
      span {
        margin-top: 10rpx;
        font-size: $uni-font-size-sm;
        color: $uni-text-color;
      }
    }
  }
}
</style>
