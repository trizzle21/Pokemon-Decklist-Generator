import { Regulations } from './RegulationFetcher'; 

export type Card = {
    quantity: string;
    name: string;
    set?: string;
    number?: string;
    regulation?: string
};

export type Decklist = {
    pokemon: Card[];
    trainer: Card[];
    energy: Card[];
};

export const parseDeckList = (decklistString: string): Decklist => {
    const sections = decklistString.split(/\n(?=Pokémon:|Trainer:|Energy:)/g);

    const parseSection = (section: string): Card[] => {
        const lines = section.trim().split("\n");
        const cards: Card[] = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            const match = line.match(/^(\d+)\s+([^\d]+)\s+([A-Z]+)\s+(\d+)$/);

            if (match) {
                const [, quantity, name, set, number] = match;
                const regulation: string = Regulations.get(set + ":" + number) ?? '';
                cards.push({
                    quantity: quantity,
                    name: name.trim(),
                    set: set.trim(),
                    number: number.trim(),
                    regulation: regulation.trim() 
                });
            } else {
                const energyMatch = line.match(/^(\d+)\s+([^\d]+)$/);
                if (energyMatch) {
                    const [, quantity, name] = energyMatch;
                    cards.push({
                        quantity: quantity,
                        name: name.trim(),
                    });
                }
            }
        }

        return cards;
    };

    const decklist: Decklist = {
        pokemon: [],
        trainer: [],
        energy: [],
    };

    sections.forEach((section) => {
        const [header] = section.split("\n");
        const type = header.split(":")[0].toLowerCase();

        if (type === "pokémon") {
            decklist.pokemon = parseSection(section);
        } else if (type === "trainer") {
            decklist.trainer = parseSection(section);
        } else if (type === "energy") {
            decklist.energy = parseSection(section);
        }
    });
    return decklist;
}
