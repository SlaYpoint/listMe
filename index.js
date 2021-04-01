// variable declarations
let form = document.querySelector('#addForm');
let itemList = document.querySelector('#itemList');
let filterItem = document.querySelector('#filter');

// Load items
document.addEventListener('DOMContentLoaded', function(e){
    let items;
    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach((item)=>{
        let li = document.createElement('li');
        li.className = 'list--item';
        li.appendChild(document.createTextNode(item));

        let delBtn = document.createElement('button');
        delBtn.className = 'delete__button';
        delBtn.appendChild(document.createTextNode('X'));
        li.appendChild(delBtn);

        itemList.appendChild(li);
    });

});

// Add items
form.addEventListener('submit', function (e) {
    e.preventDefault();//to prevent form submiting

    // get input
    let newItem = document.querySelector('#item');

    // create new list item
    let li = document.createElement('li');
    li.className = 'list--item';
    li.appendChild(document.createTextNode(newItem.value));

    let delBtn = document.createElement('button');
    delBtn.className = 'delete__button';
    delBtn.appendChild(document.createTextNode('X'));
    li.appendChild(delBtn);

    itemList.appendChild(li);

    storeItemLocally(newItem.value);

    // console.log(li);

});

// Remove items
itemList.addEventListener('click', function(e){
    if(e.target.classList.contains('delete__button')){
        // console.log('deleted');
        if(confirm('Sure you want to remove this item ?')){
            let li = e.target.parentElement;//grabs the li element
            itemList.removeChild(li);
            // console.log(li);

            // remove from localStorage as well
            removeItemLocally(e.target.parentElement);
        }
    }
});

// Filter items
filterItem.addEventListener('keyup', function(e){
    let text = e.target.value.toLowerCase();
    // console.log(text);
    let items = itemList.querySelectorAll('.list--item');
    // console.log(items);

    Array.from(items).forEach(function(item){
        let itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text)!=-1){
            item.style.display = 'flex';
        }else{
            item.style.display = 'none';
        }
    })
});

// Store locally 
const storeItemLocally = (item) => {
    let items;
    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.push(item);
    // Save to localStorage
    localStorage.setItem('items', JSON.stringify(items));
}

// Remove from localStorage
const removeItemLocally = (item) => {
    let items;
    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }

    items.forEach((itemName, index) =>{
        if(item.textContent === itemName ){
            items.splice(index, 1);
        }
    });
    //re-store the array of items
    localStorage.setItem('items', JSON.stringify(items));
}