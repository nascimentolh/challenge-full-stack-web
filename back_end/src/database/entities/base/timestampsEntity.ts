import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class TimesTampsEntity {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}