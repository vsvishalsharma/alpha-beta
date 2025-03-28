declare module 'react-csv-to-table' {
    import { ReactNode } from 'react';
  
    export interface CsvToHtmlTableProps {
      data: string;
      tableClassName?: string;
      hasHeader?: boolean;
      csvDelimiter?: string;
      allowDownload?: boolean;
    }
  
    export class CsvToHtmlTable extends React.Component<CsvToHtmlTableProps> {}
  }
  