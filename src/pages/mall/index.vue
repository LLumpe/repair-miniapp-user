<template>
  <view class="Mall">
    <view class="Mall-box">
      <image src="@/static/images/mall/expecting.png" mode="aspectFill"></image>
      <title>商城功能敬请期待...</title>
      <svg></svg>
    </view>
  </view>
</template>
<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
export default defineComponent({
  name: "Mall",
  components: {},
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>
<style lang="scss">
.Mall {
  width: 100%;
  &-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    image {
      height: 600rpx;
      object-fit: fit;
      border-radius: 15rpx;
      border: 1rpx solid gainsboro;
    }
    title {
      margin-top: 50rpx;
      color: $uni-color-primary;
      font-size: $uni-font-size-xxl;
      font-weight: 700;
    }
  }
}
</style>
