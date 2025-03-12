
function stickyHeader(headerEl){
    if (window.scrollY > 0) {
        headerEl.classList.add('sticky');
    } else {
        headerEl.classList.remove('sticky');
    }
}
async function main(){

    const headerEl = document.querySelector('header');
    
    window.addEventListener('scroll', function(){
        stickyHeader(headerEl);
    });

    stickyHeader(headerEl);
}



window.addEventListener('load', main);