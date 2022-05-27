export interface NotificationErrorProps {
    message: string
    context: string
}

export class Notification {

    private _erros: NotificationErrorProps[] = []



    addError(error: NotificationErrorProps) {
        this._erros.push(error)
    }

    hasError(): boolean {
        return this._erros.length > 0
    }

    messages(context?: string) {
        return this._erros.filter(err => err.context.includes(context))
            .map(err => err.context.concat(`: ${err.message}`))
            .join(",")
    }

    get erros(): NotificationErrorProps[] {
        return this._erros
    }
}