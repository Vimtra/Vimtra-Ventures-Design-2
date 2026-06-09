import { createContext, RefObject } from "react";

export const LiquidGlassContext = createContext<RefObject<HTMLCanvasElement> | null>(null);
