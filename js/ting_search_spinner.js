(function($) {
  Drupal.behaviors.tingSearchSpinner = {
    attach: function(context) {
      
      $('body').append('<div class="ting-search-spinner-placeholder-overlay"><div class="ting-search-spinner-placeholder-wrapper"><img src="' + Drupal.settings.spinner.path + '/img/spinner_squares_circle.gif" alt="Loading" /><p class="close-ting-search-spinner">' + Drupal.settings.spinner.stop_string + '</p></div></div>');
      $('.ting-search-spinner-placeholder-overlay').hide();
      $('#search-block-form').submit( function(event, killPageLoad) {
        if (killPageLoad==true) {
          if (navigator.appName == 'Microsoft Internet Explorer') {
            document.execCommand('Stop');
          } 
          else {
            window.stop();
          }
          return false;
        }
        $('.ting-search-spinner-placeholder-overlay').show();
        disable_scroll();
        return true;
      });  

      // left: 37, up: 38, right: 39, down: 40,
      // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
      var keys = [37, 38, 39, 40];

      function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
          e.preventDefault();
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
        enable_scroll();
        $('#search-block-form').trigger('submit', [true]);
      });
      
      // Cancel search hen ESC is pressed.
      $(document).keyup(function(e) {
        if (e.keyCode == 27) { 
          $('.ting-search-spinner-placeholder-overlay').hide();
          enable_scroll();
          $('#search-block-form').trigger('submit', [true]);  
        }  
      });
    }
  }
})(jQuery);
