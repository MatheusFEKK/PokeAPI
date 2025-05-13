import { Ability } from './Abilities';
import { Types } from './Types';

export type Pokemon = {
    name:string,
    weight:number;
    height:number;
    base_experience:number;
    Abilities: Ability[];
    Type: Types[];
}
