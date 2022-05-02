import { Address } from "./Domain/entities/Address"
import { Custumer } from "./Domain/entities/Customer"

const address = new Address("Av José Ayrton", 123)

const customer = new Custumer("123", "Alisson", address)

