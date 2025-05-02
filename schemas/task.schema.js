import { Type } from '@sinclair/typebox';

export const TaskSchema = Type.Object({
  title: Type.String({ minLength: 1 }),
  completed: Type.Optional(Type.Boolean())
});
