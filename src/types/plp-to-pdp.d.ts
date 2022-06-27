declare module PlpToPdp {
  export type Poduct = {
    name: string;
    price: number;
    image: string;
    color?: string;
    hidden?: boolean;
    expanded?: boolean;
    description?: string;
    onClickHandler?: () => void;
  };
}
