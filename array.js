let data1 = [1, 2, 3, 4, 5,4,5,3,2,4,2,3];
let data2 = ["a", "b", "c", "d", "e", "f", 'q'];

const mergeArray = (data1, data2) => {
  let resutl = [];
  let currentIndex = 0;
  if (data1.length <= data2.length) {
    data1.forEach((c, index) => {
      const temp = data2[index] || null;
      currentIndex = index;
      if (temp) {
        resutl = [...resutl, temp]
      }
      resutl = [...resutl, c]
    })
  let newArr = data2.slice(currentIndex+1, data2.length)
  resutl = [...resutl, ...newArr]
  }else{
   data2.forEach((c, index) => {
      const temp = data1[index] || null;
      currentIndex = index;
      if (temp) {
        resutl = [...resutl, temp]
      }
      resutl = [...resutl, c]
    })
  let newArr = data1.slice(currentIndex+1, data1.length)
  resutl = [...resutl, ...newArr]
  }
  return resutl;
}

console.log(mergeArray(data1,data2))
