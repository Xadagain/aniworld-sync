# AniWorld Listen-Sicherung

Eine schlanke Firefox-Erweiterung, die deine AniWorld-Watchlist und abonnierten Serien als lokale JSON-Sicherung speichert.

Unterstuetzte Domains: `aniworld.to` und `aniworld.cc`.

## Funktionen

- Liest Watchlist und Abonnements automatisch aus, sobald du die jeweilige Seite besuchst.
- Speichert beide Listen zusammen unter `Downloads/AniWorld-Sicherung/aniworld-listen.json`.
- Ueberschreibt die Sicherung mit dem aktuellen Stand, statt neue Dateien anzulegen.
- Entfernt eigene Sicherungsdownloads aus der Firefox-Downloadchronik. Die Datei bleibt dabei erhalten.
- Ermoeglicht einen manuellen Export ueber das Erweiterungs-Symbol.

Die Erweiterung oeffnet keine Seiten selbst und synchronisiert nicht im Hintergrund. Sie sichert den Stand, den du beim Besuch der beiden Listen in Firefox siehst.

## Verwendung

1. Bei AniWorld anmelden.
2. Die Watchlist unter `/account/watchlist` oeffnen.
3. Die Seite **Abonniert** unter `/account/subscribed` oeffnen.
4. Die Sicherung liegt anschliessend unter `Downloads/AniWorld-Sicherung/aniworld-listen.json`.

Ein Klick auf das Erweiterungs-Symbol zeigt die Anzahl gespeicherter Eintraege und bietet einen manuellen Download an.

## Installation

### Firefox Add-ons

Nach der Freigabe auf Firefox Add-ons kann die Erweiterung dort dauerhaft installiert werden und erhaelt Updates direkt ueber Firefox.

### Temporaer zum Testen

1. `about:debugging#/runtime/this-firefox` in Firefox oeffnen.
2. **Temporeres Add-on laden...** waehlen.
3. `manifest.json` aus diesem Repository auswaehlen.

Die temporaere Installation wird beim Neustart von Firefox entfernt. Die bereitgestellte XPI muss fuer eine dauerhafte Installation von Mozilla signiert sein.

## Datenschutz

Die Erweiterung verarbeitet Seriennamen, Serienlinks und gegebenenfalls Cover-Links ausschliesslich lokal. Sie speichert keine Zugangsdaten, Cookies oder Streamingdaten und uebertraegt keine Daten an Dritte. Details stehen im [Datenschutzhinweis](DATENSCHUTZ.md).

## Berechtigungen

| Berechtigung | Zweck |
| --- | --- |
| `storage` | Speichert den letzten Sicherungsstand lokal in Firefox. |
| `downloads` | Erstellt die JSON-Datei im Downloads-Ordner. |
| Zugriff auf AniWorld | Liest Watchlist und Abonnements auf `aniworld.to` und `aniworld.cc` aus. |

## Entwicklung

Das Projekt besteht aus reinem JavaScript, HTML und CSS und benoetigt keine Abhaengigkeiten. Die XPI ist ein ZIP-Archiv, dessen Dateien direkt im Archiv-Stamm liegen.

## Hinweis

AniWorld Listen-Sicherung ist ein inoffizielles, unabhaengiges Projekt und steht in keiner Verbindung zu AniWorld.
"# aniworld-sync" 
