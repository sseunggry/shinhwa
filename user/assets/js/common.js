/* common */
let scrolTop = "",
	windowW  = "",
	mainSwiper = "",
	serviceSwiper = "",
	resortSwiper = "",
	premiumSwiper = "",
	typeSwiper = "",
	timer = "";

var commonJs = {
	initPage:function(){
		this.loadFn();
		this.resizeFn();
		this.scrollFn();
	},

	/* 페이지 로드후 공통 이벤트 */
	loadFn:function(){
		scrolTop = $(window).scrollTop();
		windowW  = window.innerWidth;
		
		commonJs.clickDefaultFn();
		commonJs.scrollMotionFn();

		commonJs.loadPopupFn();
		commonJs.mainSlideFn();
		commonJs.serviceSlideFn();
	},

	/* 페이지 리사이즈 이벤트 */
	resizeFn:function(){
		$(window).resize(function(){
			windowW  = window.innerWidth;
		});
	},

	/* 페이지 스크롤 이벤트 */
	scrollFn:function(){
		$(window).scroll(function(){
			scrolTop = $(this).scrollTop();
			// console.log(scrolTop);
			
			commonJs.scrollMotionFn();
		});
	},

	/* 클릭 방지 이벤트 */
	clickDefaultFn:function(){
		$("a[href=\"#\"]").click(function(e) {
			e.preventDefault();
		});
	},

	loadPopupFn: function(){
		var popCookie = commonJs.getCookie("popCheck");
		if( popCookie != "Y" ) {
			$("#main_pop").removeClass("close_pop");
		}
	},

	// 팝업 닫기
	popupCloseFn:function(el){
		$(el).parents(".popup").hide();

		let chk = $("#today_check").prop("checked");
		if(chk) {
			commonJs.setCookie("popCheck", "Y");
		}
	},

	setCookie: function(name, value){
		var todayDate = new Date();
		todayDate.setHours( 24 );
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" +   todayDate.toGMTString() + ";";
	},

	getCookie: function(name){
		var Found = false;
		var start, end;
		var i = 0;
		
		while(i <= document.cookie.length) {
			start = i;
			end = start + name.length;
			
			if(document.cookie.substring(start, end) == name) {
			  Found = true;
			  break; 
			}
			i++;
		}
		
		if(Found == true) {
			start = end + 1;
			end = document.cookie.indexOf(";", start);
		  if(end < start)
				end = document.cookie.length;
			return document.cookie.substring(start, end);
		}
		return "";
	},

	// 메인 슬라이드
	mainSlideFn: function(){
		mainSwiper = new Swiper(".main-swiper", {
			scrollbar: {
				el: ".main-scrollbar",
				hide: false,
			},
		});
	},

	// 서비스 슬라이드
	serviceSlideFn: function(){
		serviceSwiper = new Swiper(".service-swiper", {
			pagination: {
				el: ".service-pagination"
			},
		});

		resortSwiper = new Swiper(".resort-swiper", {
			pagination: {
				el: ".resort-pagination"
			},
		});

		premiumSwiper = new Swiper(".premium-swiper", {
			pagination: {
				el: ".premium-pagination"
			},
		});

		typeSwiper = new Swiper(".type-swiper", {
			slidesPerView: "auto",
			centeredSlides: true,
			spaceBetween: 30,
			loop: true,
			// slideToClickedSlide: true,
			navigation: {
				nextEl: ".type-button-next",
				prevEl: ".type-button-prev",
			},
			on: {
				slideChange: function(){
					let type = $(".type_list .swiper-slide").eq(typeSwiper.realIndex).data("type");
					clearTimeout(timer);
					timer = setTimeout(function(){
						commonJs.vrView(type);
					}, 500);
				}
			}
		});
	},

	vrView: function(type){
		let src  = "",
			tit  = "",
			desc = "";

		switch (type) {
		case "ca":
			src  = "https://my.matterport.com/show/?m=wR2UNzgbsyo";
			tit  = "CA 타입 (46.5평-154m2)";
			desc = "천정고를 높게 설계 / 3-BAY 구조를 가지고있어 좋은 채광과 풍광 / 거실-주방까지 한 방향으로 되어 환기/통풍 용이 / 전침실에 붙박이장을 포함한 넉넉한수납\n 풀옵션  주방, 프리미엄 가구, 침구류까지 풀옵션 / 홈 네트워크 시스템";
			break;
		case "cb":
			src  = "https://my.matterport.com/show/?m=cwKnneGccFS";
			tit  = "CB 타입 (46.28평-153m2)";
			desc = "천정고를 높게 설계 / 3면에 설치된 베란다로 다양한 뷰확보 / 거실-주방까지 한 방향으로  되어 환기&통풍 용이";
			break;
		case "cc":
			src  = "https://my.matterport.com/show/?m=YeD9XwMcaGH";
			tit  = "CC 타입 (47.49평-157m2)";
			desc = "천정고를 높게 설계 / 세대별 독립엘리베이터 사용으로 프라이버시 보장 / 3면이 개방되어 다양한 뷰 확보 / ‘ㄷ";
			break;
		case "va":
			src  = "https://my.matterport.com/show/?m=XiRLESbndsd";
			tit  = "VA 타입 (68.97평-228m2)";
			desc = "남향 현관, 중문 설치로 프라이버시 확보 / 거실전면에 벽난로, 후면에 설치한 아트워크 / 식당과 주방을 오픈 시";
			break;
		case "vb":
			src  = "https://my.matterport.com/show/?m=Sw5AfExeBDv";
			tit  = "VB 타입 (78.65평-260m2)";
			desc = "남향 현관, 중문 설치로 프라이버시 확보 / 거실전면에 벽난로, 후면에 설치한 아트워크 / 식당과 바형 주방을 오";
			break;
		case "vd":
			src  = "https://my.matterport.com/show/?m=3ejR8NiDapv";
			tit  = "VD 타입 (126.14평-417m2)";
			desc = "출입구 복도를 중심으로 안락한 분위기를 연출한 2개의응접실 / 개수대와 조리대가 있는 오픈형 키친 / 1개의 메이";
			break;
		case "etc":
			src  = "https://my.matterport.com/show/?m=tSZ4zEpTfeC";
			tit  = "";
			desc = "";
			break;
		}

		$("#vr").attr("src", src);
		$("#vr_tit").text(tit);
		$("#vt_desc").text(desc);
	},
	
	//인터랙션
	scrollMotionFn: function(){
		let windowH = window.innerHeight;
		let objY, objH = 0;
		
		$(".motion").each(function(){
			objY = $(this).offset().top;
			objH = $(this).outerHeight();

			if(scrolTop > objY - windowH){
				$(this).addClass("onTrans");
				
				if(scrolTop > objY + objH){
					$(this).removeClass("onTrans");
				}
			} else {
				$(this).removeClass("onTrans");
			}
		});
	},

	// 게시판 오픈
	noticeOpenDetailFn:function(){
		$("body").addClass("popView");
		$("#notice_wrap").addClass("show");
		$("#notice_wrap .notice_list").stop().hide();
		$("#notice_wrap .detail").stop().fadeIn(200);

		$("#notice_wrap").scrollTop(0);
	},

	noticeOpenListFn:function(){
		$("body").addClass("popView");
		$("#notice_wrap").addClass("show");
		$("#notice_wrap .detail").stop().hide();
		$("#notice_wrap .notice_list").stop().fadeIn(200);
		
		$("#notice_wrap").scrollTop(0);
	},

	// 게시판 닫기
	noticeCloseFn:function(){
		$("#notice_wrap .notice_list").stop().fadeOut(200, function(){
			$("body").removeClass("popView");
			$("#notice_wrap").removeClass("show");
		});
		$("#notice_wrap .detail").stop().fadeOut(200, function(){
			$("body").removeClass("popView");
			$("#notice_wrap").removeClass("show");
		});
	},
	
};

$(function(){
	commonJs.initPage();
});