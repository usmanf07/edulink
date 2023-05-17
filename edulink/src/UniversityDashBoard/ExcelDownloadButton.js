import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import "./AppliedStudents.css";

const ExcelDownloadButton = ({ data, columns, filename }) => {
  // Ensure that columns array has at least 10 elements
  if (columns.length > 10) {
    throw new Error("The 'columns' array must have at least 10 elements.");
  }

  const handleDownload = () => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([], { header: columns });

    // Append the data to the worksheet
    XLSX.utils.sheet_add_json(worksheet, data, { origin: "A2", skipHeader: true });

    // Set column width for all columns
    const columnDef = { width: 30 };
    const columnDefs = columns.map(() => columnDef);
    worksheet['!cols'] = columnDefs;

    // Add the worksheet to the workbook
    const wsName = 'Sheet 1';
    workbook.SheetNames.push(wsName);
    workbook.Sheets[wsName] = worksheet;

    // Generate a binary string from the workbook
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Convert the buffer to a Blob and save the file
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${filename}.xlsx`);
  };

  return (
    <button className="button_bar_btns downloadReport" onClick={handleDownload}>Download Excel</button>
  );
};

export default ExcelDownloadButton;
