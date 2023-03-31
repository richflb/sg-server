const data = [
    {eu: "ri", tu: '54', ele: 23},
    {eu: "nos", tu: '65', ele: 56},
    {eu: "extra", tu: '65', ele: 56}
]

function search(k){
    return data.filter( i => {
        if(Object.values(i).filter(v => v === k).length > 0) {
            console.log(Object.values(i).filter(v => v === k).length)
            return i
        }
    })
    Object.assign()
}

console.log(search('65'))