// Smooth Scrolling
$('.navbar a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );
    var navHeight = 76;

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top - navHeight
        }, 1000);
    }
});

// Close responsive menu when scroll trigger is clicked
$('.navbar a[href^="#"]').click(() => {
    $('.navbar-collapse').collapse('hide');
})

// Copyright Year
$(function() {
    var cYear = new Date().getFullYear();
    $('#year').html(cYear);
});

// EmailJS
function sendMail() {
    var cName = document.getElementById('contact-name');
    var cEmail = document.getElementById('contact-email');
    var cMessage = document.getElementById('contact-message');
    var cStatus = document.getElementById('contact-status');

    if (cName.value != '' && cEmail.value != '' && cMessage.value != '') {
        // Send data via EmailJS
        emailjs.send('gmail', 'ritech',
        {
            "to_email": "ri.tech94@gmail.com",
            "from_email": "no-reply@alorthotics.ca",
            "contact_email": cEmail.value,
            "contact_name": cName.value,
            "contact_phone": "No Data",
            "contact_msg": cMessage.value
        });

        // Clear Form Fields
        cName.value = '';
        cEmail.value = '';
        cMessage.value = '';

        // Display Sent Message
        cStatus.innerHTML = 'Message Sent!';
    } else {
        cStatus.innerHTML = 'Please fill the missing fields!';
    }
}

/* Image Slider JS*/
// Call & init
$(document).ready(function() {
    $('.ba-slider').each(function() {
        var cur = $(this);
        // Adjust the slider
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
        // Bind dragging events
        drags(cur.find('.handle'), cur.find('.resize'), cur);
    });;
});

// Update sliders on resize.
$(window).resize(function() {
    $('.ba-slider').each(function() {
        var cur = $(this);
        var width = cur.width() + 'px';
        cur.find('.resize img').css('width', width);
    });
});

function drags (dragElement, resizeElement, container) {
    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function(e) {
        dragElement.addClass('draggable');
        resizeElement.addClass('resizable');

        // Check if it's a mouse or touch event and pass along the correct value
        var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

        // Get the initial position
        var dragWidth = dragElement.outerWidth(),
            posX = dragElement.offset().left + dragWidth - startX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth();

        // Set limits
        minLeft = containerOffset + 10;
        maxLeft = containerOffset + containerWidth - dragWidth - 10;

        // Calculate the dragging distance on mousemove/
        dragElement.parents().on('mousemove touchmove', function(e) {
            // Check if it's a mouse or touch event and pass along the correct value
            var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

            leftValue = moveX + posX - dragWidth;

            // Prevent going off limits
            if (leftValue < minLeft) {
                leftValue = minLeft;
            } else if (leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            // Translate the handle's left value to masked divs width.
            widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

            // Set the new values for the slider and the handle.
            // Bind mouseup events to stop dragging.
            $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function() {
                $(this).removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            $('.resizable').css('width', widthValue);
        }).on('mouseup touchend touchcancel', function() {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        e.preventDefault();
    }).on('mouseup touchend touchcancel'), function(e) {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    };
}