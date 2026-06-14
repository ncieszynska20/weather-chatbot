
const API_KEY = "40c2a89423443e8f3167539c15c5df1a"; 
window.onload = function() {
    const savedChat = localStorage.getItem("chatHistory");
    const chatBox = document.getElementById("chat-box");
    
    if (savedChat) {
        chatBox.innerHTML = savedChat;
        chatBox.scrollTop = chatBox.scrollHeight;
    } else {
        initChat();
    }
};

function saveChat() {
    const chatBox = document.getElementById("chat-box");
    localStorage.setItem("chatHistory", chatBox.innerHTML);
}

function clearChat() {
    localStorage.removeItem("chatHistory");
    document.getElementById("chat-box").innerHTML = "";
    initChat();
}

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("theme-btn");
    
    
    body.classList.toggle("dark");
    
  
    if (body.classList.contains("dark")) {
        btn.innerHTML = "☀️"; 
    } else {
        btn.innerHTML = "🌙";
    }
}


function showTyping() {
    const chatBox = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.classList.add("bot-message", "typing-indicator");
    div.id = "typing-bubble";
    div.innerText = "Pisze...";
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
    const typingBubble = document.getElementById("typing-bubble");
    if (typingBubble) {
        typingBubble.remove();
    }
}


function addMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.classList.add(sender);
   
    div.innerHTML = message.replace(/\n/g, '<br>'); 
    
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    if (sender !== "typing-indicator") {
        saveChat();
    }
}

function initChat() {
    const welcomeMessage = "Cześć! Jestem Twoim Asystentem Pogodowym. 🤖\n\nChętnie pomogę Ci dobrać strój do pogody! Napisz mi, jaka jest u Ciebie temperatura (np. 'jest 15 stopni') albo podaj nazwę miasta, a ja sprawdzę prognozę na żywo. 🌍\n\nDzięki mnie nigdy nie wyjdziesz z domu bez parasola, gdy pada, lub w zimowej kurtce, gdy świeci słońce! ✨";
    
    addMessage(welcomeMessage, "bot-message");
}

function sendMessage() {
    const inputElement = document.getElementById("user-input");
    const userText = inputElement.value.trim();

    if (userText === "") return;

   
    addMessage(userText, "user-message");
    inputElement.value = "";

    showTyping();

    const textLower = userText.toLowerCase();
    const maSlowaKluczowe = textLower.includes("stopni") || textLower.includes("st") || 
                            textLower.includes("pada") || textLower.includes("deszcz") || 
                            textLower.includes("zimno") || textLower.includes("ciepło") || 
                            textLower.includes("słońce") || textLower.includes("mróz") ||
                            textLower.includes("pogoda");

   
    setTimeout(() => {
        
        removeTyping(); 

        if (maSlowaKluczowe) {
            const response = localBotResponse(userText);
            addMessage(response, "bot-message");
        } else {
            const formattedCity = userText.charAt(0).toUpperCase() + userText.slice(1).toLowerCase();
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(formattedCity)}&appid=${API_KEY}&units=metric&lang=pl`;

            fetch(apiURL)
                .then(response => {
                    if (!response.ok) throw new Error(`Status: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    const temperature = Math.round(data.main.temp);
                    const weatherDescription = data.weather[0].description;
                    let responseText = `Aktualnie w miejscowości ${data.name} jest ${temperature}°C. Warunki: ${weatherDescription}. \n\n`;
                    responseText += getClothingRecommendation(temperature, weatherDescription);
                    addMessage(responseText, "bot-message");
                })
                .catch(error => {
                    addMessage(`Ups! Nie mogłem pobrać danych dla "${formattedCity}". Może to być literówka lub Twój klucz API jeszcze się nie aktywował.`, "bot-message");
                });
        }
    }, 800); 
}

function localBotResponse(userInput) {
    const text = userInput.toLowerCase();
    let wykrytaTemperatura = null;
    const match = text.match(/-?\d+/); 
    if (match) wykrytaTemperatura = parseInt(match[0], 10);
    const maDeszcz = text.includes("deszcz") || text.includes("pada");

    if (wykrytaTemperatura !== null) {
        let rekomendacja = `Wykryłem temperaturę ${wykrytaTemperatura}°C. 🌡️ `;
        if (wykrytaTemperatura < 10) rekomendacja += "Jest zimno! Wybierz grubą kurtkę zimową, szalik, czapkę i ciepłe buty. 🥶🧣❄️";
        else if (wykrytaTemperatura >= 10 && wykrytaTemperatura < 20) rekomendacja += "Pogoda jest przejściowa. Idealnie sprawdzi się bluza, bomberka lub ramoneska i długie spodnie. 🧥🌤️";
        else rekomendacja += "Jest ciepło! Czas na t-shirt, krótkie spodenki i okulary przeciwsłoneczne. ☀️🕶️😎";
        if (maDeszcz) rekomendacja += "\n\nPamiętaj, że dodatkowo pada deszcz – koniecznie zabierz ze sobą parasol! ☔🌧️";
        return rekomendacja;
    }

    if (maDeszcz) return "Skoro pada deszcz, kluczowa jest ochrona przed wodą. Wybierz kurtkę z kapturem lub weź parasol. ☔🌧️";
    if (text.includes("zimno") || text.includes("mróz")) return "Skoro jest zimno, załóż ciepły płaszcz lub kurtkę puchową oraz czapkę i rękawiczki. 🥶❄️";
    if (text.includes("ciepło") || text.includes("słońce")) return "Brzmi świetnie! Załóż coś lekkiego z krótkim rękawem i weź okulary przeciwsłoneczne. ☀️😎";

    return `Nie jestem pewien, co masz na myśli. 🤔 Napisz np. "jest 25 stopni" albo podaj miasto. 🌍`;
}


function getClothingRecommendation(temp, description) {
    const desc = description.toLowerCase();
    const isRaining = desc.includes("deszcz") || desc.includes("mżawka") || desc.includes("ulewa");
    let clothes = "";
    if (temp < 10) clothes = "Załóż ciepłą kurtkę, sweter oraz grubsze buty. 🥶🧣";
    else if (temp >= 10 && temp < 20) clothes = "Wystarczy przejściowa kurtka (np. ramoneska) i bluza. 🧥👟";
    else clothes = "Ciepło! Wskakuj w t-shirt i lekkie spodnie. 👕🕶️☀️";
    if (isRaining) clothes += "\n\nKoniecznie zabierz ze sobą parasol lub załóż płaszcz przeciwdeszczowy! ☔🌧️";
    return clothes;
}


document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") sendMessage();
});
window.addEventListener('resize', moveButtons);
window.addEventListener('load', moveButtons);

function moveButtons() {
    const actions = document.querySelector('.header-actions');
    const header = document.querySelector('.chat-header');
    const inputBar = document.querySelector('.chat-input');
    

    if (!actions || !header || !inputBar) return;

    if (window.innerWidth <= 480) {

        if (actions.parentNode !== inputBar) {
            inputBar.insertBefore(actions, inputBar.firstChild);
        }
    } else {

        if (actions.parentNode !== header) {
            header.appendChild(actions);
        }
    }
}