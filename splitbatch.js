  const batchSize = this.total.batchSize;
      let totalQty = 0
      batchOrders.forEach((x) => {
        totalQty = totalQty + x.s1 + x.s2 + x.s3 + x.s4 + x.s5;
      });
      let totalQtyInBatch = 0
      totalQtyInBatch = ~~(totalQty / batchSize);
      let totalQtyInLastBatch = totalQty % batchSize;

      let batchs = [];
      let preqty = 0;
      const fn = (item, index) => {
        let batch = {};

        if (item[`s${index}`] === totalQtyInBatch) {
          batch = { colorId: item.colorId, [`s${index}`]: item[`s${index}`] };
          batchs.push(batch);
        }
        if (item[`s${index}`] > totalQtyInBatch) {
          let qtyR = ~~(item[`s${index}`] / totalQtyInBatch);
          preqty = item[`s${index}`] % totalQtyInBatch;
          for (let i = 0; i < qtyR; i++) {
            batch = { colorId: item.colorId, [`s${index}`]: totalQtyInBatch, }
            batchs.push(batch);
          }
          if (preqty !== 0) {
            batchs.push({ colorId: item.colorId, [`s${index}`]: preqty });
          }
        }
        if (item[`s${index}`] < totalQtyInBatch) {
          batch = { colorId: item.colorId, [`s${index}`]: item[`s${index}`], };
          batchs.push(batch);
        }
      }
      batchOrders.forEach((item) => {
        for (let index = 1; index < 6; index++) {
          fn(item, index);
        }
      })

      console.log(totalQty)
     // let result = groupBy(batchs, 'colorId');
      let finalBatchs = [];
      //console.log(result)
      forOwn(batchs, function (value, key) {
        let s1 = value.filter((x) => x.s1 === totalQtyInBatch);
        remove(value, (x) => x.s1 === totalQtyInBatch)
        if (s1 && s1.length) {
          s1.forEach((x) => {
            let finalBatch = { colorId: key, s1: x.s1, s2: 0, s3: 0, s4: 0, s5: 0 };
            finalBatchs = [...finalBatchs, finalBatch]
          })
        }
        let s2 = value.filter((x) => x.s2 === totalQtyInBatch);
        remove(value, (x) => x.s2 === totalQtyInBatch)
        if (s2 && s2.length) {
          s2.forEach((x) => {
            let finalBatch = { colorId: key, s1: 0, s2: x.s2, s3: 0, s4: 0, s5: 0 };
            finalBatchs = [...finalBatchs, finalBatch]
          })
        }

        let s3 = value.filter((x) => x.s3 === totalQtyInBatch);
        remove(value, (x) => x.s3 === totalQtyInBatch)
        if (s3 && s3.length) {
          s3.forEach((x) => {
            let finalBatch = { colorId: key, s1: 0, s2: 0, s3: x.s3, s4: 0, s5: 0 };
            finalBatchs = [...finalBatchs, finalBatch]
          })
        }

        let s4 = value.filter((x) => x.s4 === totalQtyInBatch);
        remove(value, (x) => x.s4 === totalQtyInBatch)
        if (s4 && s4.length) {
          s4.forEach((x) => {
            let finalBatch = { colorId: key, s1: 0, s2: 0, s3: 0, s4: x.s4, s5: 0 };
            finalBatchs = [...finalBatchs, finalBatch]
          })
        }

        let s5 = value.filter((x) => x.s5 === totalQtyInBatch);
        remove(value, (x) => x.s5 === totalQtyInBatch)
        if (s5 && s5.length) {
          s5.forEach((x) => {
            let finalBatch = { colorId: key, s1: 0, s2: 0, s3: 0, s4: 0, s5: x.s5 };
            finalBatchs = [...finalBatchs, finalBatch]
          })
        }

      });

      forOwn(batchs, (value, key) => {

        if (value && value.length) {
          let data: any = {}
          value.forEach((x) => {
            if (x.s1) {
              data = { s1: x.s1 }
            }

            if (x.s2) {
              data = { ...data, s2: x.s2 }
            }

            if (x.s3) {
              data = { ...data, s3: x.s3 }
            }

            if (x.s4) {
              data = { ...data, s4: x.s4 }
            }

            if (x.s5) {
              data = { ...data, s5: x.s5 }
            }
          })

          let finalBatch = { colorId: key, s1: data?.s1 || 0, s2: data?.s2 || 0, s3: data?.s3 || 0, s4: data?.s4 || 0, s5: data?.s5 || 0 };
          finalBatchs = [...finalBatchs, finalBatch];

        }
      })

      this.orderBatches = sortBy(finalBatchs, ['colorId'])
