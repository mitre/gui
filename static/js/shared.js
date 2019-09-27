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

// change theme
function switchTheme() {
    let colors = ["rebeccapurple", "red", "black", "orange"];
    let randomItem = colors[Math.floor(Math.random()*colors.length)];
    while(randomItem === localStorage.getItem('theme')) {
        randomItem = colors[Math.floor(Math.random()*colors.length)];
    }
    document.documentElement.setAttribute('data-theme', randomItem);
    localStorage.setItem('theme', randomItem);
}

//voice controls
function activate(controls){
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (event) => {
        for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
            if (event.results[i].isFinal) {
                console.log(event.results[i][0].transcript);
                controls.forEach(function(c) {
                    $.each(c, function(k, v) {
                        if(event.results[i][0].transcript.trim().includes(k)) {
                            v(k);
                        }
                    });
                });
            }
        }
    };
    recognition.start();
}
