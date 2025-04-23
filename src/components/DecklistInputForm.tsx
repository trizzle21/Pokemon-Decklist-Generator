import React, { useState } from 'react';
import { PdfDownloader } from './PdfDownloader';
import Dropdown from './DropDown';

export type FormData = {
  formVersion: FormVersion;
  name: string;
  playerId: string;
  dob: string;
  format: string,
  division: string,
  deckListName: string;
  decklist: string;
};

export enum FormVersion {
  SurgingSparks = "play-pokemon-deck-list-a4-ssp.pdf",
  JourneyTogether = "play-pokemon-deck-list-a4-jtg.pdf"
}

export const PlayerForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    formVersion: FormVersion.JourneyTogether,
    name: '',
    playerId: '',
    dob: '',
    format: 'standard',
    division: 'master',
    deckListName: 'Default Deck Name',
    decklist: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="player-form">
    <div className="form-group">
        <label htmlFor="format">Version:</label>
        <Dropdown 
          name="formVersion"
          value={formData.formVersion}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name (First and Last):</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="playerId">Player ID:</label>
        <input
          type="text"
          id="playerId"
          name="playerId"
          value={formData.playerId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth (MM/DD/YYYY):</label>
        <input
          type="text"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          pattern="\d{2}/\d{2}/\d{4}"
          placeholder="MM/DD/YYYY"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="format">Format:</label>
        <select
          id="format"
          name="format"
          value={formData.format}
          onChange={handleChange}
          required
        >
          <option value="standard">Standard</option>
          <option value="expanded">Expanded</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="division">Division:</label>
        <select
          id="division"
          name="division"
          value={formData.division}
          onChange={handleChange}
          required
        >
          <option value="junior">Junior</option>
          <option value="senior">Senior</option>
          <option value="master">Master</option>
        </select>
      </div>

      <label htmlFor="deckListName">Decklist Name:</label>
        <input
          type="text"
          id="deckListName"
          name="deckListName"
          value={formData.deckListName}
          onChange={handleChange}
          required
        />

      <div className="form-group">
        <label htmlFor="decklist">Decklist (from LimitlessTCG)</label>
        <textarea
          id="decklist"
          name="decklist"
          value={formData.decklist}
          onChange={handleChange}
          rows={10}
          required
        />
      </div>
      <PdfDownloader formData={formData}/>

    </form>
  );
};
