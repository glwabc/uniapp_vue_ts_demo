<script setup lang="ts">
import { useMemberStore } from '@/stores'
import '@/utils/http'

const memberStore = useMemberStore()
// 测试请求
const getData = () => {
  uni.request({
    method: 'GET',
    url: '/home/banner',
  })
}
</script>

<template>
  <view class="my">
    <view>会员信息：{{ memberStore.profile }}</view>
    <button
      @tap="
        memberStore.setProfile({
          nickname: '黑马先锋',
          token: '12345678',
        })
      "
      size="mini"
      plain
      type="primary"
    >
      保存用户信息
    </button>
    <button @tap="memberStore.clearProfile()" size="mini" plain type="warn">清理用户信息</button>
  </view>
  <!-- 
    uniapp中的@tap和@click的区别
    在uniapp移动端开发中，两者都是点击时触发事件不同的是：
    1.click事件是PC端的常用的单击事件，但是当这个事件在移动端实现的时候，会出现延迟300ms的现象，
    所以移动端一般用tap来代替click。@click是组件被点击时触发，会有约300ms的延迟(内置处理优化了)。
    2.@tap是手指触摸离开时触发，没有300ms的延迟，减少click在移动端的延迟，提高了性能。
    3.编译到小程序端，@click会被转成@tap。 
  -->
</template>

<style lang="scss">
//
</style>
