import { validateSync } from "class-validator"

type ErrorObj = { [k: string]: string[] }

export class BaseObject {
  constructor() {
    this.formErrors = {}
  }
  formErrors: ErrorObj
  get isValidatedObj() {
    return Object.keys(this.formErrors).length === 0
  }
  validateObj() {
    const result = validateSync(this)
    this.formErrors = result.reduce((acc, cur) => {
      if (cur.constraints) {
        acc[cur.property] = Object.keys(cur.constraints)
      }
      return acc
    }, {} as ErrorObj)
  }
}

export class BaseObjectWithDates extends BaseObject {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}