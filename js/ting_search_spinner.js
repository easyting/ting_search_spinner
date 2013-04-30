(function($) {
  // Variable holding the settings for the spinner.
  // To generate new spinner visit http://effinroot.eiremedia.netdna-cdn.com/repo/plugins/misc/spin.js/index.html
  var opts = {
    lines: 13, // The number of lines to draw.
    length: 20, // The length of each line.
    width: 10, // The line thickness.
    radius: 30, // The radius of the inner circle.
    corners: 1, // Corner roundness (0..1).
    rotate: 0, // The rotation offset.
    direction: 1, // 1: clockwise, -1: counterclockwise.
    color: '#000', // #rgb or #rrggbb.
    speed: 1, // Rounds per second.
    trail: 60, // Afterglow percentage.
    shadow: false, // Whether to render a shadow.
    hwaccel: false, // Whether to use hardware acceleration.
    className: 'overlay-spinner', // The CSS class to assign to the spinner.
    zIndex: 2e9 // The z-index (defaults to 2000000000).
  };

  Drupal.behaviors.tingSearchSpinner = {
    attach: function(context) {
      // Reposition elements on zoom-in or zoom-out.
      window.onresize = function() {
        // Checm if spinner is enabled.
        if ($('.overlay-spinner').length > 0) {
          $('div.ting-overlay-spinner-container').css("top", ($(window).height() - $('overlay-spinner').height()) / 2 + $(window).scrollTop() + "px");
          $('div.ting-overlay-spinner-container').css("left", ($(window).width() - $('overlay-spinner').width()) / 2 + $(window).scrollLeft() + "px");
          $('div.close-ting-search-spinner').css("top", ($(window).height() + 140) / 2 + $(window).scrollTop() + "px");
          $('div.close-ting-search-spinner').css("left", ($(window).width() - 60) / 2 + $(window).scrollLeft() + "px");
        }
      }
      // Append necessary html elements.
      $('body').once().append('<div class="ting-search-spinner-placeholder-overlay"></div><div class="ting-close-ting-search-spinner-container"></div><div class="close-ting-search-spinner">' + Drupal.t('Stop search') + '</div>');
      $('.ting-search-spinner-placeholder-overlay').once().hide();
      $('.close-ting-search-spinner').once().hide();
      $('#search-block-form').submit(function(event, killPageLoad) {
        if (killPageLoad == true) {
          if (navigator.appName == 'Microsoft Internet Explorer') {
            document.execCommand('Stop');
          } 
          else {
            window.stop();
          }
          return false;
        }
        // Start spinner.
        var spinner = new Spinner(opts).spin();
        // Position elements.
        $('div.ting-overlay-spinner-container').css("position", "absolute");
        $('div.ting-overlay-spinner-container').css("top", $(window).height() / 2 + $(window).scrollTop() + "px");
        $('div.ting-overlay-spinner-container').css("left", $(window).width() / 2 + $(window).scrollLeft() + "px");
        $('div.close-ting-search-spinner').css("top", ($(window).height() + 140) / 2 + $(window).scrollTop() + "px");
        $('div.close-ting-search-spinner').css("left", ($(window).width() - 65) / 2 + $(window).scrollLeft() + "px");
        // Disable writing on search field.
        $('.block-search-form form input[name="search_block_form"]').blur(); 
        // Show elements.
        $('.ting-search-spinner-placeholder-overlay').show();
        $('div.ting-overlay-spinner-container').append(spinner.el);
        $('.close-ting-search-spinner').show();
        disable_scroll();
        return true;
      });  
      // left: 37, up: 38, right: 39, down: 40,
      // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
      var keys = [37, 38, 39, 40];
      function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        }
        e.returnValue = false;  
      }
      function keydown(e) {
        for (var i = keys.length; i--;) {
          if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
          }
        }
      }
      function wheel(e) {
        preventDefault(e);
      }
      function disable_scroll() {
        if (window.addEventListener) {
          window.addEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = wheel;
        document.onkeydown = keydown;
      }
      function enable_scroll() {
        if (window.removeEventListener) {
          window.removeEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
      }
      // Cancel search when text is clicked.
      $('.close-ting-search-spinner').click(function () {
        $('.ting-search-spinner-placeholder-overlay').hide();
        $('.close-ting-search-spinner').hide();
        $('div.ting-overlay-spinner-container').replaceWith('<div class="ting-overlay-spinner-container"></div>');
        enable_scroll();
        $('#search-block-form').trigger('submit', [true]);  
      });
      // Cancel search hen ESC is pressed.
      $(document).keyup(function(e) {
        if (e.keyCode == 27) { 
          $('.ting-search-spinner-placeholder-overlay').hide();
          $('.close-ting-search-spinner').hide();
          $('div.ting-overlay-spinner-container').replaceWith('<div class="ting-overlay-spinner-container"></div>');
          enable_scroll();
          $('#search-block-form').trigger('submit', [true]);  
        }  
      });
    }
  }
})(jQuery);
