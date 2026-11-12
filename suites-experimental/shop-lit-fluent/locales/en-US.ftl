shop-name = Lumen Shop
language-label = Language
currency-label = Currency
sort-label = Sort by
sort-featured = Featured
sort-price = Price: low to high

category-all = All
category-kitchen = Kitchen
category-garden = Garden
category-books = Books
category-toys = Toys
category-electronics = Electronics
category-clothing = Clothing

products-shown = Showing { $shown } of { $loaded } loaded products
show-more = Show more products

product-price = { CURRENCY($price, $currency) }
product-rating = { NUMBER($rating, minimumFractionDigits: 1) } out of 5, { $reviews ->
    [one] one review
   *[other] { $reviews } reviews
 }
product-stock = { $count ->
    [0] Sold out
    [one] Only one left
   *[other] { $count } in stock
 }
add-to-cart = Add to cart

cart-count = { $count ->
    [0] Cart is empty
    [one] 1 item
   *[other] { $count } items
 }
