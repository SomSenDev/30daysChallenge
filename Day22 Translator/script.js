window.onload = function () {
    var fromSelect = document.querySelector('.from select');
        var toSelect = document.querySelector('.to select');
    
        for (var code in countries) {
            var option = document.createElement('option');
            option.value = code;
            option.text = countries[code];
            fromSelect.appendChild(option);
    
            option = document.createElement('option');
            option.value = code;
            option.text = countries[code];
            toSelect.appendChild(option);
        }
    
        // Set default values
        fromSelect.value = 'en-GB';
        toSelect.value = 'es-ES';
        // paragraph of english text real english
        document.querySelector('.fromTxt').value = 'The quick brown fox jumps over the lazy dog.';
        document.querySelector('.toTxt').value = '';
    };
    
    
    
    var translateButton = document.querySelector('button[type="button"]');
    translateButton.addEventListener('click', function () {
        var fromTextarea = document.querySelector('.fromTxt');
        var toTextarea = document.querySelector('.toTxt');
        var fromLang = document.querySelector('.from select').value;
        var toLang = document.querySelector('.to select').value;
        var textToTranslate = fromTextarea.value;
    
        fetch(`https://api.mymemory.translated.net/get?q=${textToTranslate}&langpair=${fromLang}|${toLang}`)
            .then(response => response.json())
            .then(data => {
                if (data.responseStatus === 200) {
                    if(fromTextarea.value !== "") {
                        toTextarea.value = data.responseData.translatedText;
                    } else {
                        toTextarea.value = "";
                    }
    
                }
                else {
                    toTextarea.value = "Error: " + data.responseStatus;
                }
            })
    
            .catch(error => {
                console.error("Translation error:", error);
            });
    });
    
    
    //copy buttons
    
    const fromCopy = document.querySelector('.from .fa-copy');
    const toCopy = document.querySelector('.to .fa-copy');
    
    fromCopy.addEventListener('click', function () {
        //copy the fromTxt to clipboard
        const fromTxt = document.querySelector('.fromTxt');
        if(fromTxt.value !== "") {
            navigator.clipboard.writeText(fromTxt.value);
            alert("Copied the text: " );
        } else {
            alert("Nothing to copy");
        }
    } 
    );
    
    toCopy.addEventListener('click', function () {
        //copy the toTxt to clipboard
        const toTxt = document.querySelector('.toTxt');
        if(toTxt.value !== "") {
            navigator.clipboard.writeText(toTxt.value);
            alert("Copied the text: " );
        } else {
            alert("Nothing to copy");
        }
    }
    );
    
    