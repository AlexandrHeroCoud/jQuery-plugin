(function ( $ ) {
    $.fn.actionDynamicPos = function(options){
        var elemAction = this;
        var parentElem = elemAction.parent()
        var settings = $.extend({
            checkboxOn: '.checker-wrap input:checked',
            checkboxes: '.checker-wrap input[type="checkbox"]', //все нужные нам checkbox
            checkedClass: 'fixed-resp', //класс когда элемент фиксед
            uncheckedClass: 'fixed-none', //класс когда элемент на своём месте
            elemOnPlace: 'top', //параметр для скрытия элемента когда он выше(top) или ниже(bottom) своего родителя
        }, options);
        //проверяем дистанцию между родителем элемента и самим элементом, отдаём bool в зависимости от параметра elemOnPlace и положения elemAction
        var checkDistanseElements = function () {
            var distanse = parentElem.offset().top - elemAction.offset().top;
            if((distanse + parentElem.outerHeight()) < 0 && settings.elemOnPlace === 'top'){
                return false;
            } if ((distanse + parentElem.outerHeight()) > 0 && settings.elemOnPlace === 'bottom'){
                return false;
            } else {
                return true;
            }
        };
        //проверяем включённые чекбоксы и checkDistanseElements
        var checkCheckedAndDistanse = function(){
            var a;
            if($(settings.checkboxOn).length !== 0){
                a = true;
                addRemoveClassElemAction(a);
            } if(checkDistanseElements() || $(settings.checkboxOn).length === 0){
                a = false;
                addRemoveClassElemAction(a);
            }
        };
        //Добавляем класс
        var addRemoveClassElemAction = function(a){
            if(a){
                elemAction.addClass(settings.checkedClass).removeClass(settings.uncheckedClass);
            } else {
                elemAction.removeClass(settings.checkedClass).addClass(settings.uncheckedClass);
            }
            App.fixDropdownResponsive();
        };
        $(document).on("scroll", checkCheckedAndDistanse);
        $(document).on("click", settings.checkboxes, checkCheckedAndDistanse);
    };
})(jQuery);