import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<any>()

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  {
    // // 网页端持久化配置，小程序端不能这样配置
    // persist: true,

    // 小程序端配置持久化
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          // 设置数据
          uni.setStorageSync(key, value) // [!code warning]
          // uni.setStorageSync: 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。
          // 区别：异步不会阻塞当前任务，同步缓存直到同步方法处理完才能继续往下执行。异步就是不管保没保存成功,
          // 程序都会继续往下执行.同步是等保存成功了,才会执行下面的代码.使用异步,性能会更好;而使用同步,数据会更安全。
        },
        getItem(key) {
          // 获取数据
          return uni.getStorageSync(key) // [!code warning]
        },
      },
    },
  },
)
