const maskEmailName = (emailName,maskChar) => {

    const ArrStr = emailName.split("");
    const maskLength = ArrStr.length <= 4 ? 0 : ArrStr.length > 4 && ArrStr.length < 7 ? 2 : ArrStr.length >= 8 && ArrStr.length <= 12 ? 3 : 4;
    const strNoL = ArrStr.slice(0, maskLength)
    const strNoR = ArrStr.slice(maskLength, ArrStr.length).map(() => maskChar)
    return `${strNoL.join("")}${strNoR.join("")}`;
}

const maskDomainName = (emailName,maskChar) => {

    const ArrStr = emailName.split(".");
    const dName= ArrStr[0].split("");
    const maskLength = dName.length <= 4 ? 0 : dName.length > 4 && dName.length < 7 ? 2 : dName.length >= 8 && dName.length <= 12 ? 3 : 4;
    const strNoL = dName.slice(0, maskLength)
    const strNoR = dName.slice(maskLength, dName.length).map(() => maskChar)
    return `${strNoL.join("")}${strNoR.join("")}.${ArrStr[1]}`;
}

const emailAddressMasker = (emailAddress,maskChar) => {

    const emailNameAndDomainName = emailAddress.split('@');
    const emailName = maskEmailName(emailNameAndDomainName[0],maskChar);
    const domainName = maskDomainName(emailNameAndDomainName[1],maskChar)
    return `${emailName}@${domainName}`;

}

console.log(emailAddressMasker('nhialahmed@testdomain.com','x'))
