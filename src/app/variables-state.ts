import { proxy } from "valtio";
import { Variables } from "../shared/variables.type";

export const variables = proxy<Variables>({});
