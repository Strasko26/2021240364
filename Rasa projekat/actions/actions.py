# actions/actions.py

from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import EventType 
from rasa_sdk.events import SlotSet


# Dummy podaci o ljubimcima
pets = {
    "milo": {
        "id": 2,
        "naziv": "Milo",
        "opis": "Samostalna, ali voli društvo. Lako se prilagođava.",
        "vrsta": "Mačka",
        "starost": "1 godina",
        "velicina": "Mala",
        "poreklo": "Mađarska",
        "cena": "120 EUR",
        "ocena": "★★★★☆",
        "link": "/pets/milo"
    },
    "luna": {
        "id": 1,
        "naziv": "Luna",
        "opis": "Razigrana i umiljata. Sjajna sa decom.",
        "vrsta": "Pas",
        "starost": "2 godine",
        "velicina": "Srednja",
        "poreklo": "Srbija",
        "cena": "150 EUR",
        "ocena": "★★★★★",
        "link": "/pets/luna"
    },
    "goldie": {
        "id": 3,
        "naziv": "Goldie",
        "opis": "Mirna zlatna ribica, laka za održavanje.",
        "vrsta": "Riba",
        "starost": "6 meseci",
        "velicina": "Mala",
        "poreklo": "Kina",
        "cena": "10 EUR",
        "ocena": "★★★☆☆",
        "link": "/pets/goldie"
    },
    "kiwi": {
        "id": 4,
        "naziv": "Kiwi",
        "opis": "Vesela papagajka, voli društvo i pevanje.",
        "vrsta": "Ptica",
        "starost": "1 godina",
        "velicina": "Mala",
        "poreklo": "Brazil",
        "cena": "45 EUR",
        "ocena": "★★★★☆",
        "link": "/pets/kiwi"
    },
    "rex": {
        "id": 5,
        "naziv": "Rex",
        "opis": "Veran i zaštitnički nastrojen pas.",
        "vrsta": "Pas",
        "starost": "3 godine",
        "velicina": "Velika",
        "poreklo": "Nemačka",
        "cena": "200 EUR",
        "ocena": "★★★★★",
        "link": "/pets/rex"
    },
    "bubbles": {
        "id": 6,
        "naziv": "Bubbles",
        "opis": "Energična ribica, idealna za akvarijume.",
        "vrsta": "Riba",
        "starost": "4 meseca",
        "velicina": "Mala",
        "poreklo": "Japan",
        "cena": "12 EUR",
        "ocena": "★★★☆☆",
        "link": "/pets/bubbles"
    },
    "nina": {
        "id": 7,
        "naziv": "Nina",
        "opis": "Druželjubiva mačka, voli da se mazi.",
        "vrsta": "Mačka",
        "starost": "2 godine",
        "velicina": "Srednja",
        "poreklo": "Francuska",
        "cena": "130 EUR",
        "ocena": "★★★★☆",
        "link": "/pets/nina"
    },
    "tara": {
        "id": 8,
        "naziv": "Tara",
        "opis": "Mirna i poslušna, idealna za stan.",
        "vrsta": "Pas",
        "starost": "4 godine",
        "velicina": "Srednja",
        "poreklo": "Hrvatska",
        "cena": "140 EUR",
        "ocena": "★★★★☆",
        "link": "/pets/tara"
    },
    "sunny": {
        "id": 9,
        "naziv": "Sunny",
        "opis": "Papagaj vedrog raspoloženja, voli svetlo.",
        "vrsta": "Ptica",
        "starost": "1.5 godina",
        "velicina": "Mala",
        "poreklo": "Australija",
        "cena": "50 EUR",
        "ocena": "★★★☆☆",
        "link": "/pets/sunny"
    },
    "rocky": {
        "id": 10,
        "naziv": "Rocky",
        "opis": "Aktivan i snažan pas, zahteva puno kretanja.",
        "vrsta": "Pas",
        "starost": "2.5 godine",
        "velicina": "Velika",
        "poreklo": "SAD",
        "cena": "180 EUR",
        "ocena": "★★★★☆",
        "link": "/pets/rocky"
    }
}

class ActionShowPets(Action):
    def name(self) -> Text:
        return "action_show_pets"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[EventType]:
        pets = [
            {"id": 1, "name": "Luna", "species": "Pas"},
            {"id": 2, "name": "Milo", "species": "Mačka"},
            {"id": 3, "name": "Goldie", "species": "Riba"},
            {"id": 4, "name": "Kiwi", "species": "Ptica"},
            {"id": 5, "name": "Rex", "species": "Pas"},
            {"id": 6, "name": "Bubbles", "species": "Riba"},
            {"id": 7, "name": "Nina", "species": "Mačka"},
            {"id": 8, "name": "Tara", "species": "Pas"},
            {"id": 9, "name": "Sunny", "species": "Ptica"},
            {"id": 10, "name": "Rocky", "species": "Pas"}
        ]

        message = "Evo spiska ljubimaca:\n\n"
        for pet in pets:
            message += f"- {pet['name']} ({pet['species']})\n"

        dispatcher.utter_message(text=message)
        return []


class ActionSearchPets(Action):
    def name(self) -> Text:
        return "action_search_pets"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker, domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        pet_name = next(tracker.get_latest_entity_values("pet_name"), None)
        if pet_name:
            pet = pets.get(pet_name.lower())
            if pet:
                dispatcher.utter_message(text=(
                    f"{pet['naziv']} | {pet['opis']} "
                    f"\nVrsta: {pet['vrsta']} | Starost: {pet['starost']} | Veličina: {pet['velicina']} | "
                    f"Poreklo: {pet['poreklo']} | Cena: {pet['cena']} | Ocena: {pet['ocena']} "
                    f"\n[Detalji]({pet['link']})"
                ))
            else:
                dispatcher.utter_message(template="utter_pet_not_found", pet_name=pet_name)
        else:
            dispatcher.utter_message(text="Niste naveli ime ljubimca.")
        return []

class ActionShowPetDetails(Action):
    def name(self) -> Text:
        return "action_show_pet_details"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict) -> List[EventType]:
        pet_name = tracker.get_slot("pet_name")
        if not pet_name:
            dispatcher.utter_message(text="Molim te, reci mi ime ljubimca za kojeg želiš detalje.")
            return []

        pet_data = pets.get(pet_name.lower())
        if pet_data:
            pet_id = pet_data.get("id")
            link = f"http://localhost:3000/pets/{pet_id}"
            dispatcher.utter_message(text=f"[Klikni ovde za više informacija o ljubimcu {pet_data['naziv']}]({link})")
        else:
            dispatcher.utter_message(text=f"Nema ljubimca sa imenom '{pet_name}'. Pokušaj ponovo.")

        return []


class ActionAddToCart(Action):
    def name(self) -> str:
        return "action_add_to_cart"

    def run(self, dispatcher, tracker, domain):
        pet_name = tracker.get_slot("pet_name")
        
        # Pristupite metadata iz poslednje poruke
        metadata = tracker.latest_message.get("metadata", {})
        print("PRIMLJENI METADATA:", metadata)
        is_logged_in = metadata.get("is_logged_in", "false") == "true"
        
        # Ako korisnik nije prijavljen
        if not is_logged_in:
            dispatcher.utter_message("Molimo vas da se prijavite pre naručivanja ljubimca.")
            return []

        dispatcher.utter_message(f"Dodao sam {pet_name} u vašu korpu!")
        return [SlotSet("pet_name", pet_name)]



