declare module "react-native-chess" {
  import { FC } from "react";
  import { ViewProps } from "react-native";

  interface ChessProps extends ViewProps {
    fen: string;
    size: number;
    onMove?: (move: {
      from: string;
      to: string;
      promotion?: string;
    }) => boolean;
    lightSquareColor?: string;
    darkSquareColor?: string;
    orientation?: "white" | "black";
    shouldSelectPiece?: (piece: any) => boolean;
    onPromotion?: () => string;
  }

  export const Chess: FC<ChessProps>;
}
