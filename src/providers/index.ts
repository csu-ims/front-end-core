import { BrowserFoundation, HttpFoundation } from "@/foundations";
import { classProviderOf } from "@/utils/helper";

export const UseHttp = classProviderOf(HttpFoundation); 
export const UseBrowser = classProviderOf(BrowserFoundation);