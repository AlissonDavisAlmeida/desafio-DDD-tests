import {Notification} from "./notification"

describe("Unit tests for notifications", () => {

    test("should create erros", () => {

        const notification = new Notification()
        const error = {
            message: "error message",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.messages("customer")).toBe("customer: error message")

        const error2 = {
            message: "error message2",
            context: "customer"
        }

        notification.addError(error2)

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message2")

        const error3 = {
            message: "error message",
            context: "order"
        }

        notification.addError(error3)

        expect(notification.messages("order")).toBe("order: error message")
        expect(notification.messages("")).toBe("customer: error message,customer: error message2,order: error message")
    })

    test("should check if notification has at least one error message", () => {

        const notification = new Notification()
        const error={
            message: "error message",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.hasError()).toBe(true)
    })

    test("should get all errors props", () => {
        const notification = new Notification()
        const error = {
            message: "error message",
            context: "customer"
        }

        notification.addError(error)

        expect(notification.erros).toStrictEqual([error])
    })
})