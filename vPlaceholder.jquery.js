/*
 *  vPlaceholder - HTML5 input/textarea placeholder trick.
 *  Copyright (C) 2011  Vladimir Tsvang
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see http://www.gnu.org/licenses/.
 */

(function($, undefined) {

  $.fn.vPlaceholder = function() {
    if(! ('placeholder' in document.createElement('input'))) {
      $(this).each(function(index, element) {
        var $element = $(element);
        
        $('form:has(input.placeholdered)')
          .submit(function(Event) {
            $(this)
            .find('.placeholdered')
            .each(function(index, element) {
              $(element).val('');
            });
          });
        
        if($element.is('input[type=text]') | $element.is('textarea')) {
            //IF HTML5 PLACEHOLDERS NOT SUPPORTED NATIVELY
            if($element.attr('placeholder') !== undefined) {
              $element
                .focusin(function(Event) {
                  var $target = $(Event.target);
                  if($target.val() == $target.data('viValue')) {
                    $target.val('');
                  } else {
                    $target.removeClass('placeholdered');
                  }
                })
                .focusout(function(Event) {
                  var $target = $(Event.target);
                  if($target.val() == '') {
                    $target.val($target.data('viValue')).addClass('placeholdered');
                  }
                })
                .data('viValue', $element.attr('placeholder'))
                .val($element.attr('placeholder'))
                .addClass('placeholdered');
            }
        }
      });
    }
    return this;
  };

})(jQuery);