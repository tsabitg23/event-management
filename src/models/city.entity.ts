import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Event } from "./event.entity";

@Entity({ name: "city" })
export class City extends BaseEntity {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  country: string;

  // one to many entity city and event
  @OneToMany(() => Event, (event) => event.city)
  events?: Event[];
}
