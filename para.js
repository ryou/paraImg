;(function($, win, doc){

  $.fn.paraImg = function(options) {

    //------------------------------------------------------------------------
    // 共通初期化処理開始
    //------------------------------------------------------------------------
    var $paraWrapper = $(this).eq(0);
    var $paraImg = $paraWrapper.find('.paraBg');
    var $win = $(win);

    var defaults = {
      imgOrgSize: false
    };
    var setting = $.extend(defaults, options);
    //------------------------------------------------------------------------
    // 共通初期化処理終了
    //------------------------------------------------------------------------

    var winInfo = {
      h: false,
      w: false,
      t: false,
      b: false
    };
    var imgSize = {
      w: false,
      h: false
    };
    // 0~1は画面内
    var progress;
    var wrapperInfo = {
      h: false,
      t: false,
      b: false
    };

    function updateImgSize() {
      var zoomRatio = winInfo.w / setting.imgOrgSize.w;

      imgSize = {
        w: setting.imgOrgSize.w * zoomRatio,
        h: setting.imgOrgSize.h * zoomRatio
      };
    }
    function updateWinInfo() {
      winInfo.h = $win.height();
      winInfo.w = $win.width();
      winInfo.t = $win.scrollTop();
      winInfo.b = winInfo.t + winInfo.h;
    }
    function updateWrapperInfo() {
      wrapperInfo.h = $paraWrapper.outerHeight();
      wrapperInfo.t = $paraWrapper.offset().top;
      wrapperInfo.b = wrapperInfo.t + wrapperInfo.h;
    }
    function updateParallax() {
      var past = winInfo.b - wrapperInfo.t;
      progress = past / (wrapperInfo.h + winInfo.h);

      if (progress < 0 || progress > 1) {
        return;
      }

      var totalMove = imgSize.h - wrapperInfo.h;
      var newPos = totalMove * progress;
      $paraImg.css('transform', 'translateY(-' + newPos + 'px)');
    }
    function init() {
      updateWinInfo();
      updateImgSize();
      updateWrapperInfo();
      updateParallax();
    }

    $win.on('resize', function() {
      init();
    });
    init();

    $win.on('scroll', function() {
      updateWinInfo();
      updateParallax();
    });

    return this;
  };
})(jQuery, window, document);
