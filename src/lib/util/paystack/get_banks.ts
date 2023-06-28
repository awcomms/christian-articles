import { paystack } from ".";
import type { Currency } from "./currencies";

export const get_banks = (c: Currency) => paystack.get(`/bank?currency=${c}`)