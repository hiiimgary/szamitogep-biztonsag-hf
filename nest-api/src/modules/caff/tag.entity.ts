import { Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Caff } from "./caff.entity";

@Entity()
export class Tag {
    @PrimaryColumn()
    tag: string;

    @ManyToMany(() => Caff, caff => caff.tags)
    animations: Caff[];
}