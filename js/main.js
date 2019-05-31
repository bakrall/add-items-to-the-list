const addItems = document.querySelector('.add-items'),
	itemsList = document.querySelector('.plates'),
	items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
	e.preventDefault(); //stop the page from reloading on submit
	const text = this.querySelector('[name=item]').value;

	const item = {
		text, //shorthand for text: text
		done: false //whether item is ticked
	}

	items.push(item);
	populateList(items, itemsList);
	localStorage.setItem('items', JSON.stringify(items));
	this.reset();
}

/* 
we set default "plates" as empty array - if we forget to pass in something, it is not gonna break js, but it is gonna 
loop over empty array 

join() is needed at the end, because map returns an array, and if we use "innerHTML" we need to have one big string
 */
function populateList(plates = [], platesList) {
	platesList.innerHTML = plates.map((plate, i) => {
		return `
			<li>
				<input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/>
				<label for="item${i}">${plate.text}</label>
			</li>
		`;
	}).join('');
}

function toggleDone(e) {
	if (!e.target.matches('input')) return; //thanks to it we get only input checks, otherwise, with event delegation, we may get different event targets

	const el = e.target,
		index = el.dataset.index;

	items[index].done = !items[index].done;
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList); //populate with already added items on page load

