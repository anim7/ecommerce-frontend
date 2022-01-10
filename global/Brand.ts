import { Company } from "./Company";

export interface Brand {
  brandId: string;
  name: string;
  description: string;
  imgUrl: string;
  company: Company;
}
