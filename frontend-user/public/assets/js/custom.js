lucide.createIcons();
// document.addEventListener('click', function (e) {
//     const button = document.querySelector('.header-container .header .button');
//     const toggle = button.querySelector('.usermenu-toggle');
//     const menu = button.querySelector('.usermenu-toggle-content');

//     if (toggle.contains(e.target)) {
//         // Toggle active class
//         button.classList.toggle('active');
//     } else if (!menu.contains(e.target)) {
//         // Clicked outside -> close the menu
//         button.classList.remove('active');
//     }
// });
jQuery(".carousel-single").owlCarousel({
    loop: true,

    lazyLoad: true,
    nav: true,
    pagination: false,
    autoplay: false,
    margin: 18,
    navText: ["<img src='images/arrow-left.png' width='16' height='16' alt='left'>", "<img src='images/arrow-right.png' width='16' height='16' alt='right'>"],
    autoPlayHoverPause: false,
    responsive: {
        0: {
            items: 1,
            nav: true,
        },
        600: {
            items: 1,
            nav: true,
        },
        1000: {
            items: 1,
            nav: true,
        }
    }
});


$(document).ready(function () {
    // Show first tab content by default
    $('.booking-fields').hide();
    $('#flynow').show().addClass('active');

    // Handle tab click
    $('.booking-tabs a').click(function (e) {
        e.preventDefault();

        // Remove active state from tabs
        $('.booking-tabs a').removeClass('active');
        $(this).addClass('active');

        // Hide all content
        $('.booking-fields').removeClass('active').hide();

        // Show clicked tab content
        let tabId = $(this).text().toLowerCase().replace(/\s+/g, '');
        $('#' + tabId).fadeIn().addClass('active');
    });
});


$(document).ready(function () {
    $(".accordion-faq").first().children(".faq-content").show();
    $(".accordion-faq").first().find("img").removeClass("arrow-up");
    $(".accordion-faq").click(function () {
        //alert("1");
        $(".accordion-faq").removeClass("active");
        $(".accordion-faq").children(".faq-content").hide();
        $(".accordion-faq").children().children("img").addClass("arrow-up");

        $(this).addClass("active");
        $(this).children(".faq-content").show();
        $(this).children().children("img").removeClass("arrow-up");
    });
});