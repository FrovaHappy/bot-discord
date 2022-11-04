export class BuilderTime {
  #HS_TO_MILLIS = 3600 * 1000
  #MIN_TO_MILLIS = 60 * 1000
  #DEFAULT_TIME = 6 * this.#HS_TO_MILLIS
  constructor(hours = 0, mins = 0) {
    this.hours = (hours || 0) * this.#HS_TO_MILLIS
    this.mins = (mins || 0) * this.#MIN_TO_MILLIS
    this.totalTime = this.#getTotalTime()
    this.limitTime = 24 * this.#HS_TO_MILLIS
  }
  #getTotalTime() {
    const sum = this.hours + this.mins
    return sum === 0 ? this.#DEFAULT_TIME : sum
  }
  isInvalidTime() {
    return this.totalTime > this.limitTime
  }
  timeDefaultOrHours() {
    const ask = this.#getTotalTime() === this.#DEFAULT_TIME ? this.#DEFAULT_TIME : this.hours
    return this.convertHours(ask)
  }
  convertHours(hoursInMilliseconds) {
    return hoursInMilliseconds / this.#HS_TO_MILLIS
  }
  convertMinutes(minutesInMilliseconds) {
    return minutesInMilliseconds / this.#MIN_TO_MILLIS
  }
}
