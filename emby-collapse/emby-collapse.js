﻿define(['browser', 'css!./emby-collapse', 'registerElement'], function (browser) {

    var EmbyButtonPrototype = Object.create(HTMLDivElement.prototype);

    function slideDownToShow(button, elem) {

        elem.classList.remove('hide');
        elem.classList.add('expanded');
        elem.style.height = 'auto';
        var height = elem.offsetHeight + 'px';
        elem.style.height = '0';
        elem.offsetHeight;
        elem.style.height = height;

        setTimeout(function () {
            if (elem.classList.contains('expanded')) {
                elem.classList.remove('hide');
            } else {
                elem.classList.add('hide');
            }
        }, 300);

        var icon = button.querySelector('i');
        //icon.innerHTML = 'expand_less';
        icon.classList.add('expanded');
    }

    function slideUpToHide(button, elem) {

        elem.classList.remove('expanded');
        elem.style.height = '0';

        setTimeout(function () {
            if (elem.classList.contains('expanded')) {
                elem.classList.remove('hide');
            } else {
                elem.classList.add('hide');
            }
        }, 300);

        var icon = button.querySelector('i');
        //icon.innerHTML = 'expand_more';
        icon.classList.remove('expanded');
    }

    function onButtonClick(e) {

        var collapseContent = this.parentNode.querySelector('.collapseContent');

        if (collapseContent.classList.contains('expanded')) {
            slideUpToHide(this, collapseContent);
        } else {
            slideDownToShow(this, collapseContent);
        }
    }

    EmbyButtonPrototype.attachedCallback = function () {

        if (this.getAttribute('data-embycollapse') == 'true') {
            return;
        }

        this.setAttribute('data-embycollapse', 'true');

        var collapseContent = this.querySelector('.collapseContent');
        if (collapseContent) {
            collapseContent.classList.add('hide');
        }

        var title = this.getAttribute('title');

        var html = '<button is="emby-button" type="button" on-click="toggleExpand" id="expandButton" class="emby-collapsible-button">\
                <h3 class="emby-collapsible-title" title="' + title + '">' + title + '</h3>\
                <i style="margin-left: auto; margin-right: .5em;" class="md-icon emby-collapse-expandIcon">expand_more</i>\
            </button>';

        this.insertAdjacentHTML('afterbegin', html);

        this.querySelector('.emby-collapsible-button').addEventListener('click', onButtonClick);
    };

    document.registerElement('emby-collapse', {
        prototype: EmbyButtonPrototype,
        extends: 'div'
    });
});