require('dotenv').config();
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isArchived: boolean;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @Column({ type: 'varchar', length: 300, default: 'system' })
    createdBy: string;

    @UpdateDateColumn({ type: 'datetime', default: null })
    lastChangedDateTime: Date;

    @Column({ type: 'varchar', length: 300, default: null })
    lastChangedBy: string | null;

    @Column({ type: 'varchar', length: 300, nullable: true })
    internalComment: string | null;
}