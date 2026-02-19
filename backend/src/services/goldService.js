import * as goldPriceApi from './goldPriceApi.js'
import * as alertStore from './alertStore.js'

export async function getCurrentGoldPrice() {
  return goldPriceApi.fetchCurrentXauUsd()
}

export async function getHistoricalGoldPrice(date) {
  return goldPriceApi.fetchHistoricalXauUsd(date)
}

export async function getHistoricalPriceList() {
  return goldPriceApi.fetchHistoricalList()
}

export const listAlerts = alertStore.listAlerts
export const createAlert = alertStore.createAlert
export const deleteAlert = alertStore.deleteAlert
