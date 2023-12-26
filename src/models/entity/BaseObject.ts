import { Exclude, instanceToPlain } from "class-transformer"
import { validateSync } from "class-validator"

type ErrorObj = { [k: string]: string[] }

export class BaseObject {
  @Exclude()
  formErrors: ErrorObj = {}

  get isValidatedObj() {
    return Object.keys(this.formErrors).length === 0
  }
  validateObj() {
    const result = validateSync(this)
    this.formErrors = result.reduce((acc, cur) => {
      acc[cur.property] = [cur.toString()]
      return acc
    }, {} as ErrorObj)
  }

  toJSON() {
    return instanceToPlain(this)
  }
}

export class BaseObjectWithDates extends BaseObject {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}