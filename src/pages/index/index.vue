<template>
  <view>
    <top />
    <view class="body">
      <announcement />
      <Publish style="margin-top: 64rpx" />
      <Mall style="margin-top: 64rpx" />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Top from "./components/Top/index.vue";
import Announcement from "./components/Announcement/index.vue";
import AllTasks from "./components/AllTasks/index.vue";
import Mall from "./components/Mall/index.vue";
import Publish from "./components/Publish/index.vue";
import LeaderBoard from "./components/Leaderboard/index.vue";
import Status from "./components/Status/index.vue";
import store from "@/store";
import { ActionTypes } from "@/enums/actionTypes";
import { navigateTo } from "@/utils/helper";

export default defineComponent({
  components: {
    Top,
    Announcement,
    Mall,
    Publish,
  },
});
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  height: 400upx;
}

.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}

.body {
  margin-top: 64rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-leaderBoard {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0 40rpx 0 40rpx;
    box-sizing: border-box;
    justify-content: space-between;
  }
}
</style>
