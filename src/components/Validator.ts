import { Decklist } from './DeckListParser';
import { FormErrors } from './DecklistInputForm';


export const validateDecklist = (decklist: Decklist | undefined) => {
    const newErrors: Partial<FormErrors> = {};

    if (decklist === undefined) {
        newErrors.decklist = 'Decklist is undefined, please input a decklist and try again.';
        return;
    }

    const decklistLength = decklist.energy.length + decklist.pokemon.length + decklist.trainer.length;
    
    if (decklistLength < 60) {
        newErrors.decklist = 'Decklist must have 60 cards.';
    }
    return newErrors;
}
