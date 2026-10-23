import { ANATOMY_DIGITAL } from "./anatomy-digital";
import { ANATOMY_INTEGRA } from "./anatomy-integra";
import { ANATOMY_FACILITIES } from "./anatomy-facilities";
import { ANATOMY_FACILITIES_PROYECTOS } from "./anatomy-facilities-proyectos";
import type { Anatomy } from "./types";

const ANATOMY: Record<string, Anatomy> = { ...ANATOMY_DIGITAL, ...ANATOMY_INTEGRA, ...ANATOMY_FACILITIES, ...ANATOMY_FACILITIES_PROYECTOS };

export const anatomyOf = (serviceId: string): Anatomy | undefined => ANATOMY[serviceId];
