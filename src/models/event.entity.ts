import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { City } from './city.entity';

@Entity({ name: 'event' })
export class Event extends BaseEntity {

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: number;
  
  //Many to one entity event and city
  @ManyToOne(() => City, city => city.events)
  city: City;
}