const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
class Promise {
  constructor(executor) {
    this.status = STATUS.PENDING;
    this.value = undefined;
    const reject = (value) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;
      }
    };
    const resolve = (reason) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.value = reason;
      }
    };
    executor(reject, resolve);
  }
  then(onFulfilled, onRejected) {
    if (this.status === STATUS.FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === STATUS.REJECTED) {
      onRejected(this.value);
    } else if (this.status === STATUS.PENDING) {
      // TODO:
    }
  }
}

module.exports = Promise;
