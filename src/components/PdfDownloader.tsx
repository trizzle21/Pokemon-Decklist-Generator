import React, {useState} from "react";
import { PDFDocument } from "pdf-lib";
import { drawOnPDF } from './PdfDrawer';
import { FormData } from './DecklistInputForm';
import { Decklist, parseDeckList } from './DeckListParser';
import { FormVersion } from './FormVersion';

interface PdfDownloaderProps {
  formData: FormData;
}

export type DateOfBirth = {
  month: string;
  day: string;
  year: string;
}

export type ParsedFormData = {
  name: string;
  playerId: string;
  dob: DateOfBirth;
  format: string;
  division: string;
  decklist: Decklist | undefined;
  formVersion: FormVersion;
}

export const PdfDownloader: React.FC<PdfDownloaderProps> = ({ formData }) => {

  const [isLoading, setIsLoading] = useState(false);

  const parseDateOfBirth = (dateString: string): DateOfBirth => {
    // Regular expression to validate the date format MM/DD/YYYY
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  
    const match = dateString.match(dateRegex);
  
    if (!match) {
      throw new Error("Invalid date format. Expected format is MM/DD/YYYY.");
    }
  
    const [, month, day, year] = match;
  
    return {
      day,
      month,
      year,
    };
  }
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let parsedDecklist;
    if (formData.decklist) {
      parsedDecklist = parseDeckList(formData.decklist);
    }
    const parsedData: ParsedFormData = {
      name: formData.name,
      playerId: formData.playerId,
      dob: parseDateOfBirth(formData.dob),
      format: formData.format,
      division: formData.division,
      decklist: parsedDecklist,
      formVersion: formData.formVersion
    }
    modifyExistingPDF(parsedData)
  }

  const convertSpacesToUnderscores = (input: string): string => {
    return input.replace(/ /g, "_");
  }

  const modifyExistingPDF = async (parsedFormData: ParsedFormData) => {
    // Load the existing PDF
    setIsLoading(true);

    try {
      // Fetch an existing PDF (replace with your file path or URL)
      // const response = await fetch("/play-pokemon-deck-list-a4-ssp.pdf");
      const response = await fetch("/" + formData.formVersion);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const existingPdfBytes = await response.arrayBuffer();

      // Load the PDF with pdf-lib
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      drawOnPDF(firstPage, parsedFormData);

      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();

      // Create a Blob from the modified PDF bytes
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });

      const deckName = convertSpacesToUnderscores(formData.deckListName);
      // Create a download link for the modified PDF
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = deckName + ".pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error modifying PDF:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button style={{ padding: "10px 20px", fontSize: "16px" }} >
          Loading...
        </button>
    </div>
    ) 
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={handleSubmit} style={{ padding: "10px 20px", fontSize: "16px" }} >
        Generate PDF
      </button>
    </div>
  );
};
