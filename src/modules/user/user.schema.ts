import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DatabaseCollectionNames } from '../../shared/enums';
import { Identifier } from '../../shared/types';

@Schema({
  timestamps: true,
  collection: DatabaseCollectionNames.USER,
})
export class User {
  // _id is the unique identifier of the user
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '643405452324db8c464c0584',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  })
  _id?: Types.ObjectId;

  // email is the unique identifier of the user
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'john@example.com',
  })
  @Prop({
    required: true,
  })
  email: string;

  // password is the hashed password of the user
  @ApiHideProperty()
  @Prop()
  password?: string;

  // name is the full name of the user
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
  })
  @Prop()
  name?: string;

  @ApiHideProperty()
  @Prop()
  resetToken?: string;

  @ApiProperty({
    description: 'Date of creation',
  })
  @Prop()
  createdAt?: Date;

  @ApiProperty({
    description: 'Date of last update',
  })
  @Prop()
  updatedAt?: Date;
}

export type UserIdentifier = Identifier | User;

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, isActive: 1 });
