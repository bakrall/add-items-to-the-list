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

		this.reset();
	}

	addItems.addEventListener('submit', addItem);

