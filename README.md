# Sir. Fourier

## Sunto

Sir. Fourier è un progetto basato sull'omonimo teorema matematico a cui, per l'appunto, mi sono ispirato.
Il tutto nasce da una semplice lezione di telecomunicazioni tenutasi durante l'anno scolastico 2023 / 2024 durante la quale, il docente, ci ha fatto avvicinare al suddetto argomento.
Mi ha colpito particolarmente e fin da subito ho pensato quanto sarebbe stato bello ed interessate realizzare un sito che permetta agli utenti di lavorare con i vettori in modo interattivo e soprattuto divertente.

## La nascita del progetto

Avevo già in mente di sviluppare un sito con il framework Next.JS così ho colto la palla al balzo e con la perfetta scusa di caricare entro il termine delle attivitá didattiche un nostro "capolavoro" sulla piattaforma [UNICA](https://unica.istruzione.gov.it/it), ho deciso di impegnarmi in questa avventura.
Il primo step è stato imparare ad utilizzare il framework in questione, fase abbastanza semplice in quanto, Next.js, si basa su React, anch'esso framework di javascript, a me molto familiare.
Una volta conclusa la fase preparatoria mi sono documentato sul matematico francese, da cui il teorema prende il nome, [Jean Baptiste Joseph Fourier](https://it.wikipedia.org/wiki/Jean_Baptiste_Joseph_Fourier) e successivamente sulla [Serie di Fourier](https://it.wikipedia.org/wiki/Serie_di_Fourier).
Molto semplice anche questa fase: i concetti base li avevo già ben chiari in quanto precedentemente affrontati in classe con il nostro docente di telecomunicazioni.
Senza indugiare oltre mi sono buttato a capofitto sulla scrittura del codice.
L'idea era semplice: realizzare un sito "laboratorio" interattivo, reattivo, intutito, semplice ma allo stesso complesso che consenta all'utente di controllare i vettori, vedere l'onda sinusoidale risultate e "giocare" con le varie armoniche di una serie di fourier.

## Il sito

Il sito è strutturato in più pagine:

- **Home Page**: pagina di presentazione del sito con un breve sunto su Fourier

- **About**: qui documento step by step il codice sorgente del sito e approfondisco con maggiore dettaglio lo sviluppo del sito (pagina attualmente _work in progess_)

- **Lab**: questa è la pagina cuore del mio sito, qui si può generare nuovi vettori, modificarli, creare serie di fourier o visualizzarne alcune standard come l'onda quadra, l'onda a dente di sega o quella triangolare. Le animazioni vengono fatte attraverso l'utilizzo del componente `<Canvas />` che gestisce il componente html `<canvas></canvas>` e che accetta come parametro un callback che rappresenta la funzione `draw`, ovvero, quella funzione che viene chiamata ad ogni render per eseguire le varie animaizoni.

- **Fourier**: dedicata al personaggio storico, questa pagina, approfondisce la vita del matematico francese, Fourier

## Le risorse

Come già specificato parte del progetto è ancora in corso ma il codice sorgente viene aggiornato in continuazione sulla piattaforma [GitHub](https://github.com/) nella mia repository [sir_fourier](https://github.com/CassiGiuse/sir_fourier).
Il sito è hostato sulla piattaforma [Vercel](https://vercel.com/) al link <https://sir-fourier.vercel.app/>.

## Conclusi e valutazioni personali

Sono orgoglioso del progetto e del risultato che ne è venuto fouri.
Seppur manca ancora molto prima di ritenermi del tutto soddisfatto, mi piace il codice che ho scritto in quanto è flessibile e scalabile: non ho dovuto ripetere codice perché i componeti, le classi e le funzioni create sono del tutto riutilizzabili in qualsiasi contesto.
Le animazioni vengono gestite bene e nel complesso le prestazioni del sito sono eccellenti: nessun delay o malfunzionamento generale.
Ovviamente c'è sempre spiraglio di miglioramento ma nel complesso posso ritenermi ad un buon punto.
Il progetto mi ha permesso di uscire dalla mia "comfort zone", utilizzando un framework che prima d'ora mi era sconosciuto.
