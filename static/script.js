let stickyHeaderEl = null;
 function stickyHeader(headerEl){
    if (window.scrollY > 0) {
        if (window.innerWidth <= 1000) return;

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


async function patch(){
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/safari-style.css';
        document.head.appendChild(link);
    }
}

async function main(){
    const headerEl = document.querySelector('header');    
    window.addEventListener('scroll', function(){
        stickyHeader(headerEl);
    });
    stickyHeader(headerEl);


    patch();
}



window.addEventListener('load', main);