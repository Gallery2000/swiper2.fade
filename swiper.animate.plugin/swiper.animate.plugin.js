//本插件由www.swiper.com.cn提供
//版本1.03
Swiper.prototype.plugins.animate = function(swiper,params) {
    var activedDOM = null;
    function swiperAnimateCache(swiper)
    {
        for (j = 0; j < swiper.slides.length; j++)
        {
            var allBoxes = swiper.slides[j].querySelectorAll(".ani")
            for (i = 0; i < allBoxes.length; i++)
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
    function swiperAnimate(swiper)
    {
        clearSwiperAnimate(swiper);
        var anis = swiper.slides[swiper.activeIndex].querySelectorAll(".ani");
        for (i = 0; i < anis.length; i++)
        {
            anis[i].style.visibility = "visible";
            effect = "";
            if (anis[i].attributes["swiper-animate-effect"]) {
                effect = anis[i].attributes["swiper-animate-effect"].value;
            }
            anis[i].className = anis[i].className + "  " + effect + " " + "animated";
            style = anis[i].attributes["style"].value;
            duration = "";
            if (anis[i].attributes["swiper-animate-duration"]) {
                duration = anis[i].attributes["swiper-animate-duration"].value;
            }
            if (duration) {
                style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";";
            }
            delay = anis[i].attributes["swiper-animate-delay"] ? anis[i].attributes["swiper-animate-delay"].value : "";
            if (delay) {
                style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";";
            }
            anis[i].setAttribute("style", style);
        }
    }
    function clearSwiperAnimate(swiper)
    {
        for (j = 0; j < swiper.slides.length; j++)
        {
            var allBoxes = swiper.slides[j].querySelectorAll(".ani");
            for (i = 0; i < allBoxes.length; i++)
            {
                if (allBoxes[i].attributes["swiper-animate-style-cache"]) {
                    var value = allBoxes[i].attributes["swiper-animate-style-cache"].value;
                    allBoxes[i].setAttribute("style",value);
                    allBoxes[i].style.visibility = "hidden";
                    allBoxes[i].className = allBoxes[i].className.replace("animated", " ");
                    if (allBoxes[i].attributes["swiper-animate-effect"]) {
                        effect = allBoxes[i].attributes["swiper-animate-effect"].value;
                        allBoxes[i].className = allBoxes[i].className.replace(effect, " ")
                    }
                }
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

