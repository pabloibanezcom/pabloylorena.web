import { Injectable } from '@angular/core';

declare var jQuery: any;
declare var isMobile: any;

@Injectable()
export class TemplateService {

  constructor() { }

  init() {
    /* ======= Scrollspy ======= */
    jQuery('body').scrollspy({ target: '#header', offset: 100 });

    /* ======= ScrollTo ======= */
    jQuery('a.scrollto').on('click', function (e) {

      // store hash
      const target = this.hash;

      e.preventDefault();

      jQuery('body').scrollTo(target, 800, { offset: -55, 'axis': 'y' });
      // Collapse mobile menu after clicking
      if (jQuery('.navbar-collapse').hasClass('in')) {
        jQuery('.navbar-collapse').removeClass('in').addClass('collapse');
      }

    });

    /* ======= jQuery Placeholder ======= */
    /* Ref: https://github.com/mathiasbynens/jquery-placeholder */

    jQuery('input, textarea').placeholder();

    // /* ======= Countdown ========= */
    // // set the date we're counting down to
    // const target_date = new Date('July 16, 2018').getTime();

    // // variables for time units
    // let days, hours, minutes, seconds;

    // // get tag element
    // const countdown = document.getElementById('countdown-box');
    // const days_span = document.createElement('SPAN');
    // days_span.className = 'days';
    // countdown.appendChild(days_span);
    // const hours_span = document.createElement('SPAN');
    // hours_span.className = 'hours';
    // countdown.appendChild(hours_span);
    // const minutes_span = document.createElement('SPAN');
    // minutes_span.className = 'minutes';
    // countdown.appendChild(minutes_span);
    // const secs_span = document.createElement('SPAN');
    // secs_span.className = 'secs';
    // countdown.appendChild(secs_span);

    // // update the tag with id "countdown" every 1 second
    // setInterval(function () {

    //   // find the amount of "seconds" between now and target
    //   const current_date = new Date().getTime();
    //   let seconds_left = (target_date - current_date) / 1000;

    //   // do some time calculations
    //   days = Math.floor(seconds_left / 86400);
    //   seconds_left = seconds_left % 86400;

    //   hours = Math.floor(seconds_left / 3600);
    //   seconds_left = seconds_left % 3600;

    //   minutes = Math.floor(seconds_left / 60);
    //   // seconds = Math.floor(seconds_left % 60);

    //   // format countdown string + set tag value.
    //   days_span.innerHTML = '<span class="number">' + days + '</span>' + '<span class="unit script">Days</span>';
    //   hours_span.innerHTML = '<span class="number">' + hours + '</span>' + '<span class="unit script">Hrs</span>';
    //   minutes_span.innerHTML = '<span class="number">' + minutes + '</span>' + '<span class="unit script">Mins</span>';
    //   secs_span.innerHTML = '<span class="number">' + seconds + '</span>' + '<span class="unit script">Secs</span>';


    //   // countdown.innerHTML = days + "d, " + hours + "h, "
    //   // + minutes + "m, " + seconds + "s";

    // }, 1000);


    // /* ======= Google Map ======= */
    // map = new GMaps({
    //   div: '#map',
    //   lat: 50.980187,
    //   lng: -3.179117,
    //   scrollwheel: false,
    //   zoom: 14,
    // });

    // });

    // /*display marker 1 address on load */
    // google.maps.event.trigger(map.markers[0], 'click');
    // /*display marker 2 address on load */
    // google.maps.event.trigger(map.markers[1], 'click');



    /* ======= RSVP Form (Dependent form field) ============ */
    jQuery('#cguests').on('change', function () {

      if (jQuery(this).val() === '') {
        jQuery('.guestinfo-group').slideUp(); // hide
        console.log('not selected');
      } else if (jQuery(this).val() === 'No Guests') {
        jQuery('.guestinfo-group').slideUp(); // hide
        console.log('No guests');
        jQuery('#cguestinfo').val('No Guests'); // Pass data to the field so mailer.php can send the form.

      } else {
        jQuery('.guestinfo-group').slideDown(); // show
        jQuery('#cguestinfo').val(''); // Clear data
        console.log('Has guests');
      }


    });

    /* ======= jQuery form validator ======= */
    /* Ref: http://jqueryvalidation.org/documentation/ */
    jQuery('.rsvp-form').validate({
      messages: {
        name: {
          required: 'Please enter your full name' // You can customise this message
        },
        email: {
          required: 'Please enter your email' // You can customise this message
        },
        events: {
          required: 'Are you attending?' // You can customise this message
        },
        guests: {
          required: 'How many guests?' // You can customise this message
        },
        guestinfo: {
          required: 'Please provide name(s)' // You can customise this message
        },
      }
    });
  }

  animations() {
    if (isMobile.any === false) {

      /* Animate elements in #hero */
      jQuery('#hero .statement').css('opacity', 0).one('inview', function (isInView) {
        if (isInView) { jQuery(this).addClass('animated bounceIn delayp4'); }
      });

      /* Animate elements in #wedding */
      jQuery('#wedding .title-text').css('opacity', 0).one('inview', function (event, isInView) {
        if (isInView) { jQuery(this).addClass('animated fadeInUp delayp2'); }
      });

      /* Animate elements in #story */
      jQuery('#story .title-text').css('opacity', 0).one('inview', function (event, isInView) {
        if (isInView) { jQuery(this).addClass('animated fadeInUp delayp2'); }
      });

      /* Animate elements in #gallery */
      jQuery('#gallery .title-text').css('opacity', 0).one('inview', function (event, isInView) {
        if (isInView) { jQuery(this).addClass('animated fadeInUp delayp2'); }
      });

      /* Animate elements in #gallery */
      jQuery('#gift .title-text').css('opacity', 0).one('inview', function (event, isInView) {
        if (isInView) { jQuery(this).addClass('animated fadeInUp delayp2'); }
      });

      /* Animate elements in #gallery */
      jQuery('#gift .couple-profile').css('opacity', 0).one('inview', function (event, isInView) {
        if (isInView) { jQuery(this).addClass('animated bounceIn delayp3'); }
      });

    }
  }

}
