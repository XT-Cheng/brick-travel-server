import {
  ModelType,
  prop,
  staticMethod,
  Typegoose,
  arrayProp
} from "../typegoose/typegoose";

export class ApplicationMenu extends Typegoose {
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
  link: string;
  @prop()
  icon: string;
  @prop()
  acl: string;
}

new ApplicationMenu().getModelForClass(ApplicationMenu, {
  schemaOptions: {
    toJSON: {
      virtuals: true,
      transform: (doc, ret, options) => {
        delete ret._id;
        return ret;
      }
    }
  }
});

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
  @arrayProp({ items: ApplicationMenu })
  menus: ApplicationMenu[];
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
