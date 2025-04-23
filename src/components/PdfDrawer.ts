import { PDFPage } from "pdf-lib";
import { ParsedFormData } from './PdfDownloader';

import { getSheetMappingFromFormVersion, SheetMapping } from './PokemonSheetMappingConstants';

const drawDivision = async (page : PDFPage, division: string, sheetMapping: SheetMapping) => {
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

const drawFormat = async (page : PDFPage, format: string, sheetMapping: SheetMapping) => {
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
    const sheetMapping: SheetMapping = getSheetMappingFromFormVersion(formData.formVersion);  
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


    drawDivision(page, formData.division, sheetMapping);
    drawFormat(page, formData.format, sheetMapping);

    // Pokemon:
    if (formData.decklist) {

        const allPokemon = formData.decklist.pokemon;

        let pokemonY: number = sheetMapping.starting_pokemon_position;
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
            page.drawText(pokemon.regulation || '', {
                x: sheetMapping.decklist.pokemon.regulation.x,
                y: pokemonY,
                size: sheetMapping.decklist.pokemon.regulation.size,
            });

            pokemonY -= 9;
        })

        // Trainers
        const allTrainers = formData.decklist.trainer;
        let trainerY: number = sheetMapping.starting_trainer_position;
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
        let energyY: number = sheetMapping.starting_enegy_position;
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


}