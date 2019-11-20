// check user prefs
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

//check browser
window.onload = function checkBrowser(){
    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if(!isChrome) {
        $('#notice').css('display', 'block');
    }
};

// AJAX caller
function restRequest(type, data, callback, endpoint='/plugin/chain/rest') {
    $.ajax({
       url: endpoint,
       type: type,
       contentType: 'application/json',
       data: JSON.stringify(data),
       success: function(data, status, options) { callback(data); },
       error: function (xhr, ajaxOptions, thrownError) { console.log(thrownError) }
    });
}

// form validation
function validateFormState(conditions, selector){
    (conditions) ?
        updateButtonState(selector, 'valid') :
        updateButtonState(selector, 'invalid');
}

function updateButtonState(selector, state) {
    (state === 'valid') ?
        $(selector).attr('class','button-success atomic-button') :
        $(selector).attr('class','button-notready atomic-button');
}

function switchTheme() {
     let colors = ["rebeccapurple", "red", "green", "orange", "blue"];
     const currentIndex = colors.indexOf(localStorage.getItem('theme'));
     const nextIndex = (currentIndex + 2) % colors.length;
     let nextColor = colors[nextIndex];
     document.documentElement.setAttribute('data-theme', nextColor);
     localStorage.setItem('theme', nextColor);
}

function reloadData() {
    $.ajax({
       url: '/data/reload',
       type: 'POST',
       success: function(data, status, options) { },
       error: function (xhr, ajaxOptions, thrownError) { console.log(thrownError) }
    });
    $('#red-bar-text').text('Data has been reloaded');
}

function resetData() {
    $.ajax({
       url: '/data/reset',
       type: 'POST',
       success: function(data, status, options) { },
       error: function (xhr, ajaxOptions, thrownError) { console.log(thrownError) }
    });
    $('#red-bar-text').text('Factory reset has been completed')
}

// flashy function
function flashy(elem, message) {
    let flash = $('#'+elem);
    flash.find('#message').text(message);
    flash.delay(100).fadeIn('normal', function() {
        $(this).delay(3000).fadeOut();
    });
    flash.find('#message').text(message);
}