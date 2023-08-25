document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const searchButton = document.querySelector(".btnSearch");
    const wordDisplay = document.getElementById("word");
    const meaningDisplay = document.getElementById("meaning");
    const exampleDisplay = document.getElementById("example");
    const synonymsDisplay = document.getElementById("synonyms");
    const antonymsDisplay = document.getElementById("antonyms");
    const speakButton = document.getElementById("speak");

    window.addEventListener("load", function () {
        searchInput.value = "welcome";
        fetchWordInfo("welcome");
    });

    window.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const searchTerm = searchInput.value.trim();

            if (searchTerm) {
                fetchWordInfo(searchTerm);
            }
        }
    });

    // Function to fetch word definitions and related information
    async function fetchWordInfo(word) {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                const wordInfo = data[0];

                // Display word and part of speech + phonetic spelling
                wordDisplay.innerHTML = `${wordInfo.word} <br> <span class="noun">${wordInfo.meanings[0].partOfSpeech + " " + wordInfo.phonetics[0].text
                }</span>`;

                // Display meaning and example if available else go to the other definition and display the meaning and example
                meaningDisplay.textContent = wordInfo.meanings[0].definitions[0].definition;
                exampleDisplay.textContent = wordInfo.meanings[0].definitions[0].example || "";

                // Display synonyms and antonyms atleast two words


                synonymsDisplay.textContent = wordInfo.meanings[0].synonyms.slice(0, 2).join(", ") || "N/A";
                antonymsDisplay.textContent = wordInfo.meanings[0].antonyms.slice(0, 2).join(", ") || "N/A";
            } else {
                // Display an error message if the word is not found
                wordDisplay.textContent = "Word Not Found";
                meaningDisplay.textContent = "";
                exampleDisplay.textContent = "";
                synonymsDisplay.textContent = "";
                antonymsDisplay.textContent = "";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Event listener for the search button
    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            fetchWordInfo(searchTerm);
        }
    });

    // Event listener for the speak button (pronunciation)
    speakButton.addEventListener("click", function () {
        const wordToSpeak = wordDisplay.textContent.split(" ")[0]; // Get the word to speak
        speak(wordToSpeak);
    });

    // Function to trigger text-to-speech for the given word
    function speak(word) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(word);
        synth.speak(utterance);
    }
});
