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

function switchTheme(color) {
     document.documentElement.setAttribute('data-theme', color);
     localStorage.setItem('theme', color);
}

function reloadData() {
    $.ajax({
       url: '/data/reload',
       type: 'POST',
       success: function(data, status, options) { },
       error: function (xhr, ajaxOptions, thrownError) { console.log(thrownError) }
    });
    alert('Data has been reloaded');
}

function resetData() {
    $.ajax({
       url: '/data/reset',
       type: 'POST',
       success: function(data, status, options) { },
       error: function (xhr, ajaxOptions, thrownError) { console.log(thrownError) }
    });
    alert('Factory reset has been completed');
}

function showColors() {
    if($("#dropdown-colors-content").is(":visible")){
        $('#dropdown-colors-content').hide();
    } else {
        $('#dropdown-colors-content').show();
    }
}

function showPlugin(name, description, address, state) {
    document.getElementById("duk-modal").style.display="block";
    $('#duk-state').text(state);
    $('#duk-name').text(name);
    $('#duk-text').text(description);
    $('#duk-address').attr("href", address);

    if(state === 'ENABLED') {
        $('#state-holder').css("background-color", "green");
    } else {
        $('#state-holder').css("background-color", "red");
    }
    if(address !== 'None') {
        $('#duk-address').css("display", "block");
    } else {
        $('#duk-address').css("display", "none");
    }
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