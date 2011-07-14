/*
 *  vInputSwitch - Lightweight jQuery input switch plugin
 *  Copyright (C) 2011  Vladimir Tsvang
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
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

  $.fn.vInputSwitch = function(effects) {
    var ef = effects | false;
    var placeholder = 'placeholder' in document.createElement('input');

    $(this).each(function(index, element) {
      var $element = $(element);
      if($element.is('input[type=text]')) {
        if(placeholder) {
          //HTML 5 Placeholders Branch
          var value = $element.attr('value');
          if(value !== undefined & value !== '') {
            $element
              .attr('placeholder', value)
              .removeAttr('value');
          }
        } else {
          //NON HTML 5 Branch
          $element
            .focusin(function(Event) {
              var $target = $(Event.target);
              if($target.val() == $target.data('viValue')) {
                $target.val('');
              }
            })
            .focusout(function(Event) {
              var $target = $(Event.target);
              if($target.val() == '') {
                $target.val($target.data('viValue'));
              }
            })
            .data('viValue', $element.val());
        }

         if(ef) {
           $element
             .hover(
              function(Event) {
                var $target = $(Event.target);
                if(!$target.data('viOpacity')) {
                  $target
                    .clearQueue()
                    .fadeTo(300, 1)
                    .data('viOpacity', true);
                }
              },
              function(Event) {
                var $target = $(Event.target);
                if($target.data('viOpacity')) {
                  $target
                    .clearQueue()
                    .delay(300)
                    .fadeTo(300, 0.5)
                    .data('viOpacity', false);
                }
              }
            )
             .fadeTo(300, 0.5);
         }
      }
    });
    return this;
  };

})(jQuery)