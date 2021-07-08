export const isBasicType = (val)=>{
    const typeArr = ['string','number','undefined','boolean','symbol']
    return typeArr.includes(typeof val) || val === null
}