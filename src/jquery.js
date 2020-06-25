
    $('input[type="text"]').focus(function () {
        $(this).addClass("focus");
      });
  
      $('input[type="text"]').blur(function () {
        $(this).removeClass("focus");
      });
      $(document).ready(function () {
        $('.carousel').carousel();
  
  
        setInterval(function () {
          $('.carousel').carousel('next');
        }, 2000);
        $('.modal').modal();
  
  
        $('.modal').closeModal();
      });
      $(document).ready(function () {
        $('.slider').slider({
          full_width: true,
          height: 600, // default - height : 400
  
        });
  
  
        setInterval(function () {
          $('.slider').slider('next');
        }, 8080);
      });
  