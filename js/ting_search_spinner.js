(function($) {
  Drupal.behaviors.tingSearchAutocomplete = {
    attach: function(context) {
      
      $('body').append('<div class="ting-search-spinner-placeholder-overlay"><div class="ting-search-spinner-placeholder-wrapper"><img src="'+Drupal.settings.spinner.path+'/img/spinner_squares_circle.gif" alt="Loading" /><p class="close-ting-search-spinner">Stop search</p></div></div>');
      $('.ting-search-spinner-placeholder-overlay').hide();
      $('#search-block-form').submit(function(event, killPageLoad) {
        if(killPageLoad==true){
          if (navigator.appName == 'Microsoft Internet Explorer') {
            document.execCommand('Stop');
          } 
          else {
            window.stop();
          }
          return false;
        }
        $('.ting-search-spinner-placeholder-overlay').show();
        return true;
      });  

      // Cancel search when text is clicked.
      $('.close-ting-search-spinner').click(function () {
        $('.ting-search-spinner-placeholder-overlay').hide();
        $('#search-block-form').trigger('submit', [true]);
      });
      
      // Cancel search hen ESC is pressed.
      $(document).keyup(function(e) {
        if (e.keyCode == 27) { 
          $('.ting-search-spinner-placeholder-overlay').hide();
          $('#search-block-form').trigger('submit', [true]);  
        }  
      });
    }
  }
 } ($));