# Holiday Hub

Holiday Hub ist eine spezialisierte Plattform, die es Reisenden ermöglicht, ihre Urlaubserlebnisse mit anderen zu teilen. Nutzer können Bewertungen und Medien zu ihren Reisen hinzufügen, während Administratoren die Inhalte verwalten können.

## Inhaltsverzeichnis

1. [Überblick](#überblick)
2. [Features](#features)
3. [Installation](#installation)
4. [Verwendung](#verwendung)
5. [API Endpunkte](#api-endpunkte)
6. [Umgebungsvariablen](#umgebungsvariablen)
7. [Docker](#docker)

## Überblick

Holiday Hub ist eine Webanwendung, die es Benutzern ermöglicht, Reisebewertungen zu schreiben, Bilder und Videos hochzuladen und Bewertungen anderer Benutzer zu lesen. Administratoren können Bewertungen bearbeiten und löschen, um sicherzustellen, dass die Inhalte den Richtlinien entsprechen.

## Features

- **Nutzer-Registrierung und Login:** Benutzer können sich registrieren und anmelden, um Bewertungen zu schreiben.
- **Bewertungen hinzufügen:** Benutzer können Bewertungen zu ihren Reisen hinzufügen, inklusive Bilder, Videos und Dokumente.
- **Bewertungen verwalten:** Administratoren können Bewertungen bearbeiten und löschen.
- **Bewertungen anzeigen:** Alle Benutzer können die Bewertungen und Medieninhalte anderer Benutzer sehen.

## Installation

### Voraussetzungen

- Node.js
- npm
- MongoDB
- Docker (optional)

### Schritte

1. Klone das Repository:
    ```sh
    git clone https://github.com/karlessbuchclub/Neue_Datenbankkonzepte_Abgabe.git
    ```

2. Installiere die Abhängigkeiten für das Backend:
    ```sh
    cd backend
    npm install
    ```

3. Installiere die Abhängigkeiten für das Frontend:
    ```sh
    cd ../frontend
    npm install
    ```

4. Stelle sicher, dass MongoDB läuft und konfiguriere die Umgebungsvariablen (siehe unten).

5. Starte MongoDB mit Docker:
    ```sh
    docker-compose down
    docker-compose build
    docker-compose up -d
    ```

6. Starte das Backend:
    ```sh
    cd ../backend
    node server.js
    ```

7. Starte das Frontend:
    ```sh
    cd ../frontend
    npm start
    ```

## Verwendung

1. Öffne den Browser und gehe zu `http://localhost:3000`, um die Anwendung zu nutzen.
2. Registriere dich als Benutzer oder melde dich an, wenn du bereits ein Konto hast.
3. Füge Bewertungen hinzu oder sieh dir Bewertungen anderer Benutzer an.

## API Endpunkte

- `POST /api/auth/register`: Benutzer registrieren
- `POST /api/auth/login`: Benutzer anmelden
- `GET /api/listings`: Alle Bewertungen abrufen
- `POST /api/listings`: Neue Bewertung hinzufügen
- `DELETE /api/listings/:id`: Bewertung löschen (nur Admin)

## Umgebungsvariablen

Falls .env Verzeichnis nicht vorhanden, bitte eine .env im Stammverzeichnis erstellen und einfügen:

MONGO_URI=mongodb://127.0.0.1:27017/holidayhub

## Docker

Die Docker-Compose-Datei im Stammverzeichnis des Projekts ist bereits für MongoDB konfiguriert.
