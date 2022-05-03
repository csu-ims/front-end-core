export function debugLoger(title:string,...params:any){
    
    let result = '';
    for(let param of params){
        result += `${param}\n`
    }
    console.debug(
        `>>>>>>>>>>${title}\n` + 
        result
        );
}