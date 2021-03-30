// variable declarations
let form = document.querySelector('#addForm');
let itemList = document.querySelector('#itemList');
let filterItem = document.querySelector('#filter');

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

    // console.log(li);

});

// Remove items
itemList.addEventListener('click', function(e){
    if(e.target.classList.contains('delete__button')){
        // console.log('deleted');
        if(confirm('Sure you want to remove this item ?')){
            let li = e.target.parentElement;//grabs the li element
            itemList.removeChild(li);
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