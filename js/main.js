const addItems = document.querySelector('.add-items'),
	itemsList = document.querySelector('.plates'),
	items = [];

function addItem(e) {
	e.preventDefault(); //stop the page from reloading on submit
	const text = this.querySelector('[name=item]').value;

	const item = {
		text, //shorthand for text: text
		done: false //whether item is ticked
	}

	items.push(item);
	populateList(items, itemsList);
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
				<input type="checkbox" data-index=${i} id="item${i}" />
				<label for="item${i}">${plate.text}</label>
			</li>
		`;
	}).join('');
}

addItems.addEventListener('submit', addItem);

