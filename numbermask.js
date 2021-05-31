const maskNo = (no, maskLength, startOrEnd) => {
    const strNo = no.toString().split("");
    let maskNo = [];
    for (let i = 0; i < strNo.length; i++) {
        if (startOrEnd) {
            if (i < maskLength) {
                maskNo.push("X")
            } else {
                maskNo.push(strNo[i])
            }
        } else {
            if (i < maskLength) {
                maskNo.push(strNo[i])
            } else {
                maskNo.push("X")
            }
        }

    }
    return maskNo.join("")
}

console.log(maskNo(8885555885, 7,true));
console.log(maskNo(8885555885, 7,false));

// or//////////
const maskNo1 = (no, maskLength, startOrEnd) => {

    const strNo = no.toString().split("");
    if (startOrEnd) {
        const strNoL = strNo.slice(0, maskLength).map(() => "X")
        const strNoR = strNo.slice(maskLength, strNo.length);
        return `${strNoL.join("")}${strNoR.join("")}`
    }
    else {
        const strNoL = strNo.slice(strNo.length - maskLength, strNo.length).map(() => "X")
        const strNoR = strNo.slice(0, strNo.length - maskLength);
        return `${strNoR.join("")}${strNoL.join("")}`
    }
}


console.log(maskNo1(8885555888, 7, true));
console.log(maskNo1(8885555888, 7, false));
//output
// XXXXXXX885
// 8885555XXX
// XXXXXXX885
// 588XXXXXXX
