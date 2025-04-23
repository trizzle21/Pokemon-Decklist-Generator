import { FormVersion } from "./DecklistInputForm";

// const DEFAULT_STARTING_POKEMON: number = 587;
// const DEFAULT_STARTING_TRAINER: number = 410;
// const DEFAULT_STARTING_ENERGY: number = 128;


type location = {
  x: number;
  y: number;
  size: number
}

export type SheetMapping = {
  name: location;
  playerId: location;
  dob: {
    month: location;
    day: location;
    year: location;
  };
  division: {
    junior: location;
    senior: location;
    master: location;
  }
  format: {
    standard: location;
    expanded: location;
  };
  starting_pokemon_position: number;
  starting_trainer_position: number;
  starting_enegy_position: number;
  decklist: {
    pokemon: {
      quantity: location;
      name: location;
      set: location;
      number: location;
    };
    trainer: {
      quantity: location;
      name: location;
    };
    energy: {
      quantity: location;
      name: location;
    };
  }
}

export const surgingSparksSheetMapping: SheetMapping = {
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
    starting_pokemon_position: 587,
    starting_trainer_position: 410,
    starting_enegy_position: 128,
    decklist: {
        pokemon: {
            quantity: { x: 270, y: 587, size: 8},
            name: { x: 300, y: 587, size: 8},
            set: { x: 480, y: 587, size: 8},
            number: { x: 510, y: 587, size: 8},
        },
        trainer: {
          quantity: { x: 270, y: 410, size: 10},
          name: { x: 300, y: 410, size: 10},
        },
        energy: {
          quantity: { x: 270, y: 128, size: 10},
          name: { x: 300, y: 128, size: 10},
        },
    }
} 

export const journeyTogetherSheetMapping: SheetMapping = {
    name: {x: 95, y: 760, size: 10},
    playerId: {x: 280, y: 760, size: 10},
    dob: {
      month: { x: 500, y: 760, size: 10},
      day: { x: 525, y: 760, size: 10},
      year: { x: 550, y: 760, size: 10}
    },
    division: {
      junior:  { x: 368, y: 719, size: 12},
      senior:  { x: 369, y: 705, size: 12},
      master:  { x: 368, y: 695, size: 12}
    },
    format: {
      standard: { x: 145, y: 790, size: 12},
      expanded: { x: 200, y: 790, size: 12},
    },
    starting_pokemon_position: 648,
    starting_trainer_position: 470,
    starting_enegy_position: 185,
    decklist: {
      pokemon: {
          quantity: { x: 270, y: 648, size: 8},
          name: { x: 300, y: 648, size: 8},
          set: { x: 480, y: 648, size: 8},
          number: { x: 510, y: 648, size: 8},
      },
      trainer: {
        quantity: { x: 270, y: 470, size: 10},
        name: { x: 300, y: 470, size: 10},
      },
      energy: {
        quantity: { x: 270, y: 185, size: 10},
        name: { x: 300, y: 185, size: 10},
      },
  }
} 

export const getSheetMappingFromFormVersion = (formVersion: FormVersion) => {
    if (formVersion === FormVersion.SurgingSparks) {
        return surgingSparksSheetMapping;
    } else {
        return journeyTogetherSheetMapping;
    }
}
