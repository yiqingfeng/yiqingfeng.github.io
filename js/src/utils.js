NexT.utils=NexT.$u={wrapImageWithFancyBox:function(){$(".content img").not("[hidden]").not(".group-picture img, .post-gallery img").each(function(){var e,t=$(this),i=t.attr("title"),n=t.parent("a");n.size()<1&&(e=t.attr("data-original")?this.getAttribute("data-original"):this.getAttribute("src"),n=t.wrap('<a href="'+e+'"></a>').parent("a")),n.addClass("fancybox fancybox.image"),n.attr("rel","group"),i&&(n.append('<p class="image-caption">'+i+"</p>"),n.attr("title",i))}),$(".fancybox").fancybox({helpers:{overlay:{locked:!1}}})},lazyLoadPostsImages:function(){$("#posts").find("img").lazyload({effect:"fadeIn",threshold:0})},registerTabsTag:function(){var t=".tabs ul.nav-tabs ";$(function(){$(window).bind("hashchange",function(){var e=location.hash;""!==e&&($(t+'li:has(a[href="'+e+'"])').addClass("active").siblings().removeClass("active"),$(e).addClass("active").siblings().removeClass("active"))}).trigger("hashchange")}),$(t+".tab").on("click",function(e){var t;e.preventDefault(),$(this).hasClass("active")||($(this).addClass("active").siblings().removeClass("active"),t=$(this).find("a").attr("href"),$(t).addClass("active").siblings().removeClass("active"),""!==location.hash&&history.pushState("",document.title,window.location.pathname+window.location.search))})},registerESCKeyEvent:function(){$(document).on("keyup",function(e){27===e.which&&$(".search-popup").is(":visible")&&($(".search-popup").hide(),$(".search-popup-overlay").remove(),$("body").css("overflow",""))})},registerBackToTop:function(){var n=$(".back-to-top");$(window).on("scroll",function(){n.toggleClass("back-to-top-on",50<window.pageYOffset);var e=$(window).scrollTop()/NexT.utils.getContentVisibilityHeight(),t=Math.round(100*e),i=100<t?100:t;$("#scrollpercent>span").html(i)}),n.on("click",function(){$("body").velocity("scroll")})},embeddedVideoTransformer:function(){var e=$("iframe"),o=new RegExp(["www.youtube.com","player.vimeo.com","player.youku.com","music.163.com","www.tudou.com"].join("|"));function r(e){return{width:e.width(),height:e.height()}}function c(e,t){return t/e*100}e.each(function(){var e,t,i,n=this,s=$(this),a=r(s);0<this.src.search(o)&&(t=c(a.width,a.height),s.width("100%").height("100%").css({position:"absolute",top:"0",left:"0"}),(i=document.createElement("div")).className="fluid-vids",i.style.position="relative",i.style.marginBottom="20px",i.style.width="100%",i.style.paddingTop=t+"%",""===i.style.paddingTop&&(i.style.paddingTop="50%"),n.parentNode.insertBefore(i,n),i.appendChild(n),0<this.src.search("music.163.com")&&((e=r(s)).width>a.width||e.height<a.height)&&(i.style.paddingTop=c(e.width,a.height)+"%"))})},addActiveClassToMenuItem:function(){var e="/"===(e=window.location.pathname)?e:e.substring(0,e.length-1);$('.menu-item a[href^="'+e+'"]:first').parent().addClass("menu-item-active")},hasMobileUA:function(){var e=window.navigator.userAgent;return/iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g.test(e)},isTablet:function(){return window.screen.width<992&&767<window.screen.width&&this.hasMobileUA()},isMobile:function(){return window.screen.width<767&&this.hasMobileUA()},isDesktop:function(){return!this.isTablet()&&!this.isMobile()},escapeSelector:function(e){return e.replace(/[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g,"\\$&")},displaySidebar:function(){!this.isDesktop()||this.isPisces()||this.isGemini()||$(".sidebar-toggle").trigger("click")},isMist:function(){return"Mist"===CONFIG.scheme},isPisces:function(){return"Pisces"===CONFIG.scheme},isGemini:function(){return"Gemini"===CONFIG.scheme},getScrollbarWidth:function(){var e=$("<div />").addClass("scrollbar-measure").prependTo("body"),t=e[0],i=t.offsetWidth-t.clientWidth;return e.remove(),i},getContentVisibilityHeight:function(){var e=$("#content").height(),t=$(window).height();return t<e?e-t:$(document).height()-t},getSidebarb2tHeight:function(){return CONFIG.sidebar.b2t?$(".back-to-top").height():0},getSidebarSchemePadding:function(){var e="block"==$(".sidebar-nav").css("display")?$(".sidebar-nav").outerHeight(!0):0,t=$(".sidebar-inner"),i=t.innerWidth()-t.width();return this.isPisces()||this.isGemini()?2*i+e+2*CONFIG.sidebar.offset+this.getSidebarb2tHeight():2*i+e/2}},$(document).ready(function(){function i(e){e=e||"auto",$(".site-overview, .post-toc").css("max-height",e)}!function(){var e;$(window).on("resize",function(){e&&clearTimeout(e),e=setTimeout(function(){i(document.body.clientHeight-NexT.utils.getSidebarSchemePadding())},0)});var t=NexT.utils.getScrollbarWidth();$(".site-overview-wrap").height()>document.body.clientHeight-NexT.utils.getSidebarSchemePadding()&&$(".site-overview").css("width","calc(100% + "+t+"px)");$(".post-toc-wrap").height()>document.body.clientHeight-NexT.utils.getSidebarSchemePadding()&&$(".post-toc").css("width","calc(100% + "+t+"px)");i(document.body.clientHeight-NexT.utils.getSidebarSchemePadding())}()});