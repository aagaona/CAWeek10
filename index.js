class Card {
    constructor (cardName, cmc) {
        this.cardName = cardName;
        this.cmc = cmc;
    }
};

class Deck {
    constructor (id, commander, colors) {
        this.id = id;
        this.commander = commander;
        this.colors = colors;
        this.cards = [];
    }

    addCard(card){
        this.cards.push(card);
    }

    deleteCard(card){
        let index = this.cards.indexOf(card);
        this.cards.splice(index,1);
    }
};

let decks =[];
let deckID = 0;

function onClick (id, action) {
    let element = document.getElementById(id);
    element.addEventListener(`click`, action);
    return action;
};

onClick(`create-new-deck`, () => {
    decks.push(new Deck(deckID++, getValue(`new-commander-name`), getValue(`new-commander-color`)));
    renderDOM();
});

function getValue(id) {
    return document.getElementById(id).value;
};

function renderDOM(){
    let decksDiv = document.getElementById(`deck-table`);
    clearElement(decksDiv);
    for (let deck of decks){
        let table = createDeckTable(deck);
        let title = document.createElement(`h2`);
        title.innerText = deck.commander;
        title.appendChild(createDeleteDeck(deck));
        decksDiv.appendChild(title);
        decksDiv.appendChild(table);
        for (card of deck.cards){
            createCardRow(table, deck, card);
        };
    };
};

function createCardRow(table, deck, card){
    let row = table.insertRow(2);
    row.insertCell(0).innerText = card.cardName;
    row.insertCell(1).innerText = card.cmc; 
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteCard(deck, card));
};

function createDeleteCard (deck, card){
    let button = document.createElement(`button`);
    button.className = `btn btn-dark`;
    button.innerText = `Delete Card`;
    button.onclick = () => {
        let index = deck.cards.indexOf(card);
        deck.cards.splice(index, 1);
        renderDOM();
    }
    return button;
};

function createDeleteDeck(commander){
    let button = document.createElement(`button`);
    button.className = `btn btn-dark`;
    button.innerText = `Delete Deck`;
    button.onclick = () => {
        let index = decks.indexOf(commander);
        decks.splice(index,1);
        renderDOM();
    }
    return button;
};

function clearElement (element){
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    };
};

function createNewCard(decks) {
    let button = document.createElement(`button`);
    button.ClassName = `btn btn-dark`;
    button.innerText = `Add Card`;
    button.onclick = () => {
        decks.cards.push(new Card(getValue(`card-input-${decks.id}`), getValue(`cmc-input-${decks.id}`)));
        renderDOM();
    }; 
    return button;
};

function createDeckTable (decks) {
    let table = document.createElement(`table`);
    table.setAttribute(`class`, `table table-dark table-striped table-hover table-borderless`);
    let row = table.insertRow(0);
    let columnName = document.createElement(`th`);
    let columnCMC = document.createElement(`th`);
    columnName.innerText = `Card`;
    columnCMC.innerText = `CMC`;
    row.appendChild(columnName);
    row.appendChild(columnCMC);
    let formRow = table.insertRow(1);
    let cardHeader = document.createElement(`th`);
    let cmcHeader = document.createElement(`th`); 
    let commanderHeader = document.createElement(`th`);
    let cardInput = document.createElement(`input`);
    cardInput.setAttribute(`id`,`card-input-${decks.id}`)
    cardInput.setAttribute(`type`, `text`);
    cardInput.setAttribute(`class`, `form-control`);
    let cmcInput = document.createElement(`input`);
    cmcInput.setAttribute(`id`,`cmc-input-${decks.id}`)
    cmcInput.setAttribute(`type`, `text`);
    cmcInput.setAttribute(`class`, `form-control`);
    let newCardButton = createNewCard(decks);
    cardHeader.appendChild(cardInput);
    cmcHeader.appendChild(cmcInput);
    commanderHeader.appendChild(newCardButton);
    formRow.appendChild(cardHeader);
    formRow.appendChild(cmcHeader);
    formRow.appendChild(commanderHeader);
    return table
};