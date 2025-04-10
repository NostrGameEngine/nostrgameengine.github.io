let stickyHeaderEl = null;
 function stickyHeader(headerEl){
    if (window.scrollY > 0) {
        if (!stickyHeaderEl){            
            stickyHeaderEl =headerEl.cloneNode(true);
            stickyHeaderEl.classList.add('sticky');
            headerEl.classList.add('invisible');
            document.body.prepend(stickyHeaderEl);
        }
    } else {
        if (stickyHeaderEl){
            stickyHeaderEl.remove();
            headerEl.classList.remove('invisible');
            stickyHeaderEl = null;
        }
        
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