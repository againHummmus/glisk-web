import type { Locale } from "../config";
import type { Dictionary } from "../types";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { hi } from "./hi";
import { id } from "./id";
import { it } from "./it";
import { ja } from "./ja";
import { ko } from "./ko";
import { pl } from "./pl";
import { pt } from "./pt";
import { ru } from "./ru";
import { tr } from "./tr";
import { uk } from "./uk";
import { zh } from "./zh";

const dictionaries: Record<Locale, Dictionary> = { en, ru, uk, pl, de, fr, es, pt, it, tr, hi, id, zh, ja, ko };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
