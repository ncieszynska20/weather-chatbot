# Asystent Pogodowy Natalia Cieszyńska 65404
1. Opis projektu
Asystent Pogodowy to responsywna aplikacja webowa typu chatbot, która pozwala użytkownikom na sprawdzanie aktualnych warunków pogodowych w czasie rzeczywistym. Bot analizuje dane pogodowe pobierane z OpenWeather API oraz generuje odpowiednie sugestie dotyczące stroju, ochrony przed deszczem, zimnem oraz wysokimi temperaturami.
2. Technologie
Frontend: HTML5, CSS3
JavaScript
Fetch API
OpenWeatherMap API
LocalStorage
GitHub
GitHub Pages
VS Code
3. Funkcjonalności
Interaktywny interfejs czatu z podziałem na wiadomości bota i użytkownika
Pobieranie aktualnej pogody dla wybranego miasta
Inteligentne rekomendacje ubioru (temperatura + zjawiska: deszcz, mróz, słońce)
UX Premium: animacja „Pisze...”, automatyczny scroll do ostatniej wiadomości
Dark/Light Mode: płynne przełączanie motywu z animacją ikony
Persystencja danych: historia rozmów zapisywana w przeglądarce
Responsywność (RWD): pełna obsługa urządzeń mobilnych, tabletów i desktopów
4. Architektura rozwiązania
Interfejs użytkownika zrealizowany w HTML/CSS.
Zarządzanie stanem czatu, animacjami i obsługą zdarzeń.
Pobieranie danych JSON z OpenWeather API.
localStorage jako system bazodanowy po stronie klienta.
5. Przykładowa rozmowa:
Użytkownik: "Toruń"
Bot: "Aktualnie w miejscowości Toruń jest 14°C. Warunki: zachmurzenie duże.
Wystarczy przejściowa kurtka (np. ramoneska) i bluza. 🧥👟"

Użytkownik: "Jest 12 stopni i pada deszcz"
Bot: "Wykryłem temperaturę 12°C. 🌡️ Pogoda jest przejściowa. Idealnie sprawdzi się bluza, bomberka lub ramoneska i długie spodnie. 🧥🌤️
Pamiętaj, że dodatkowo pada deszcz – koniecznie zabierz ze sobą parasol! ☔🌧️"

6. Uruchomienie projektu
Sklonuj repozytorium: git clone [link-do-twojego-repo]
Otwórz projekt w Visual Studio Code.
Uruchom plik index.html przy pomocy rozszerzenia Live Server.
Wprowadź nazwę miasta w pasku wpisywania i sprawdź rekomendacje.
7. Deployment
Aplikacja została opublikowana przy użyciu GitHub Pages.
Link: [https://ncieszynska20.github.io/weather-chatbot/](https://ncieszynska20.github.io/weather-chatbot/)
