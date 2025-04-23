import { PDFPage } from "pdf-lib";
import { ParsedFormData } from './PdfDownloader';

const DEFAULT_STARTING_POKEMON: number = 587;
const DEFAULT_STARTING_TRAINER: number = 410;
const DEFAULT_STARTING_ENERGY: number = 128;

const sheetMapping = {
    name: {x: 95, y: 715, size: 10},
    playerId: {x: 280, y: 715, size: 10},
    dob: {
        month: { x: 500, y: 715, size: 10},
        day: { x: 525, y: 715, size: 10},
        year: { x: 550, y: 715, size: 10}
    },
    division: {
        junior:  { x: 375, y: 672, size: 12},
        senior:  { x: 375, y: 660, size: 12},
        master:  { x: 375, y: 650, size: 12}
    },
    format: {
        standard: { x: 155, y: 730, size: 12},
        expanded: { x: 205, y: 730, size: 12},
    },
    decklist: {
        pokemon: {
            quantity: { x: 270, y: DEFAULT_STARTING_POKEMON, size: 8},
            name: { x: 300, y: DEFAULT_STARTING_POKEMON, size: 8},
            set: { x: 480, y: DEFAULT_STARTING_POKEMON, size: 8},
            number: { x: 510, y: DEFAULT_STARTING_POKEMON, size: 8},
        },
        trainer: {
            quantity: { x: 270, size: 10},
            name: { x: 300, size: 10},
        },
        energy: {
            quantity: { x: 270, size: 10},
            name: { x: 300, size: 10},
        },
    }
} 


const drawDivision = async (page : PDFPage, division: string) => {
    if (division === "junior") {
        page.drawText("X", {
            x: sheetMapping.division.junior.x,
            y: sheetMapping.division.junior.y,
            size: sheetMapping.division.junior.size,
        });
    } else if (division === "senior") {
        page.drawText("X", {
            x: sheetMapping.division.senior.x,
            y: sheetMapping.division.senior.y,
            size: sheetMapping.division.senior.size,
        });
    } else {
        page.drawText("X", {
            x: sheetMapping.division.master.x,
            y: sheetMapping.division.master.y,
            size: sheetMapping.division.master.size,
        });
    }
}

const drawFormat = async (page : PDFPage, format: string) => {
    if (format === "expanded") {
        page.drawText("X", {
            x: sheetMapping.format.expanded.x,
            y: sheetMapping.format.expanded.y,
            size: sheetMapping.format.expanded.size,
        });
    } else {
        page.drawText("X", {
            x: sheetMapping.format.standard.x,
            y: sheetMapping.format.standard.y,
            size: sheetMapping.format.standard.size,
        });
    }
}


// TODO: move use ParsedFormData
export const drawOnPDF = async (page : PDFPage, formData: ParsedFormData) => {
    page.drawText(formData.name, {
        x: sheetMapping.name.x,
        y: sheetMapping.name.y,
        size: sheetMapping.name.size,
    });

    // playerId
    page.drawText(formData.playerId, {
        x: sheetMapping.playerId.x,
        y: sheetMapping.playerId.y,
        size: sheetMapping.playerId.size,
    });

    // dob
    page.drawText(formData.dob.month, {
        x: sheetMapping.dob.month.x,
        y: sheetMapping.dob.month.y,
        size: sheetMapping.dob.day.size,
    });
    page.drawText(formData.dob.day, {
        x: sheetMapping.dob.day.x,
        y: sheetMapping.dob.day.y,
        size: sheetMapping.dob.day.size,
    });
    page.drawText(formData.dob.year, {
        x: sheetMapping.dob.year.x,
        y: sheetMapping.dob.year.y,
        size: sheetMapping.dob.year.size,
    });


    drawDivision(page, formData.division);
    drawFormat(page, formData.format);

    // Pokemon:
    const allPokemon = formData.decklist.pokemon;

    let pokemonY: number = DEFAULT_STARTING_POKEMON;
    allPokemon.forEach((pokemon) => {
        page.drawText(pokemon.quantity, {
            x: sheetMapping.decklist.pokemon.quantity.x,
            y: pokemonY,
            size: sheetMapping.decklist.pokemon.quantity.size,
        });
        page.drawText(pokemon.name, {
            x: sheetMapping.decklist.pokemon.name.x,
            y: pokemonY,
            size: sheetMapping.decklist.pokemon.name.size,
        });
        page.drawText(pokemon.number || '', {
            x: sheetMapping.decklist.pokemon.number.x,
            y: pokemonY,
            size: sheetMapping.decklist.pokemon.number.size,
        });
        page.drawText(pokemon.set || '', {
            x: sheetMapping.decklist.pokemon.set.x,
            y: pokemonY,
            size: sheetMapping.decklist.pokemon.set.size,
        });
        pokemonY -= 9;
    })

    // Trainers
    const allTrainers = formData.decklist.trainer;
    let trainerY: number = DEFAULT_STARTING_TRAINER;
    allTrainers.forEach((trainer) => {
        page.drawText(trainer.quantity, {
            x: sheetMapping.decklist.trainer.quantity.x,
            y: trainerY,
            size: sheetMapping.decklist.trainer.quantity.size,
        });
        page.drawText(trainer.name, {
            x: sheetMapping.decklist.trainer.name.x,
            y: trainerY,
            size: sheetMapping.decklist.trainer.name.size,
        });
        trainerY -= 13;
    });
    
    const allEnergy = formData.decklist.energy;
    let energyY: number = DEFAULT_STARTING_ENERGY;
    allEnergy.forEach((energy) => {
        page.drawText(energy.quantity, {
            x: sheetMapping.decklist.energy.quantity.x,
            y: energyY,
            size: sheetMapping.decklist.energy.quantity.size,
        });
        page.drawText(energy.name, {
            x: sheetMapping.decklist.energy.name.x,
            y: energyY,
            size: sheetMapping.decklist.energy.name.size,
        });
        energyY -= 13;
    });




}