// 防抖函数：解决某函数执行次数过多的问题
export function debounce(func, delay) {
    let timer = null;
    return function(...args) {
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this, args)
        }, delay)
    };
}