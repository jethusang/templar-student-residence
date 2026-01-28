(function ($) {
  "use strict";
  
  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0}, 1500, 'easeInOutExpo');
    return false;
  });
  
  var nav = $('nav');
  var navHeight = nav.outerHeight();

  /*--/ ScrollReveal /--*/
  if (typeof ScrollReveal !== 'undefined') {
    window.sr = ScrollReveal();
    sr.reveal('.foo', { duration: 1000, delay: 15 });
  }

  /*--/ Carousel owl /--*/
  if ($.fn.owlCarousel) {
    if ($('#carousel').length) {
      $('#carousel').owlCarousel({
        loop: true,
        margin: -1,
        items: 1,
        nav: true,
        navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
      });
    }

    if ($('#property-carousel').length) {
      $('#property-carousel').owlCarousel({
        loop: true,
        margin: 30,
        responsive: {
          0: { items: 1 },
          769: { items: 2 },
          992: { items: 3 }
        }
      });
    }

    if ($('#testimonial-carousel').length) {
      $('#testimonial-carousel').owlCarousel({
        margin: 0,
        autoplay: true,
        nav: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeInUp',
        navText: ['<i class="ion-ios-arrow-back" aria-hidden="true"></i>', '<i class="ion-ios-arrow-forward" aria-hidden="true"></i>'],
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: { 0: { items: 1 } }
      });
    }
  }

  /*--/ Navbar Collapse /--*/
  $('.navbar-toggle-box-collapse').on('click', function () {
    $('body').removeClass('box-collapse-closed').addClass('box-collapse-open');
  });
  
  $('.close-box-collapse, .click-closed').on('click', function () {
    $('body').removeClass('box-collapse-open').addClass('box-collapse-closed');
  });

  $(window).bind('scroll', function () {
    var pixels = 50;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-default').addClass('navbar-reduce').removeClass('navbar-trans');
    } else {
      $('.navbar-default').addClass('navbar-trans').removeClass('navbar-reduce');
    }
  });

  /*--/ CONSOLIDATED FAQ FUNCTIONALITY /--*/
  function initializeFAQAccordion() {
    // 1. Initial State: Open first item
    if ($('#collapse1').length) {
      $('#collapse1').collapse('show');
    }
    
    // 2. Category Filtering
    $('.btn-category').on('click', function(e) {
      e.preventDefault();
      $('.btn-category').removeClass('active');
      $(this).addClass('active');
      
      var category = $(this).data('category');
      $('.collapse').collapse('hide');

      if (category === 'all') {
        $('.faq-item, .faq-category-title').fadeIn(300);
      } else {
        $('.faq-item, .faq-category-title').hide();
        $('.faq-item[data-category="' + category + '"]').fadeIn(300);
        $('.faq-category-title#' + category).fadeIn(300);
      }
      $('#faqSearch').val(''); // Clear search when filtering by category
    });
    
    // 3. Search Functionality
    $('#faqSearch').on('keyup', function() {
      var searchText = $(this).val().toLowerCase().trim();
      
      if (searchText.length > 2) {
        $('.btn-category').removeClass('active');
        $('.btn-category[data-category="all"]').addClass('active');
        
        $('.faq-item').each(function() {
          var question = $(this).find('.faq-question button').text().toLowerCase();
          var answer = $(this).find('.faq-answer').text().toLowerCase();
          
          if (question.indexOf(searchText) !== -1 || answer.indexOf(searchText) !== -1) {
            $(this).fadeIn(300);
          } else {
            $(this).hide();
          }
        });
        $('.faq-category-title').hide();
      } else if (searchText.length === 0) {
        $('.btn-category[data-category="all"]').trigger('click');
      }
    });
    
    // 4. Smooth Scroll on Open
    $('#faqAccordion').on('shown.bs.collapse', function (e) {
      var $panel = $(e.target).prev('.faq-question');
      if ($panel.length) {
        $('html, body').animate({
          scrollTop: $panel.offset().top - 100
        }, 300);
      }
    });

    // 5. Accessibility: Update button states
    $('.collapse').on('show.bs.collapse', function() {
        var buttonId = $(this).attr('aria-labelledby');
        $('#' + buttonId + ' button').removeClass('collapsed').attr('aria-expanded', 'true');
    }).on('hide.bs.collapse', function() {
        var buttonId = $(this).attr('aria-labelledby');
        $('#' + buttonId + ' button').addClass('collapsed').attr('aria-expanded', 'false');
    });
  }

  /*--/ Counter Animation /--*/
  function animateCounter(element) {
    var $this = $(element);
    if ($this.hasClass('counted')) return;
    
    var countTo = parseFloat($this.attr('data-to'));
    var speed = parseInt($this.attr('data-speed')) || 1500;
    
    $this.addClass('counted');
    $({ countNum: 0 }).animate({ countNum: countTo }, {
        duration: speed,
        step: function (now) {
          $this.text(Math.floor(now) + ($this.text().includes('%') ? '%' : ''));
        },
        complete: function () {
          $this.text(countTo + ($this.text().includes('%') ? '%' : ''));
        }
    });
  }

  function checkCounters() {
    $('.count-number').each(function () {
      var rect = this.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        animateCounter(this);
      }
    });
  }

  /*--/ Initialization /--*/
  $(document).ready(function() {
    if ($('#faqAccordion').length) {
      initializeFAQAccordion();
    }
    checkCounters();
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]:not([href="#"])').on('click', function() {
      var target = $(this.hash);
      if (target.length) {
        $('html, body').animate({ scrollTop: target.offset().top - 70 }, 1000, 'easeInOutExpo');
        return false;
      }
    });
  });

  $(window).on('scroll resize', checkCounters);

})(jQuery);