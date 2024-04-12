# <img src="frontend/public/Logo.svg" alt="Logo" width="45" align="center"> Hackathonify

Hackathonify to aplikacja webowa, która ułatwia obsługę zgłoszeń na hackathony. Użytkownicy mogą tworzyć zgłoszenia dla drużyn, wyświetlać je, modyfikować oraz usuwać. Wszystkie funkcjonalności są dostępne z poziomu łatwego w obsłudze dashboardu udostępnianego drużynom. Aplikacja została stworzona w ramach zadania wstępnego do konkursu Kieleckie Dni Informatyki 2024.

# Uruchomienie projektu

## Backend

- W katalogu `backend` uruchom komendę `npm install` aby zainstalować wszystkie zależności
- Następnie uruchom komendę `npm start` aby uruchomić serwer
- Serwer będzie dostępny pod adresem `http://localhost:8000`
- Dokumentacja API dostępna jest pod adresem `http://localhost:8000/api`
- W pliku `backend/.env` znajdują się zmienne środowiskowe, które można zmienić. Wrzucone na repo dla naszej wygody, w normalnych warunkach nie wrzucalibyśmy ich na repo.

## Baza danych

- W głównym katalogu znajduje się plik 'docker-compose.yml', który zawiera konfigurację obrazu do uruchomienia bazy danych
- W celu uruchomienia bazy danych należy uruchomić komendę `docker-compose up -d`
- Baza danych będzie dostępna pod adresem `http://localhost:5432`
- Po utworzeniu obrazu należy wykonać migracje, w tym celu należy uruchomić komendę `npm run migrate` w katalogu `backend`
- W celu usunięcia bazy danych należy uruchomić komendę `docker-compose down`

## Frontend

- W katalogu `frontend` uruchom komendę `npm install` aby zainstalować wszystkie zależności
- Następnie uruchom komendę `npm start` aby uruchomić aplikację
- Aplikacja będzie dostępna pod adresem `http://localhost:3000`

## Autorzy

- Klaudiusz Biegacz - klaudiusz.biegacz@gmail.com
- Marek Dzwonnik - mardzw7@gmail.com
- Krzysztof Pańtak - krzysztofpantak@gmail.com

# Zadanie konkursowe

### _Tworzenie REST API do obsługi zgłoszeń na hackathon_

Twoim zadaniem jest stworzenie REST API w dowolnej technologii, wraz z „cienkim” klientem front-end, które umożliwi funkcjonalność CRUD (Create, Read, Update, Delete) dla zgłoszeń na hackathon, wraz z możliwością zarządzania nimi jako plikami PDF.

# Wymagania

    1. Tworzenie zgłoszeń: API powinno umożliwiać tworzenie nowych zgłoszeń na hackathon. Każde zgłoszenie powinno zawierać co najmniej następujące informacje:
       * Nazwa zespolu
       * Krotki opis zespołu
       * Dane kontaktowe członków zespołu

    2. Zarządzanie plikami PDF: API powinno umożliwiać wgrywanie plików PDF jako część zgłoszenia na hackathon. Pliki PDF powinny być powiązane z konkretnymi zgłoszeniami.

    3. Edycja zgłoszeń: API powinno umożliwiać aktualizację danych zgłoszeń na hackathon.

    4. Pobieranie zgłoszeń: API powinno umożliwiać pobieranie informacji o zgłoszeniach na hackathon, wraz z powiązanymi plikami PDF.

    5. Usuwanie zgłoszeń: API powinno umożliwiać usuwanie zgłoszeń na hackathon, wraz z powiązanymi plikami PDF.

# Dodatkowe informacje

    - Wszelkie operacje na danych powinny być zabezpieczone przed nieuprawnionym dostępem.

    - Pamiętaj o dokumentacji API, która powinna być czytelna i zrozumiała dla użytkowników (zalecane openAPI, Swagger itp).

    - Uwzględnij obsługę ewentualnych błędów i sytuacji wyjątkowych.

    - Oceniana będzie zarówno funkcjonalność, jak i jakość kodu oraz użyteczność interfejsu API.

    - Nie zapomnijcie o testach ;)
