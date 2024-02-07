import bs58 from 'bs58';
function base58ToHex(base58Address: string): string {
    // alert('base58ToHex');
    // alert('base58ToHex2'+base58Address);
    // 解码Base58地址
    const decodedBytes = bs58.decode(base58Address);

    // 将字节数组转换为Hex字符串
    const hexString = Buffer.from(decodedBytes).toString('hex');

    return hexString;
}

// console.log(base58ToHex('TQr1Z3iY5RZ4JnYXG6JQ1jZ8vY7Z5Q1J1u'));

export default base58ToHex;

