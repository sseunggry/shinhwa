/*!
 * Start Bootstrap - SB Admin v6.0.0 (https://startbootstrap.com/templates/sb-admin)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin/blob/master/LICENSE)
 */

/**
  노보 노디스크 공통
**/
$(window).on('resize', function(){
  var winW = $(window).innerWidth();
  if ( winW >= 1200 ) {
    if ( $('body').hasClass('sb-sidenav-toggled') ) {
      $("body").removeClass("sb-sidenav-toggled");
    }     
  } 
});

$(document).ready(function(){
  //nav active
  var path = window.location.href;
  var pathName = window.location.pathname;
  
  $("a.nav-link").each(function(){
    let $this = $(this);

    if (this.href === path) {
      $this.addClass('active');
      
      if ( $this.hasClass('active') ) { 
        navDep02_active();
      }
    }
  
    let navDep03_item = $this.data('dep03');
    let navDep03_item02 = $this.data('dep03-02');
    if ( pathName == navDep03_item || pathName == navDep03_item02 ) {
      $this.addClass('active');
      navDep02_active();
    }

    function navDep02_active() {      
      $this.parents('.collapse').prev().removeClass('collapsed').attr('aria-expanded', 'true');
      $this.parents('.collapse').addClass('show');
    }
  });

  //sidebar toggle
  $("#sidebarToggle").on("click", function(e){
    e.preventDefault();
    $("body").toggleClass("sb-sidenav-toggled");
  }); 

  //Daterangepicker [달력]_range version
  const openDate = '2021-07-01'; //서비스 오픈 날짜
  $('input[name="daterange"]').daterangepicker({
    startDate: openDate,
    minDate: openDate,
    endDate: false,
    locale: {
      format: 'YYYY-MM-DD',
      language: 'kr',
      separator: ' ~ ',
      applyLabel: '확인',
      cancelLabel: '닫기',
    },
    singleDatePicker: false,
    drops: 'auto',
  });
  $('button[name="datepickerAllBtn"]').click(function(){
    $(this).prev('input[name="daterange"').data('daterangepicker').setStartDate(openDate);
    $(this).prev('input[name="daterange"').data('daterangepicker').setEndDate(moment());
  });

  //Daterangepicker [달력]_single version
  var date = new Date();
  $('input[name="daterange02"]').daterangepicker({
    startDate: moment(date).add(0,'days'),
    endDate: false,
    locale: {
      format: 'YYYY-MM-DD',
      language: 'kr',
      separator: ' ~ ',
      applyLabel: '확인',
      cancelLabel: '닫기',
    },
    singleDatePicker: true,
    drops: 'auto',
  });

  //탭 
  var $tabNavi = $('.tabWrap').find('li > a');
  $tabNavi.each(function(){
    $(this).click(function(){
        $tabNavi.parent('li').removeClass('active');
        $(this).parent('li').addClass('active');
        var current = $(this).attr('href');
        $('.tab_cont').hide();
        $(current).show();
        
        return false;
    });        
  });    

  if ( $('#editor').length ) {
		new toastui.Editor({
			el: document.querySelector('#editor'),
			height: '450px',
			initialEditType: 'wysiwyg',
			autohide: false
		});
	}
});


//체크박스 전체선택 
$(document).ready(function(){
  let checkAll = $('.checkWrapper').find('.checkAll');
  let chkbox = $('.checkWrapper').find('.checkItem');  

  for (let x = 0; x < checkAll.length; x++){ //전체선택 시 
    checkAll[x].onclick = function(){
      let thisParent = $(this).parents('.checkWrapper');
      let childChkbox = thisParent.find('.checkItem'); 
      
      if (this.checked === false){
        for (let i = 0; i < childChkbox.length; i++){ 
            childChkbox[i].checked = false;
        }
      } else {
        for (let i = 0; i < childChkbox.length; i++){ 
            childChkbox[i].checked = true; 
        }
      }
    };
  }; 

  for (let x = 0; x < chkbox.length; x++){ //하나라도 언체크시 전체선택 해제
    chkbox[x].onclick = function(){
      let thisParent = $(this).parents('.checkWrapper'); 
      let thisChkAll = thisParent.find('.checkAll');

      if (this.checked === false){
          thisChkAll.not(this).prop('checked', false);
      }
    }; 
  };  
  
});

/**
레이어 팝업 
**/
//레이어 팝업 
function showPop(ele) {
  $('#' + ele).addClass('open');
  $('body, html').css('overflow', 'hidden');
  $('.sb-nav-fixed').append('<div class="mask"></div>');
  popupPosition();  
}
function hidePop() {
  $('.layerPopupWrap').removeClass('open');
  $('body, html').css('overflow', 'auto');
  $('.mask').remove();
}

//레이어 팝업 height가 window height보다 길어질 때, 포지션 설정
$(window).on('resize', function() {
  popupPosition();
});
function popupPosition() {
  let popup = $('.layerPopupWrap.open');
  let popup_height = $('.layerPopupWrap.open').find('.layerPopup_inner').height();
  let window_height = $(window).innerHeight();
  
  if ( window_height <= popup_height ) {
      popup.addClass('pos_fix');
  } else {
      popup.removeClass('pos_fix');
  }
}

// 토스트 팝업
$(document).on('click', '.btn_list_box > button', function() {
  $('.btn_list_box > .list_box').hide();
  $(this).next('.list_box').show();
});

$(document).on('click', 'body', function(e){
  if (!$(e.target).is('.btn_list_box > button') && !$(e.target).is('.btn_list_box > .list_box')) {
    $('.btn_list_box > .list_box').hide();
  }
});

function showToastPop(ele, text){
  $('.toastPop').hide().find('span').text('');
  $('#' + ele).finish().fadeIn(500).delay(3000).fadeOut(500);
  $('#' + ele).find('span.cont_name').append(text);

  return false;
}