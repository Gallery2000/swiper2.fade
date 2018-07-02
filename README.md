# swiper2.fade.plugin
基于swiper2实现的fade切换插件<br>
开发背景：
因为swiper3并不兼容IE8，而swiper2能够兼容IE8，但是在swiper2下，当时我并没有找到有实现fade效果的插件，因此，就自己动手造了一个，使用非常简单：
```javascript
var mySwiper = new Swiper('.swiper-container',{   
    fade: true,
});
```
也可以配合animate插件一起使用，可以看我的案例展示
```javascript
var mySwiper = new Swiper('.swiper-container',{   
    fade: true,
    // loop: true,
    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素 
        swiperAnimate(swiper); //初始化完成开始动画
    }, 
    onSlideChangeEnd: function(swiper){ 
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    }
});  
```

# swiper2.animate.plugin

为了简化使用animate的配置。。我将其代码直接移入到插件里面。。
代码来源于swiper.animate : http://www.swiper.com.cn/usage/animate/


```javascript
var mySwiper = new Swiper('.swiper-container',{   
    fade: true,
    // loop: true,
    animate:true, // 修改于swiper.animate插件，因此不支持loop模式
}); 
```