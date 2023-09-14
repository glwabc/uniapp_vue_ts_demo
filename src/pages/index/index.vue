<template>
  <!--
    swiper
    滑块视图容器。
    一般用于左右滑动或上下滑动，比如banner轮播图。
    注意滑动切换和滚动的区别，滑动切换是一屏一屏的切换。swiper下的每个swiper-item是一个滑动切换区域，不能停留在2个滑动区域之间。
    属性名	                  类型	    默认值	              说明	
    indicator-dots	        Boolean	    false	            是否显示面板指示点 
    indicator-color	        Color	      rgba(0, 0, 0, .3)	指示点颜色 
    indicator-active-color	Color	      #000000	          当前选中的指示点颜色
    circular	              Boolean	    false	            是否采用衔接滑动，即播放到末尾后重新回到开头
    autoplay	              Boolean	    false	            是否自动切换
    :autoplay="false"数据绑定 没有:则解析成字符串

    swiper-item
    仅可放置在 <swiper> 组件中，宽高自动设置为100%。注意：宽高100%是相对于其父组件，不是相对于子组件，不能被子组件自动撑开。
   -->
  <swiper class="banner" indicator-dots circular :autoplay="false">
    <swiper-item v-for="item in pictures" :key="item.id">
      <!-- 
        @tap 绑定一个点击事件 可以通过()进行传参
        @ 事件绑定 : 属性绑定
       -->
      <image @tap="onPreviewImage(item.url)" :src="item.url"></image>
    </swiper-item>
  </swiper>

  <uni-card cover="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png">
    <text>这是一个带封面和操作栏的卡片示例，此示例展示了封面插槽和操作栏插槽的用法。</text>
    <template v-slot:actions>
      <view class="card-actions">
        <view class="card-actions-item" @click="actionsClick('分享')">
          <uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
          <text class="card-actions-item-text">分享</text>
        </view>
        <view class="card-actions-item" @click="actionsClick('点赞')">
          <uni-icons type="heart" size="18" color="#999"></uni-icons>
          <text class="card-actions-item-text">点赞</text>
        </view>
        <view class="card-actions-item" @click="actionsClick('评论')">
          <uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
          <text class="card-actions-item-text">评论</text>
        </view>
      </view>
    </template>
  </uni-card>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      // 微信小程序不支持相对路径（真机不支持，开发工具支持）
      // 自定义组件里面使用 <image>时，若 src 使用相对路径可能出现路径查找失败的情况，故建议使用绝对路径。
      pictures: [
        {
          id: '1',
          // url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_1.jpg',
          url: '../../static/images/swiper-imgages/goods_preview_1.jpg',
        },
        {
          id: '2',
          url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_2.jpg',
          // url: '../../static/images/swiper-imgages/goods_preview_2.jpg',
        },
        {
          id: '3',
          // url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_3.jpg',
          url: '../../static/images/swiper-imgages/goods_preview_3.jpg',
        },
        {
          id: '4',
          // url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_4.jpg',
          url: '../../static/images/swiper-imgages/goods_preview_4.jpg',
        },
        {
          id: '5',
          url: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/uploads/goods_preview_5.jpg',
          // url: '../../static/images/swiper-imgages/goods_preview_5.jpg',
        },
      ],
    }
  },
  onLoad() {},
  methods: {
    onPreviewImage(url) {
      console.log(url)

      // 大图预览
      // map()方法遍历数组，返回处理后的新数组
      // map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
      // map() 方法按照原始数组元素顺序依次处理元素。
      // 注意： map() 不会对空数组进行检测。
      // 注意： map() 不会改变原始数组。
      // 也就是对一个数组进行一定的处理并返回处理的结果。
      // 写不写return 都会返回一个数组，需要一个值来接收这个数组。
      // 某种程度上和foreach差不多，但是foreach不会返回。
      uni.previewImage({
        // 预览图片api
        // current 为当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张。
        // 必填。不填会报错
        current: url,
        // 需要预览的图片链接列表，必填
        urls: this.pictures.map((v) => v.url),
      })
    },
  },
}
</script>

<style>
/* 
设置轮播图以及图片的宽高 
rpx： 是微信小程序独有的，解决屏幕自适应的尺寸单位 
可以根据屏幕宽度进行自适应，不论屏幕大小，规定屏幕宽为 750rpx，
通过rpx设置元素和字体大小，小程序在不同尺寸的屏幕上可以自适应适配
*/
.banner,
.banner image {
  width: 750rpx;
  height: 750rpx;
}
</style>
