const addItems = document.querySelector('.add-items'),
	itemsList = document.querySelector('.plates'),
	resetButton = document.querySelector('button[type="reset"]'),
	selectAllButton = document.querySelector('.select-all'),
	deselectAllButton = document.querySelector('.deselect-all');

let items = JSON.parse(localStorage.getItem('items')) || [];

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

function customReset() {
	const confirmation = confirm("Are you sure you want to delete existing list?");

	if (confirmation) {
		localStorage.clear();
		items = [];
		populateList(items, itemsList);
	}
}

function selectAll(e) {
	items.forEach((item, index) => item.done = true);
	populateList(items, itemsList);
}

function deselectAll(e) {
	items.forEach((item, index) => item.done = false);
	populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
resetButton.addEventListener('click', customReset);
selectAllButton.addEventListener('click', selectAll);
deselectAllButton.addEventListener('click', deselectAll);

populateList(items, itemsList); //populate with already added items on page load

