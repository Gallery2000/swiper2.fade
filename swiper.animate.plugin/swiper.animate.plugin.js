//本插件由www.swiper.com.cn提供
//版本1.03
Swiper.prototype.plugins.animate = function(swiper,params) {
    var activedDOM = null;
    function swiperAnimateCache(a)
    {
        for (j = 0; j < a.slides.length; j++)
        {
            for (allBoxes = a.slides[j].querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++)
            {
                if (allBoxes[i].attributes["style"]) {
                    allBoxes[i].setAttribute("swiper-animate-style-cache", allBoxes[i].attributes["style"].value)
                } else {
                    allBoxes[i].setAttribute("swiper-animate-style-cache", " ");
                    allBoxes[i].style.visibility = "hidden";
                }
            }
        }
    }
    function swiperAnimate(a)
    {
        clearSwiperAnimate(a);
        var b = a.slides[a.activeIndex].querySelectorAll(".ani");
        for (i = 0; i < b.length; i++)
        {
            b[i].style.visibility = "visible";
            effect = "";
            if (b[i].attributes["swiper-animate-effect"]) {
                effect = b[i].attributes["swiper-animate-effect"].value;
            }
            b[i].className = b[i].className + "  " + effect + " " + "animated";
            style = b[i].attributes["style"].value;
            duration = "";
            if (b[i].attributes["swiper-animate-duration"]) {
                duration = b[i].attributes["swiper-animate-duration"].value;
            }
            if (duration) {
                style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";";
            }
            delay = b[i].attributes["swiper-animate-delay"] ? b[i].attributes["swiper-animate-delay"].value : "";
            if (delay) {
                style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";";
            }
            b[i].setAttribute("style", style);
        }
    }
    function clearSwiperAnimate(a)
    {
        for (j = 0; j < a.slides.length; j++)
        {
            for (allBoxes = a.slides[j].querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++)
            {
                allBoxes[i].attributes["swiper-animate-style-cache"] && allBoxes[i].setAttribute("style", 
                allBoxes[i].attributes["swiper-animate-style-cache"].value), allBoxes[i].style.visibility = "hidden", 
                allBoxes[i].className = allBoxes[i].className.replace("animated", " "), allBoxes[i].attributes["swiper-animate-effect"] && (effect = allBoxes[i].attributes["swiper-animate-effect"].value, 
                allBoxes[i].className = allBoxes[i].className.replace(effect, " "));
            }
        }
    }

    var hooks = {
        onFirstInit: function(){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
            activedDOM = swiper.activeSlide();
        }, 
        onSlideChangeStart: function(){ 
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            activedDOM = swiper.activeSlide();
        }
    }

    return hooks;
}

