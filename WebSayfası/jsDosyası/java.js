// Navbar scroll efekti
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-inverse');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});
$(function(){
    var str = '#len'; //increment by 1 up to 1-nelemnts
    $(document).ready(function(){
      var i, stop;
      i = 1;
      stop = 4; //num elements
      setInterval(function(){
        if (i > stop){
          return;
        }
        $('#len'+(i++)).toggleClass('bounce');
      }, 500)
    });
  });