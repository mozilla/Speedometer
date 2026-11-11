// The benchmark journey, shared by the build (which prepares a response for
// every search state it reaches) and the benchmark steps (which click
// through it).

export const TODAY = "2026-11-02";

export const INITIAL_SEARCH = {
    destId: "city-aurelle",
    destType: "city",
    checkin: "2026-11-13",
    checkout: "2026-11-16",
    adults: 2,
    children: 0,
    rooms: 1,
    filters: [],
    sort: "popularity",
    page: 0,
};

export const POPULAR_FILTER = "meal=breakfast";
export const STAR_FILTER = "class=4";
export const REVIEW_FILTER = "review_score=80";
// Key presses on the price slider's minimum thumb.
export const PRICE_SLIDER_STEPS = 5;
export const SORT = "price";
export const NEXT_PAGE = 1;
// The date picker opens on the month of the current check-in date. The
// journey moves forward two months and picks new dates there.
export const DATE_PICKER_NEXT_CLICKS = 2;
export const NEW_DATES = { checkin: "2027-01-15", checkout: "2027-01-19" };
export const DESTINATION_TYPED = "Lorv";
export const NEW_DESTINATION = { destId: "city-lorvaine", destType: "city" };
export const CARD_DETAIL_TOGGLES = 5;
// The property opened from the results, counted from the top of the list.
export const PROPERTY_CARD_INDEX = 2;
export const ROOM_SELECTIONS = [
    { row: 0, quantity: 1 },
    { row: 2, quantity: 2 },
    { row: 5, quantity: 1 },
];
