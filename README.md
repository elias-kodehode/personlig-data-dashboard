Github pages: https://elias-kodehode.github.io/personlig-data-dashboard/

trykk på "Create Review" for å skrive et spill review.
alle feltene er obligatoriske, og har basic "validering"

trykk på save for å lagre i localStorage. localStorage er proxiet i gjennom "dataAccess.js" så Data Layer kan bli byttet om ønskelig

du kan sortere reviewsa basert på Spilltid, vurdering og navn. akkurat nå blir hele DOM treet laget på nytt hver eneste gang et nytt element blir lagt til.
dette er ikke optimalt.

du kan endre på hvert eneste review med å trykke på "edit", der du får opp samme feltene som tidligere for å endre på reviewet.
du kan også slette de, eller slette alle med "delete all" knappen.


Dispatching CustomEvents blir brukt for å separare UI med business logic så mye som mulig.
desverre blir refererer "editReviewModal.js" og "createReviewModal.js" fortsatt "dataAccess.js" som ikke er ideelt.

dette prosjektet funker best på Google Chrome pga noen få manglende funksjoner i andre nettlesere. (uviktig)
