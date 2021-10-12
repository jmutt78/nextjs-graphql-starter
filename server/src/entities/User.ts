import { ObjectType, Field } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Sub } from './Sub';
import { Message } from './Message';
import { Quote } from './Quote';
import { MailActivity } from './MailActivity';
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  Subsciber = 'subsciber'
}

export enum Profession {
  ACCOUNTING = 'Accounting',
  COACHING = 'Coaching',
  CONSULTANT = 'Consultant',
  CONSTRUCTION = 'Construction',
  EDUCATION = 'Education',
  ENGINEERING = 'Engineering',
  FINANCIAL = 'Financial',
  HEALTHCARE = 'Health Care',
  HOMESERVICES = 'Home Services',
  HOSPITALITY = 'Hospitality',
  LEGAL = 'Legal',
  MANUFACTURING = 'Manufacturing',
  MARKETING = 'Marketing',
  REALSTATE = 'Realstate',
  RESTAURANT = 'Restaurant',
  RETAIL = 'Retail',
  TECHNOLOGY = 'Technology',
}

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column('text', { nullable: true })
  name: string;

  @Field()
  @Column({ nullable:true })
  algorithm!: string;

  @Field()
  @Column({ nullable:true })
  salt!: string;

  @Column({ nullable: true })
  password!: string;

  @Field()
  @Column({ nullable: true })
  role!: UserRole;

  @Field()
  @Column({ nullable: true })
  inviteLink: string;

  @Field()
  @Column({ nullable: true })
  email!: string;

  @Field()
  @Column({ nullable: true })
  is_active: number;

  @Field()
  @Column({ nullable: true })
  is_super_admin: number;

  @Field(() => String)
  @CreateDateColumn({ nullable: true })
  last_login: Date;
 
  @Field(() => String)
  @CreateDateColumn({ nullable: true })
  createdAt: Date;


  @Field(() => String)
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  //Oath info
  @Column('text', { nullable: true })
  googleId: string | null;

  @Column('text', { nullable: true })
  facebookId: string | null;

  @Column('text', { nullable: true })
  linkedInId: string | null;

  //Stripe and memebership
  @Field()
  @Column('text', { default: 'free-trial' })
  customerType!: string;

  @Column('text', { nullable: true })
  stripeId: string;

  @Column('text', { nullable: true })
  stripeSubscriptionId: string;

  @Field()
  @Column({ nullable: true, default: '' })
  ccLast4: string;

  //Profile Info
  @Field()
  @Column({ nullable: true })
  catagory: Profession;

  
  @Field()
  @Column({ nullable: true })
  address: string;

  @Field()
  @Column({ nullable: true })
  city: string;

  @Field()
  @Column({ nullable: true })
  state: string;

  @Field()
  @Column({ nullable: true })
  zip: string;

  @Field()
  @Column({ nullable: true })
  company: string;

  @Field()
  @Column({ nullable: true })
  title: string;

  @Field()
  @Column({ nullable: true })
  DefaultTemplates: boolean;



  @Field()
  @Column({ nullable: true })
  linkedIn: string;

  @Field()
  @Column({ nullable: true })
  twitter: string;

  @Field()
  @Column({ nullable: true })
  facebook: string;

  @Field()
  @Column({ nullable: true })
  website: string;

  //Connections
  @OneToMany(() => Sub, (sub) => sub.creator)
  subs: Sub[];

  @OneToMany(() => Quote, (quote) => quote.user)
  quotes: Quote[];

  @OneToMany(() => Message, (message) => message.creator)
  messages: Message[];

  @OneToMany(() => MailActivity, (mailactivity) => mailactivity.user)
  mailactivities: MailActivity[];


}
