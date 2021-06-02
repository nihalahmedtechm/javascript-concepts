const maskEmailName = (emailName,maskChar) => {

    const ArrStr = emailName.split("");
    const maskLength = ArrStr.length <= 4 ? 0 : ArrStr.length > 4 && ArrStr.length < 7 ? 2 : ArrStr.length >= 8 && ArrStr.length <= 12 ? 3 : 4;
    const strNoL = ArrStr.slice(0, maskLength)
    const strNoR = ArrStr.slice(maskLength, ArrStr.length).map(() => maskChar)
    return `${strNoL.join("")}${strNoR.join("")}`;
}

const maskDomainName = (emailName,maskChar) => {

    const ArrStr = emailName.split(".");
    return `${maskEmailName(ArrStr[0],maskChar)}.${ArrStr[1]}`;
}

const emailAddressMasker = (emailAddress,maskChar) => {

    const emailNameAndDomainName = emailAddress.split('@');
    const emailName = maskEmailName(emailNameAndDomainName[0],maskChar);
    const domainName = maskDomainName(emailNameAndDomainName[1],maskChar)
    return `${emailName}@${domainName}`;

}

console.log(emailAddressMasker('nhialahmed@testdomain.com','x'))

Output: nhixxxxxxx@tesxxxxxxx.com
