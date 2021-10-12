import { ObjectType, Field } from 'type-graphql';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    BaseEntity,
} from 'typeorm';

@ObjectType()
@Entity()
export class ErrorMessages extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    errMessages: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    module: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    ipAddress: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

}
