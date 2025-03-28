declare module 'react-csv' {
  import { ReactNode } from 'react';

  export interface CSVLinkProps {
    data: any[] | string;
    filename?: string;
    headers?: any[];
    target?: string;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export class CSVLink extends React.Component<CSVLinkProps> {}
}
