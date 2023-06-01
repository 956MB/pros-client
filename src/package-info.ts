import { productName, description, version } from '../package.json'

export function getProductName() {
    return productName
}

export function getDescription() {
    return description
}

export function getVersion() {
    return version
}