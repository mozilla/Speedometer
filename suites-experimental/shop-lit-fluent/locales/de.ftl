shop-name = Lumen Shop
language-label = Sprache
currency-label = Währung
sort-label = Sortieren nach
sort-featured = Empfohlen
sort-price = Preis: aufsteigend

category-all = Alle
category-kitchen = Küche
category-garden = Garten
category-books = Bücher
category-toys = Spielzeug
category-electronics = Elektronik
category-clothing = Kleidung

products-shown = { $shown } von { $loaded } geladenen Produkten
show-more = Weitere Produkte anzeigen

product-price = { CURRENCY($price, $currency) }
product-rating = { NUMBER($rating, minimumFractionDigits: 1) } von 5, { $reviews ->
    [one] eine Bewertung
   *[other] { $reviews } Bewertungen
 }
product-stock = { $count ->
    [0] Ausverkauft
    [one] Nur noch eins
   *[other] { $count } auf Lager
 }
add-to-cart = In den Warenkorb

cart-count = { $count ->
    [0] Warenkorb ist leer
    [one] 1 Artikel
   *[other] { $count } Artikel
 }
