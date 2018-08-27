import {
  ModelType,
  prop,
  staticMethod,
  Typegoose
} from "../typegoose/typegoose";

export class Application extends Typegoose {
  @prop()
  _id: string;
  @prop()
  get id(): string {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }
  @prop()
  name: string;
  @prop()
  version: string;
  @staticMethod
  static findApplication(this: ModelType<Application> & typeof Application) {
    return this.find();
  }
}

export var ApplicationModel = new Application().getModelForClass(Application, {
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret, options) => {
        delete ret.__v;
        delete ret._id;
        return ret;
      }
    }
  }
});
