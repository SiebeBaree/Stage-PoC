import { z } from "zod";

export const querySchema = z.string().min(2).max(50);

export type QuerySchema = typeof querySchema;
