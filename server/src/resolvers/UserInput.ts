import { InputType, Field } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  zip: string;

}
