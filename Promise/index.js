const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return new TypeError("error");
  }
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            reject(r);
          }
        );
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}
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
          setTimeout(() => {
            resolvePromise(p1, x, resolve, reject);
          });
        } catch (e) {
          reject(e);
        }
      } else if (this.status === STATUS.REJECTED) {
        try {
          setTimeout(() => {
            let x = onRejected(this.value);
            resolvePromise(p1, x, resolve, reject);
          });
        } catch (e) {
          reject(e);
        }
      } else if (this.status === STATUS.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              let x = onFulfilled(this.value);
              resolvePromise(p1, x, resolve, reject);
            });
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              let x = onRejected(this.value);
              resolvePromise(p1, x, resolve, reject);
            });
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
