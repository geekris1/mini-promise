const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
class Promise {
  constructor(executor) {
    this.status = STATUS.PENDING;
    this.value = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((x) => {
          x(this.value);
        });
      }
    };
    const reject = (reason) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.value = reason;
        this.onRejectedCallbacks.forEach((x) => x(this.value));
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    let p1 = new Promise((resolve, reject) => {
      if (this.status === STATUS.FULFILLED) {
        try {
          let x = onFulfilled(this.value);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      } else if (this.status === STATUS.REJECTED) {
        try {
          let x = onRejected(this.value);
          reject(x);
        } catch (e) {
          reject(e);
        }
      } else if (this.status === STATUS.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.value);
            reject(x);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return p1;
  }
}

module.exports = Promise;
